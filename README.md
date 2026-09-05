# Weekly Social Media Idea Archive

**每週內容創意存檔｜AI × 網路安全 × 電子製造**

專業從業者視角的每週社群媒體與內容創意累積存檔。

聚焦：
- 人工智慧治理 / AI 監管與政策
- AI 安全（模型、代理、SOC 應用）
- 電子製造、智慧工廠、IIoT / OT / ICS 資安

## 網站預覽
開啟 [`index.html`](index.html) 即可瀏覽累積存檔網站。

建議啟用 **GitHub Pages**（Settings → Pages → Source: Deploy from a branch → main / root），即可獲得公開網址。

## 本週檔案結構
- `<日期>-topic1-*.md` … `topic4-*.md`：每期 3–4 個獨立選題的完整草稿（LinkedIn / X / 部落格 / 簡訊）
- `index.html`：專業靜態存檔網站

每週一新增新的 Markdown 與更新 `index.html`。

## 日期精確度規則

來源日期原則上必須精確到日。拿不到確切日期時，**移除模糊日期、降級該來源並在分級符號後加註 `*`**，並在「查證與限制」寫明原因——不要改用「8 月初」「late August」這類概括寫法帶過，那會讓未經查證的日期讀起來像已查證。

`scripts/validate-site.mjs` 會在本期全文（`index.html` 的 week-card 與當期 `<日期>-topic*.md`）攔截已知的中英文模糊日期形式。這是 defense-in-depth 防呆，不是自然語言日期解析器；URL、HTML 註解與 code span/block 不掃描，若文章要討論模糊日期用語，請以 code 標示。已發布的 `archive.html` 與歷史 Markdown 不在檢查範圍內。

```bash
node scripts/test-fuzzy-dates.mjs   # 模糊日期 regex 的正反例 regression tests
node scripts/validate-site.mjs      # 結構、來源分級、post-id、摘要面板、日期精確度
node scripts/sync-markdown.mjs --check   # 網站草稿與 Markdown 是否一致
```

---
資料來源均註明原始發布日期與媒體名稱，不編造新聞。
