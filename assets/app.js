/* WeeklySocialMediaIdea — shared page script
   Features: mark-as-used tracking (localStorage + optional GitHub Gist sync),
   one-click copy for bilingual draft blocks. */
(function () {
  var LS_DATA = 'wsmi-used-v2';
  var LS_TOKEN = 'wsmi-gh-token';
  var LS_GIST = 'wsmi-gist-id';
  var GIST_FILE = 'wsmi-used-posts.json';

  /* ---------- state ---------- */
  function load() {
    try {
      var v2 = JSON.parse(localStorage.getItem(LS_DATA) || 'null');
      if (v2 && v2.posts) return v2;
    } catch (e) {}
    var posts = {};
    try {
      (JSON.parse(localStorage.getItem('wsmi-used-posts') || '[]')).forEach(function (id) {
        posts[id] = { used: true, ts: 1 };
      });
    } catch (e) {}
    return { version: 1, posts: posts };
  }
  var state = load();
  var afterChange = null;   // set once the rollup renderer exists
  function save() {
    localStorage.setItem(LS_DATA, JSON.stringify(state));
    if (afterChange) afterChange();
  }
  function isUsed(id) { var p = state.posts[id]; return !!(p && p.used); }
  function setUsed(id, on) {
    var prev = state.posts[id] || {};
    state.posts[id] = { used: on, ts: Date.now(), fx: prev.fx };
    save(); scheduleSync();
  }
  function getFx(id) { var p = state.posts[id]; return (p && p.fx) || ''; }
  function setFx(id, v) {
    var prev = state.posts[id] || {};
    state.posts[id] = { used: prev.used !== false, ts: Date.now(), fx: v };
    save(); scheduleSync();
  }

  /* ---------- used-marker UI ---------- */
  var renderers = [];
  var FX_OPTS = [['good', '👍 好'], ['ok', '普通'], ['bad', '👎 差']];
  document.querySelectorAll('details.channel[data-post-id]').forEach(function (d) {
    var id = d.getAttribute('data-post-id');
    var btn = d.querySelector('.used-btn');
    var actions = d.querySelector('.post-actions');
    var fxRow = null;
    if (actions) {
      fxRow = document.createElement('div');
      fxRow.className = 'fx-row';
      fxRow.innerHTML = '<span class="fx-label">發布成效：</span>' + FX_OPTS.map(function (o) {
        return '<button type="button" class="fx-btn" data-fx="' + o[0] + '">' + o[1] + '</button>';
      }).join('');
      actions.insertBefore(fxRow, actions.firstChild);
      fxRow.querySelectorAll('.fx-btn').forEach(function (fb) {
        fb.addEventListener('click', function () {
          setFx(id, getFx(id) === fb.dataset.fx ? '' : fb.dataset.fx);
          render();
        });
      });
    }
    function render() {
      var on = isUsed(id);
      d.classList.toggle('used', on);
      if (btn) btn.textContent = on ? '取消「已使用」標示' : '標示為已使用';
      if (fxRow) {
        var cur = getFx(id);
        fxRow.querySelectorAll('.fx-btn').forEach(function (fb) {
          fb.classList.toggle('on', fb.dataset.fx === cur);
        });
      }
    }
    if (btn) btn.addEventListener('click', function () { setUsed(id, !isUsed(id)); render(); });
    renderers.push(render);
    render();
  });
  function renderAll() { renderers.forEach(function (f) { f(); }); }

  /* ---------- copy buttons ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var block = b.closest('.lang-block');
      var textEl = block && block.querySelector('.draft-text');
      if (!textEl) return;
      var txt = textEl.innerText.trim();
      function done() {
        var orig = b.dataset.orig || b.textContent;
        b.dataset.orig = orig;
        b.classList.add('copied');
        b.textContent = '已複製 ✓';
        setTimeout(function () { b.classList.remove('copied'); b.textContent = orig; }, 1400);
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = txt;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () { fallback(); done(); });
      } else { fallback(); done(); }
    });
  });

  /* ---------- GitHub Gist sync ---------- */
  var syncBtn = document.getElementById('sync-btn');
  var cfgBtn = document.getElementById('sync-cfg');
  function token() { return localStorage.getItem(LS_TOKEN) || ''; }
  function setStatus(txt) { if (syncBtn) syncBtn.textContent = txt; }

  function gh(path, opts) {
    opts = opts || {};
    opts.headers = Object.assign({
      'Authorization': 'Bearer ' + token(),
      'Accept': 'application/vnd.github+json'
    }, opts.headers || {});
    return fetch('https://api.github.com' + path, opts).then(function (r) {
      if (r.status === 401 || r.status === 403) throw new Error('token-invalid');
      if (!r.ok) throw new Error('http ' + r.status);
      return r.status === 204 ? null : r.json();
    });
  }

  function createGist() {
    var files = {};
    files[GIST_FILE] = { content: JSON.stringify(state) };
    return gh('/gists', {
      method: 'POST',
      body: JSON.stringify({ description: 'WeeklySocialMediaIdea used-posts sync', public: false, files: files })
    }).then(function (g) { localStorage.setItem(LS_GIST, g.id); return g.id; });
  }
  // Walk every page before concluding the gist does not exist — stopping at page 1
  // would create a duplicate gist and split sync state across two files.
  function searchGistPage(page) {
    if (page > 10) return Promise.resolve(null);
    return gh('/gists?per_page=100&page=' + page).then(function (list) {
      list = list || [];
      var hit = list.filter(function (g) { return g.files && g.files[GIST_FILE]; })[0];
      if (hit) return hit.id;
      if (list.length < 100) return null;
      return searchGistPage(page + 1);
    });
  }
  function findGist() {
    var cached = localStorage.getItem(LS_GIST);
    if (cached) return Promise.resolve(cached);
    return searchGistPage(1).then(function (id) {
      if (id) { localStorage.setItem(LS_GIST, id); return id; }
      return createGist();
    });
  }

  function mergeRemote(remote) {
    if (!remote || !remote.posts) return;
    Object.keys(remote.posts).forEach(function (id) {
      var r = remote.posts[id], l = state.posts[id];
      if (!l || (r.ts || 0) > (l.ts || 0)) state.posts[id] = r;
    });
  }

  var syncing = false, pendingSync = false;
  function doSync() {
    if (!token()) { setupToken(); return; }
    if (syncing) { pendingSync = true; return; }   // never drop a change made mid-sync
    syncing = true;
    pendingSync = false;
    var sentSnapshot = null;
    setStatus('🔄 同步中…');
    findGist().then(function (id) {
      return gh('/gists/' + id).then(function (g) {
        var f = g.files && g.files[GIST_FILE];
        var remote = null;
        try { remote = f ? JSON.parse(f.content) : null; } catch (e) {}
        mergeRemote(remote);
        save();
        renderAll();
        var files = {};
        sentSnapshot = JSON.stringify(state);
        files[GIST_FILE] = { content: sentSnapshot };
        return gh('/gists/' + id, { method: 'PATCH', body: JSON.stringify({ files: files }) });
      });
    }).then(function () {
      // state changed while the request was in flight -> not actually synced yet
      if (sentSnapshot !== null && sentSnapshot !== JSON.stringify(state)) pendingSync = true;
      if (pendingSync) { setStatus('🔄 同步中…'); return; }
      var t = new Date();
      setStatus('✅ 已同步 ' + ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2));
    }).catch(function (e) {
      if (e && e.message === 'token-invalid') {
        localStorage.removeItem(LS_TOKEN);
        setStatus('⚠️ Token 無效，點擊重新設定');
      } else if (e && e.message === 'http 404') {
        localStorage.removeItem(LS_GIST);
        setStatus('⚠️ 同步失敗，點擊重試');
      } else {
        setStatus('⚠️ 同步失敗，點擊重試');
      }
    }).then(function () {
      syncing = false;
      if (pendingSync) { pendingSync = false; setTimeout(doSync, 400); }
    });
  }

  function setupToken() {
    var t = prompt(
      '跨裝置同步「已使用」紀錄需要 GitHub Token：\n\n' +
      '1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)\n' +
      '2. Generate new token (classic)，只勾選「gist」權限\n' +
      '3. 貼到下方\n\n' +
      '注意事項：\n' +
      '• Token 存在此瀏覽器的 localStorage，同網域下的其他 GitHub Pages 專案頁可讀取；不要在公用電腦啟用。\n' +
      '• 紀錄存於「secret gist」——不公開列出，但知道網址的人可檢視，請勿放敏感資料。\n' +
      '• 不用時可用 ⚙ 移除，並到 GitHub 設定頁撤銷該 token。'
    );
    if (t && t.trim()) { localStorage.setItem(LS_TOKEN, t.trim()); doSync(); }
  }

  var timer = null;
  function scheduleSync() {
    if (!token()) return;
    if (syncing) { pendingSync = true; return; }
    clearTimeout(timer);
    timer = setTimeout(doSync, 1200);
  }

  if (syncBtn) syncBtn.addEventListener('click', doSync);
  if (cfgBtn) cfgBtn.addEventListener('click', function () {
    var cur = token();
    var t = prompt(cur
      ? '同步設定：貼上新 Token 並確定即更新；留空並確定 = 移除 Token（停用同步）。'
      : '輸入 GitHub Token（classic，僅 gist 權限）以啟用跨裝置同步。');
    if (t === null) return;
    if (t.trim() === '') {
      localStorage.removeItem(LS_TOKEN);
      localStorage.removeItem(LS_GIST);
      setStatus('🔄 同步');
    } else {
      localStorage.setItem(LS_TOKEN, t.trim());
      doSync();
    }
  });


  /* ---------- effectiveness rollup (closes the feedback loop) ---------- */
  var fxBox = document.getElementById('fx-rollup');
  function renderRollup() {
    if (!fxBox) return;
    var ids = Array.prototype.map.call(
      document.querySelectorAll('details.channel[data-post-id]'),
      function (d) { return d.getAttribute('data-post-id'); });
    var cur = { used: 0, good: 0, ok: 0, bad: 0, rated: 0 };
    ids.forEach(function (id) {
      var p = state.posts[id];
      if (!p || !p.used) return;
      cur.used++;
      if (p.fx && cur[p.fx] !== undefined) { cur[p.fx]++; cur.rated++; }
    });
    var all = { used: 0, good: 0, ok: 0, bad: 0 };
    Object.keys(state.posts).forEach(function (id) {
      var p = state.posts[id];
      if (!p || !p.used) return;
      all.used++;
      if (p.fx && all[p.fx] !== undefined) all[p.fx]++;
    });
    fxBox.innerHTML =
      '<b>本期使用與成效</b>：已使用 ' + cur.used + ' / ' + ids.length +
      '　已評分 ' + cur.rated +
      '（👍 ' + cur.good + ' · 普通 ' + cur.ok + ' · 👎 ' + cur.bad + '）' +
      '<span class="fx-all">歷來累計：已使用 ' + all.used +
      '（👍 ' + all.good + ' · 普通 ' + all.ok + ' · 👎 ' + all.bad + '）</span>';
  }
  renderers.push(renderRollup);
  afterChange = renderRollup;
  renderRollup();

  /* ---------- character roster / featured / lightbox ---------- */
  var ROSTER = [
    { id: 'analyst',   name: 'Elisa',  title: 'SOC 威脅分析師', desc: '即時威脅監控 · Security Operations', src: 'assets/character-analyst.webp?v=3', focus: '52% 14%' },
    { id: 'guardian',  name: 'Vita',   title: '威脅獵人',       desc: '主動威脅獵捕 · Threat Detected',     src: 'assets/character-guardian.webp?v=2', focus: '55% 16%' },
    { id: 'commander', name: 'Ukami', title: '資安指揮官',     desc: 'SOC 指揮與事件應變',                 src: 'assets/character-commander.webp', focus: '52% 24%' },
    { id: 'navigator', name: 'Kano', title: '數據潛航者',     desc: '深度資料分析 · Deep Analytics',      src: 'assets/character-navigator.webp', focus: '35% 14%' },
    { id: 'anita',     name: 'Anita',  title: '情資蒐集官',     desc: '威脅情報與 OSINT',                   src: 'assets/character-anita.webp', focus: '53% 15%' },
    { id: 'ruby',      name: 'Ruby',   title: '內容發布官',     desc: '社群與內容傳播',                     src: 'assets/character-ruby.webp', focus: '51% 12%' },
    { id: 'sindy',     name: 'Sindy',  title: '加密防護官',     desc: '密碼學與存取控制',                   src: 'assets/character-sindy.webp', focus: '47% 11%' }
  ];

  var lightboxEl = null;
  function openLightbox(ch) {
    if (!lightboxEl) {
      lightboxEl = document.createElement('div');
      lightboxEl.className = 'lightbox';
      lightboxEl.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure><button class="lb-close" type="button">✕ 關閉</button>';
      lightboxEl.addEventListener('click', function (e) {
        if (e.target === lightboxEl || e.target.classList.contains('lb-close')) closeLightbox();
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
      document.body.appendChild(lightboxEl);
    }
    lightboxEl.querySelector('img').src = ch.src;
    lightboxEl.querySelector('img').alt = ch.name + ' 完整插畫';
    lightboxEl.querySelector('figcaption').textContent = ch.name + ' · ' + ch.title + ' — ' + ch.desc;
    lightboxEl.classList.add('open');
  }
  function closeLightbox() { if (lightboxEl) lightboxEl.classList.remove('open'); }

  // avatars: click opens full illustration; hide avatars whose image is missing
  document.querySelectorAll('.team .avatar[data-char]').forEach(function (span) {
    var ch = ROSTER.filter(function (c) { return c.id === span.getAttribute('data-char'); })[0];
    if (!ch) return;
    var img = span.querySelector('img');
    if (img) {
      img.addEventListener('error', function () { span.style.display = 'none'; });
      if (img.complete && img.naturalWidth === 0) span.style.display = 'none';
    }
    span.addEventListener('click', function () { openLightbox(ch); });
  });

  // featured character of the current period (rotates every Mon & Thu)
  var slot = document.getElementById('featured-slot');
  if (slot) {
    var ANCHOR = new Date(2026, 7, 3); // Monday 2026-08-03, local time
    var days = Math.floor((Date.now() - ANCHOR.getTime()) / 86400000);
    var periods = Math.floor(days / 7) * 2 + ((days % 7) >= 3 ? 1 : 0);
    var pending = ROSTER.length;
    var avail = [];
    ROSTER.forEach(function (ch) {
      var probe = new Image();
      probe.onload = function () { avail.push(ch); if (--pending === 0) renderFeatured(); };
      probe.onerror = function () { if (--pending === 0) renderFeatured(); };
      probe.src = ch.src;
    });
    function renderFeatured() {
      if (!avail.length) return;
      avail.sort(function (a, b) { return ROSTER.indexOf(a) - ROSTER.indexOf(b); });
      var ch = avail[((periods % avail.length) + avail.length) % avail.length];
      slot.innerHTML =
        '<div class="featured-banner" title="點擊查看完整插畫">' +
        '<img class="fb-img" src="' + ch.src + '" alt="' + ch.name + '" style="object-position:' + (ch.focus || '50% 15%') + '">' +
        '<div class="fb-overlay"></div>' +
        '<div class="fb-info">' +
        '<div class="fb-badges"><span class="fb-onair">ON AIR</span><span class="fb-brief">' + ch.title + '</span></div>' +
        '<h2>' + ch.name + '</h2>' +
        '<p>本期內容主播 · ' + ch.desc + '</p>' +
        '</div>' +
        '<button class="featured-view" type="button">查看完整插畫</button>' +
        '</div>';
      slot.querySelector('.featured-banner').addEventListener('click', function () { openLightbox(ch); });
    }
  }

  if (token()) { doSync(); } else { setStatus('🔄 同步'); }
})();
