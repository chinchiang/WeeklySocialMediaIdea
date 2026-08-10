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
- `YYYY-MM-DD-topic1-*.md` … `topic3-*.md`：三個獨立選題的查證紀錄與完整中英雙語草稿
- `index.html`：最新一期與本期素材摘要
- `archive.html`：歷史週次累積存檔
- `assets/style.css`：首頁與存檔頁共用樣式（不得再內嵌複製）
- `assets/app.js`：複製、已使用、選填成效、角色及 Gist 同步
- `scripts/sync-markdown.mjs`：由最新一期網站卡片同步完整草稿到 Markdown
- `scripts/validate-site.mjs`：驗證來源、日期、交叉查證、共用 CSS 與 Markdown 完整性

每週一、四新增 Markdown 並更新 `index.html`；舊一期移入 `archive.html`。

## 來源與評鑑規則

1. **來源分級**：每個來源明確標示 `🏛 官方`、`📰 一線媒體` 或 `📡 聚合站`。摘要面板只計算具精確日期的官方與一線來源，不以來源總數取代品質。
2. **查證強度**：`data-verification="original"` 表示已讀取原文；`search` 表示只核對搜尋索引／摘要，介面會標示「搜尋層級」，不得宣稱為原文查證。
3. **精確日期**：新來源必須使用 `data-date="YYYY-MM-DD"`。拿不到精確日期時留空、降級並排除於品質指標，不使用「8 月初」等模糊標註。
4. **雙來源交叉**：關鍵金額、數字、日期與事件事實以 `data-claim` 分組，每個 claim 至少需要兩個不同網域的獨立來源。
5. **成效回流**：內容標示「已使用」後，可選填好／普通／差；資料與既有使用紀錄一樣保存在瀏覽器，啟用 Gist 時跨裝置同步。摘要面板會顯示累積結果與目前最佳題型。
6. **單一產出流程**：最新一期的網站卡片是草稿主資料；執行下列指令後，Markdown 必須與網站全文一致：

   ```bash
   node scripts/sync-markdown.mjs
   node scripts/sync-markdown.mjs --check
   node scripts/validate-site.mjs
   ```

Pull Request 與 `main` push 會自動執行相同結構驗證。

## Gist 同步風險

Classic PAT 的 `gist` scope 可讀寫該帳號全部 Gist，GitHub 目前無法把 classic PAT 限制到單一 Gist。Token 只存於目前瀏覽器的 `localStorage`；請使用專用、短效 Token，裝置遺失或懷疑外洩時立即至 GitHub 撤銷。此同步為選用功能，不設定 Token 時網站仍可完整使用本機紀錄。

---
資料來源均須註明精確發布日期、來源等級與查證強度；關鍵事實需雙來源交叉，不編造新聞。
