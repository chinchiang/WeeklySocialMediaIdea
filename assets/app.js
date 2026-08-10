/* WeeklySocialMediaIdea — shared page script
   Features: mark-as-used and optional outcome tracking (localStorage + optional
   GitHub Gist sync), source-quality labels, and one-click bilingual copy. */
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
  function save() {
    state.version = 2;
    localStorage.setItem(LS_DATA, JSON.stringify(state));
  }
  function isUsed(id) { var p = state.posts[id]; return !!(p && p.used); }
  function setUsed(id, on) {
    state.posts[id] = Object.assign({}, state.posts[id] || {}, { used: on, ts: Date.now() });
    save();
    scheduleSync();
  }
  function setOutcome(id, outcome, topic, channel) {
    var next = Object.assign({}, state.posts[id] || {}, {
      topic: topic,
      channel: channel,
      ts: Date.now()
    });
    if (outcome) next.outcome = outcome;
    else delete next.outcome;
    state.posts[id] = next;
    save();
    scheduleSync();
  }

  /* ---------- source quality ---------- */
  var OFFICIAL_HOSTS = [
    'anthropic.com', 'openai.com', 'digital-strategy.ec.europa.eu',
    'cisa.gov', 'gov.texas.gov', 'huggingface.co', 'nvidia.com',
    'sonicwall.com', 'gov.uk'
  ];
  var MEDIA_HOSTS = [
    'forbes.com', 'venturebeat.com', 'helpnetsecurity.com',
    'thehackernews.com', 'scworld.com', 'reuters.com',
    'bleepingcomputer.com', 'therecord.media', 'securityweek.com',
    'cybernews.com', 'sans.org'
  ];
  function hostMatches(host, domains) {
    return domains.some(function (domain) { return host === domain || host.slice(-(domain.length + 1)) === '.' + domain; });
  }
  function sourceTier(link) {
    var declared = link.getAttribute('data-source-tier');
    if (declared) return declared;
    var host = '';
    try { host = new URL(link.href).hostname.toLowerCase(); } catch (e) {}
    if (hostMatches(host, OFFICIAL_HOSTS)) return 'official';
    if (hostMatches(host, MEDIA_HOSTS)) return 'media';
    return 'aggregator';
  }
  var auditedSources = [];
  document.querySelectorAll('a.source-tag').forEach(function (link) {
    var tier = sourceTier(link);
    link.setAttribute('data-source-tier', tier);
    if (link.hasAttribute('data-date')) {
      auditedSources.push(link);
      var exactDate = /^\d{4}-\d{2}-\d{2}$/.test(link.getAttribute('data-date') || '');
      link.classList.toggle('source-date-unverified', !exactDate);
      if (!exactDate) link.setAttribute('title', '未取得精確發布日期；不計入官方＋一線來源指標');
    }
  });
  var qualityCount = document.getElementById('quality-source-count');
  if (qualityCount) {
    qualityCount.textContent = auditedSources.filter(function (link) {
      var tier = link.getAttribute('data-source-tier');
      return /^(official|media)$/.test(tier || '') && /^\d{4}-\d{2}-\d{2}$/.test(link.getAttribute('data-date') || '');
    }).length;
  }

  /* ---------- used-marker UI ---------- */
  var renderers = [];
  document.querySelectorAll('details.channel[data-post-id]').forEach(function (d) {
    var id = d.getAttribute('data-post-id');
    var btn = d.querySelector('.used-btn');
    var topicEl = d.closest('.topic');
    var topicLabel = topicEl && topicEl.querySelector('.topic-num');
    var summary = d.querySelector('summary');
    var topic = topicLabel ? topicLabel.textContent.trim() : '未分類';
    var channel = summary ? summary.childNodes[0].textContent.trim() : id;
    var actions = d.querySelector('.post-actions');
    var outcome = document.createElement('label');
    outcome.className = 'outcome-control';
    outcome.innerHTML = '成效（選填）<select class="outcome-select" aria-label="內容發布成效"><option value="">尚未填寫</option><option value="good">好</option><option value="average">普通</option><option value="poor">差</option></select>';
    var outcomeSelect = outcome.querySelector('select');
    if (actions) actions.insertBefore(outcome, btn || null);
    function render() {
      var on = isUsed(id);
      var record = state.posts[id] || {};
      d.classList.toggle('used', on);
      if (btn) btn.textContent = on ? '取消「已使用」標示' : '標示為已使用';
      if (outcomeSelect) {
        outcomeSelect.value = record.outcome || '';
        outcomeSelect.disabled = !on;
      }
      updateEffectSummary();
    }
    if (btn) btn.addEventListener('click', function () { setUsed(id, !isUsed(id)); render(); });
    if (outcomeSelect) outcomeSelect.addEventListener('change', function () {
      setOutcome(id, outcomeSelect.value, topic, channel);
      render();
    });
    renderers.push(render);
    render();
  });
  function renderAll() { renderers.forEach(function (f) { f(); }); }
  function updateEffectSummary() {
    var target = document.getElementById('effect-summary-text');
    if (!target) return;
    var rated = Object.keys(state.posts).map(function (id) { return state.posts[id]; }).filter(function (post) {
      return post && post.used && /^(good|average|poor)$/.test(post.outcome || '');
    });
    if (!rated.length) {
      target.textContent = '尚無成效資料；內容發布後可在「已使用」旁選填好／普通／差。';
      return;
    }
    var counts = { good: 0, average: 0, poor: 0 };
    var topics = {};
    rated.forEach(function (post) {
      counts[post.outcome] += 1;
      var key = post.topic || '未分類';
      topics[key] = topics[key] || { total: 0, good: 0 };
      topics[key].total += 1;
      if (post.outcome === 'good') topics[key].good += 1;
    });
    var best = Object.keys(topics).sort(function (a, b) {
      return (topics[b].good / topics[b].total) - (topics[a].good / topics[a].total) || topics[b].total - topics[a].total;
    })[0];
    target.textContent = '已評 ' + rated.length + ' 則：好 ' + counts.good + '／普通 ' + counts.average + '／差 ' + counts.poor + (best ? '；目前最佳題型：' + best : '');
  }

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

  function findGist() {
    var cached = localStorage.getItem(LS_GIST);
    if (cached) return Promise.resolve(cached);
    return gh('/gists?per_page=100').then(function (list) {
      var hit = (list || []).filter(function (g) { return g.files && g.files[GIST_FILE]; })[0];
      if (hit) { localStorage.setItem(LS_GIST, hit.id); return hit.id; }
      var files = {};
      files[GIST_FILE] = { content: JSON.stringify(state) };
      return gh('/gists', {
        method: 'POST',
        body: JSON.stringify({ description: 'WeeklySocialMediaIdea used-posts sync', public: false, files: files })
      }).then(function (g) { localStorage.setItem(LS_GIST, g.id); return g.id; });
    });
  }

  function mergeRemote(remote) {
    if (!remote || !remote.posts) return;
    Object.keys(remote.posts).forEach(function (id) {
      var r = remote.posts[id], l = state.posts[id];
      if (!l || (r.ts || 0) > (l.ts || 0)) state.posts[id] = r;
    });
  }

  var syncing = false;
  function doSync() {
    if (!token()) { setupToken(); return; }
    if (syncing) return;
    syncing = true;
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
        files[GIST_FILE] = { content: JSON.stringify(state) };
        return gh('/gists/' + id, { method: 'PATCH', body: JSON.stringify({ files: files }) });
      });
    }).then(function () {
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
    }).then(function () { syncing = false; });
  }

  function setupToken() {
    var t = prompt(
      '跨裝置同步「已使用」紀錄需要 GitHub Token：\n\n' +
      '1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)\n' +
      '2. Generate new token (classic)，只勾選「gist」權限\n' +
      '3. 貼到下方（Token 只會儲存在此瀏覽器的 localStorage）\n\n' +
      '紀錄會存到你帳號的一個私密 Gist，每台裝置設定一次即可。'
    );
    if (t && t.trim()) { localStorage.setItem(LS_TOKEN, t.trim()); doSync(); }
  }

  var timer = null;
  function scheduleSync() {
    if (!token()) return;
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
