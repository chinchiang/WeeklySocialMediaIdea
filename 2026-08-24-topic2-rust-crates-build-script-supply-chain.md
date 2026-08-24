# 本期內容創意 — 2026-08-24（涵蓋 8/20–8/23）

## 選題 2：86 分鐘的供應鏈攻擊——Rust 三個熱門套件被投毒，而且是在「編譯」時就中招

### 標題 / 引子
**你不用呼叫它，只要編譯就中了：Rust 三個熱門 crate 遭投毒，最短的一個只在線上存在 86 分鐘**

### 切入點 / 發布價值
這則的價值不在「又一次開源投毒」，而在四個可以直接改變工程實務的細節。

第一，**觸發點在編譯期**。惡意程式碼放在被注入的依賴的 build script 裡，只要專案的依賴解析到它，`cargo build`（甚至 `cargo check`、`cargo test`）就會執行 payload——**你的程式碼一行都不用呼叫那個套件**。對嵌入式與韌體團隊來說，這代表 CI 的建置節點與工程師的開發機才是受害面，不是產品本身。

第二，**投毒的誘餌是 Cargo 自己的善意提示**。攻擊者在發布惡意版本的同一分鐘內，把 arrayref 0.3.5 到 0.3.9 全部標記為 yanked，讓惡意的 0.3.10 變成唯一不會跳「建議更新到未 yank 版本」警告的版本。**安全提示被反過來當成誘導路徑**，這個手法值得所有維護者記住。

第三，**時間窗只有 86 到 107 分鐘**。這是開源社群的響應速度勝利，但反過來看也說明：如果你的 CI 剛好在那 86 分鐘內跑了一次建置，你不會有第二次機會發現。

第四，**沒有 CVE、沒有修補版本**。這則沒有你熟悉的「升級到 x.y.z」結局——處置方式是翻本機快取、釘住舊版本。這對習慣用 CVE 掃描器決定要不要行動的組織，是一個很好的反例。

### 本期支撐論點（含來源與日期）
1. **事件與時間**：2026 年 8 月 20 日 07:15 UTC，Rust 資安應變團隊（Security Response Team）收到通報指 `proc-macro1` crate 為惡意套件，經查證確認該套件的 build script 會下載惡意 payload。團隊隨即刪除該套件與同類的 `proc-macro-en`、`aovine`、`arone`、`aronenao`、`tinymember`（所有版本），並**鎖定了發布帳號**。來源：Rust 官方部落格（2026-08-20）、RUSTSEC-2026-0260（2026-08-20 通報並發布）。
2. **受害套件與存活時間**（官方逐筆公布，精確到秒）：
   - `arrayref@0.3.10`：2026-08-20T07:15:00Z 發布、08:41:40Z 刪除，**線上 86 分鐘**
   - `internment@0.8.7`：07:34:07Z 發布、09:04:11Z 刪除，**線上 90 分鐘**
   - `append-only-vec@0.1.9`：07:37:49Z 發布、09:25:24Z 刪除，**線上 107 分鐘**
   來源：Rust 官方部落格（2026-08-20，逐筆時間戳）、The Hacker News（2026-08-20）。
3. **入侵路徑**：三個套件同屬一位維護者的帳號。Rust 團隊表示「**我們不認為 arrayref 的作者有惡意，但其電腦或憑證很可能已遭入侵**」，並正嘗試聯繫該作者；帳號如何被入侵尚未公布。來源：Rust 官方部落格（2026-08-20，逐字引用）、The Hacker News（2026-08-20）。
4. **技術手法（本則最值得寫的一段）**：每個被投毒的版本在 manifest 只多了**一行**——一個對 `proc-macro1` 的依賴，那是無所不在的 `proc-macro2` 的**錯字仿冒（typosquat）**。`proc-macro1` 的函式庫原始碼是 `proc-macro2` 的真實副本，所以建置照常成功、不會出錯。惡意行為全部藏在 build script：於建置時從 base64 片段重組 payload 主機與 C2 位址，接著安裝一個三個驗證方法都無條件回傳成功的自訂憑證驗證器（**等同關閉 TLS 驗證**），再依作業系統與 CPU 架構挑選四個 payload 之一。來源：The Hacker News（2026-08-20）。
5. **落地方式**：在 Unix 與 macOS 上寫入 `/tmp/rust-setup`、加上執行權限並以 C2 位址為第一個參數分離執行；在 Windows 上把 PowerShell 腳本寫入 `%TEMP%`，透過 VBScript 啟動器以 `wscript.exe` 隱藏執行後隨即拋棄子行程——原始碼註解直言此舉是為了**逃離 Cargo 的 job object，讓建置不必等待它**。來源：The Hacker News（2026-08-20）。
6. **誘餌設計**：發布惡意版本的同一分鐘內，帳號把 arrayref 0.3.5 至 0.3.9 全部 yank，使 0.3.10 成為 Cargo **唯一不會發出「建議更新到未 yank 版本」警告**的版本。通報者（GitHub 使用者 jhobern）在 RustSec 的報告中寫道：「Delivery：0.3.5–0.3.9 全部被該帳號 yank，所以 cargo 的『建議更新到未 yank 版本』警告就是誘餌。我就是這樣中的。」Rust 團隊在應變過程中已將這些被惡意 yank 的版本 **unyank** 回來。來源：The Hacker News（2026-08-20，引用 RustSec 報告）、Rust 官方部落格（2026-08-20）。
7. **暴露面規模**：The Hacker News 於 8 月 21 日透過 crates.io API 查得，arrayref 累計下載 **245,385,500 次**、截至 8 月 20 日的近 90 天下載 **53,905,601 次**，且 crates.io 上有 **403 個不同 crate** 依賴它。該報導並逐段驗證了一條依賴鏈：`winit` → `sctk-adwaita ^0.10.1` → `tiny-skia ^0.11` → `arrayref ^0.3.6`，而鏈上每一段都是 0.3.x 的 caret 範圍——**caret 範圍會接受 0.3.10**。來源：The Hacker News（2026-08-20／21 查證）。
8. **生態圈的即時反應**：同一天上午，`blake3` 在 09:09 UTC 發布的 1.8.7 移除了對 arrayref 的依賴（1.8.6 仍有），`blake2b_simd` 與 `blake2s_simd` 也分別在 09:25 與 09:26 UTC 的版本中拿掉同一個依賴。來源：The Hacker News（2026-08-20／21 以 crates.io 索引驗證）。
9. **第二階段植入物**：據 Wiz 分析，stage-2 implant 以 HTTPS POST 回連路徑 `/49890878`，在 Windows 以登錄檔 Run 機碼、macOS 以 LaunchAgent、Linux 以 systemd user service 持久化，支援終止、重設 C2、安裝持久化、下載並執行後續腳本四項指令，並透過查詢 SQLite 登入資料庫竊取 Chrome、Brave、Edge 的瀏覽器憑證。Nextron 的分析補充：所檢視的 **Windows** 階段只查詢 `origin_url` 與 `username_value` 兩個欄位、未直接取出 `password_value`，但該分析僅涵蓋 Windows payload，Linux 與 macOS 的 payload 僅取雜湊、未分析。來源：The Hacker News（2026-08-20，引述 Wiz 與 Nextron）。
10. **官方處置建議（沒有「升級版本」這個選項）**：**無修補版本、未指派 CVE**。Rust 官方要求檢查本機依賴是否曾拉進這些套件，並提供直接可跑的檢查指令，對 `~/.cargo/registry/cache` 搜尋 `append-only-vec-0.1.9.crate`、`arrayref-0.3.10.crate`、`internment-0.8.7.crate` 及 `proc-macro1-*`、`proc-macro-en-*`、`aovine-*`、`arone-*`、`aronenao-*`、`tinymember-*` 等檔案；業界建議另包含將 arrayref 釘在 0.3.9 或更早。三個 crate 的 RustSec 通告均記載**目前沒有證據顯示任何惡意版本曾被實際使用**。來源：Rust 官方部落格（2026-08-20）、RUSTSEC-2026-0260、The Hacker News（2026-08-20）。

### 查證與限制
- **一手來源已直接開啟核對**：Rust 官方部落格〈Supply chain attack on arrayref〉（2026-08-20，作者 Manish Goregaokar，代表 security-response 團隊）與 RustSec 通告 RUSTSEC-2026-0260（通報日與發布日均為 2026-08-20，最後修改 2026-08-21）皆已取得全文。三筆套件的發布／刪除時間戳、被刪除的套件清單、帳號遭鎖定、以及官方提供的 `find ~/.cargo/registry/cache` 檢查指令，全部逐字比對自官方原文。
- **官方原文與媒體分析的分工要標清楚**：Rust 官方公告本身**只描述處置**（哪些套件被刪、時間、檢查方式），並未公開 build script 的技術剖析。論點 4、5、9 的技術細節（TLS 驗證被關閉、四個 payload、`/tmp/rust-setup`、`wscript.exe` 與 Cargo job object、stage-2 的 `/49890878` 路徑與瀏覽器憑證竊取）出自 The Hacker News 的報導及其引述的 Nextron、Wiz、StepSecurity 分析，屬**二手但具名的技術分析**，引用時應標明來源。
- **下載量數字為單一來源查證**：245,385,500 次累計下載、53,905,601 次近 90 天下載、403 個依賴 crate，均為 The Hacker News 於 8 月 21 日透過 crates.io API 自行查得；THN 明載已向 Rust 資安應變團隊詢問被刪除版本的下載次數但截稿前未獲回覆。**被刪除的惡意版本本身有多少次下載，目前無人公布**——這是本則最重要的未知數，撰稿時不應以總下載量暗示曝險規模。
- **「無證據被使用」的正確讀法**：RustSec 三則通告都記載沒有證據顯示惡意版本曾被實際使用。這是**目前沒有觀察到**，不等於沒有發生；THN 亦已就該結論的判斷依據向 Rust 團隊求證而未獲回覆。本則因此不寫成「確認無人受害」。
- **與 8/21 另一起事件的區隔**：同一週 Trend Micro 旗下 TrendAI 揭露 14 個木馬化 npm 套件投放 RedC2 4.0 Linux 後門（The Hacker News，2026-08-21）。兩者**不是同一起事件**，只是同期出現的相似模式（皆為套件生態、皆在安裝／建置階段觸發）。本則不將兩者混寫，若要並列須明確分開標示。

### 原始來源網址
- 🏛 Rust 官方部落格〈Supply chain attack on arrayref〉 8/20  
  https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/
- 🏛 RustSec 通告 RUSTSEC-2026-0260 8/20  
  https://rustsec.org/advisories/RUSTSEC-2026-0260
- 📰 The Hacker News 8/20  
  https://thehackernews.com/2026/08/rust-supply-chain-attack-puts-build.html

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
這次的 Rust 供應鏈攻擊，最值得記住的不是被投毒的套件名字，是它的觸發點：編譯，就中了。

8 月 20 日 07:15 UTC，Rust 資安應變團隊接獲通報，指 proc-macro1 這個套件是惡意的——它的 build script 會在建置時下載並執行遠端 payload。查證屬實後，團隊刪除了該套件、鎖定發布帳號，並發現三個熱門 crate 已經被改成依賴它：

• arrayref 0.3.10：線上 86 分鐘
• internment 0.8.7：線上 90 分鐘
• append-only-vec 0.1.9：線上 107 分鐘

四個細節值得工程團隊坐下來讀：

一、你的程式碼一行都不用呼叫它。 惡意程式碼在被注入依賴的 build script 裡，只要依賴解析到它，cargo build（cargo check、cargo test 亦然）就會執行 payload。CI 建置節點與開發機才是受害面。

二、誘餌是 Cargo 的善意提示。 攻擊者在發布惡意版本的同一分鐘內，把 arrayref 0.3.5–0.3.9 全部 yank，讓 0.3.10 變成唯一不會跳「建議更新到未 yank 版本」警告的版本。通報者的原話是：「cargo 的警告就是誘餌。我就是這樣中的。」

三、偽裝做得很完整。 被注入的依賴 proc-macro1 是無所不在的 proc-macro2 的錯字仿冒，而且函式庫原始碼是真實副本——所以建置一切正常，沒有任何報錯。build script 會在建置期重組 C2 位址、安裝一個三個驗證方法都無條件回傳成功的憑證驗證器（等同關閉 TLS 驗證），再依作業系統與架構挑 payload。

四、沒有 CVE，也沒有修補版本。 這則沒有「升級到 x.y.z」的結局。官方給的是一段 find ~/.cargo/registry/cache 的檢查指令，加上把 arrayref 釘在 0.3.9 或更早。

如果你的資安流程是「等 CVE 進掃描器再行動」，這一則會直接穿過去。

補一個誠實的限制：RustSec 三則通告都記載目前沒有證據顯示惡意版本被實際使用，而被刪除版本的實際下載次數至今無人公布。曝險規模仍是未知數，不要用總下載量去推估。

#SupplyChainSecurity #Rust #DevSecOps #OpenSource #AppSec

#### LinkedIn 草稿（English）
The thing to remember about this Rust supply chain attack is not the package names. It is the trigger: compiling was enough.

At 07:15 UTC on 20 August, the Rust Security Response Team received a report that the proc-macro1 crate was malicious — its build script downloaded and executed a remote payload at build time. After verifying it, the team deleted the crate, locked the publishing account, and found three popular crates had been republished to depend on it:

• arrayref 0.3.10 — online for 86 minutes
• internment 0.8.7 — online for 90 minutes
• append-only-vec 0.1.9 — online for 107 minutes

Four details worth reading as an engineering team:

1. Your code never had to call it. The malicious code sat in the build script of the injected dependency. If dependency resolution reached it, cargo build — and cargo check and cargo test — ran the payload. Your CI runners and developer machines are the exposed surface, not the shipped product.

2. The lure was Cargo's own helpful warning. Within the same minute as the malicious publish, the account yanked arrayref 0.3.5 through 0.3.9, leaving 0.3.10 as the only version that would not trigger "consider updating to a version that is not yanked." In the reporter's words: "that warning is the lure. That is how I hit it."

3. The disguise was complete. The injected dependency, proc-macro1, is a typosquat of the ubiquitous proc-macro2, and its library source is a genuine copy — so builds completed normally with no errors. The build script reassembled its C2 address at build time, installed a custom certificate verifier whose three verification methods return success unconditionally (effectively disabling TLS validation), then selected a payload by OS and architecture.

4. No CVE, no patched version. There is no "upgrade to x.y.z" ending here. What the maintainers published is a find ~/.cargo/registry/cache command, plus pinning arrayref at 0.3.9 or earlier.

If your security process waits for a CVE to appear in a scanner, this one walks straight past it.

One honest caveat: all three RustSec advisories record no evidence that any malicious version was actually used, and the download counts for the deleted versions have not been published by anyone. The real exposure is still unknown — do not infer it from the all-time download total.

#SupplyChainSecurity #Rust #DevSecOps #OpenSource #AppSec

#### Twitter / X 推文串（中文版）
1/ Rust 供應鏈攻擊，8/20。重點不是套件名字，是觸發點：編譯就中了。惡意碼在 build script 裡，cargo build／check／test 都會執行——你的程式碼一行都不用呼叫它。

2/ 時間軸精確到秒（Rust 官方公布）：
arrayref 0.3.10 線上 86 分鐘
internment 0.8.7 線上 90 分鐘
append-only-vec 0.1.9 線上 107 分鐘
三個都來自同一個維護者帳號，該帳號已被鎖定。

3/ Rust 團隊的原話：「我們不認為 arrayref 的作者有惡意，但其電腦或憑證很可能已遭入侵。」帳號怎麼被入侵，尚未公布。

4/ 手法：每個版本只多加一行依賴——proc-macro1，proc-macro2 的錯字仿冒。函式庫原始碼是真副本，所以建置完全正常。惡意行為全在 build script。

5/ build script 做的事：重組 C2 位址、安裝一個三個驗證方法都無條件回傳成功的憑證驗證器（＝關閉 TLS 驗證）、依 OS 與架構挑四個 payload 之一。Windows 上用 wscript.exe 隱藏執行後拋棄子行程，註解直說是要逃離 Cargo 的 job object。

6/ 最狠的一手：發布惡意版本的同一分鐘，把 0.3.5–0.3.9 全部 yank，讓 0.3.10 成為唯一不會跳警告的版本。通報者說：「cargo 的警告就是誘餌，我就是這樣中的。」

7/ 沒有 CVE、沒有修補版本。處置方式是翻 ~/.cargo/registry/cache 找那幾個 .crate 檔，並把 arrayref 釘在 0.3.9 或更早。等 CVE 進掃描器才動作的流程，這則會直接穿過去。

8/ 誠實的限制：RustSec 記載目前無證據顯示惡意版本被實際使用；被刪除版本的下載次數無人公布。曝險規模仍未知，別用累計 2.45 億次下載去推估。

#SupplyChainSecurity #Rust #DevSecOps #AppSec

#### Twitter / X 推文串（English）
1/ Rust supply chain attack, 20 Aug. The point is not the package names, it is the trigger: compiling was enough. The malicious code sat in a build script, so cargo build / check / test ran it — your code never had to call the crate.

2/ Timeline, to the second, published by the Rust team:
arrayref 0.3.10 — online 86 minutes
internment 0.8.7 — online 90 minutes
append-only-vec 0.1.9 — online 107 minutes
All three from one maintainer account, which has been locked.

3/ The Rust team's words: "We do not believe the author of arrayref to be acting maliciously, but their computer or credentials are likely compromised." How the account was compromised has not been disclosed.

4/ The method: each release added exactly one line — a dependency on proc-macro1, a typosquat of the ubiquitous proc-macro2. Its library source is a genuine copy, so builds completed normally. Everything malicious lived in the build script.

5/ What the build script did: reassembled its C2 address at build time, installed a certificate verifier whose three verification methods return success unconditionally (TLS validation off), then picked one of four payloads by OS and architecture. On Windows it launched hidden via wscript.exe and abandoned the child — commented as escaping Cargo's job object.

6/ The sharpest move: within the same minute as the malicious publish, 0.3.5–0.3.9 were all yanked, leaving 0.3.10 as the only version that would not trigger a warning. The reporter: "cargo's warning is the lure. That is how I hit it."

7/ No CVE, no patched version. Remediation is searching ~/.cargo/registry/cache for the specific .crate files and pinning arrayref at 0.3.9 or earlier. A process that waits for a CVE to reach a scanner misses this entirely.

8/ Honest caveat: RustSec records no evidence any malicious version was actually used, and download counts for the deleted versions have not been published. Real exposure is unknown — do not infer it from the 245M all-time downloads.

#SupplyChainSecurity #Rust #DevSecOps #AppSec

#### 部落格要點（中文版）
標題：當 yank 警告變成誘餌——從 86 分鐘的 Rust 投毒事件看建置期供應鏈風險

• 事件：2026 年 8 月 20 日 07:15 UTC，Rust 資安應變團隊接獲 proc-macro1 為惡意套件的通報，驗證後刪除該套件與 proc-macro-en、aovine、arone、aronenao、tinymember，並鎖定發布帳號
• 受害套件與存活時間（官方逐筆時間戳）：arrayref 0.3.10（07:15:00Z 發布、08:41:40Z 刪除，86 分鐘）、internment 0.8.7（07:34:07Z–09:04:11Z，90 分鐘）、append-only-vec 0.1.9（07:37:49Z–09:25:24Z，107 分鐘）
• 入侵路徑：三者同屬一位維護者帳號；Rust 團隊判斷作者本人並無惡意，而是電腦或憑證遭入侵，入侵手法未公布
• 技術核心：每個版本在 manifest 只多一行，指向 proc-macro2 的錯字仿冒 proc-macro1；其函式庫原始碼是真實副本，因此建置正常無異狀，惡意行為全數藏在 build script
• build script 行為：建置期由 base64 片段重組 payload 主機與 C2 位址、安裝三個驗證方法都無條件成功的自訂憑證驗證器（等同關閉 TLS 驗證）、依 OS 與 CPU 架構選用四個 payload 之一；Unix／macOS 寫入 /tmp/rust-setup 分離執行，Windows 經 VBScript 以 wscript.exe 隱藏執行 PowerShell 後拋棄子行程以逃離 Cargo 的 job object
• 誘餌設計：同一分鐘內 yank 掉 0.3.5–0.3.9，使惡意的 0.3.10 成為唯一不會觸發「建議更新到未 yank 版本」警告的版本——安全提示被反轉為誘導路徑；Rust 團隊事後已把被惡意 yank 的版本 unyank 回來
• 暴露面：arrayref 累計 245,385,500 次下載、近 90 天 53,905,601 次、403 個 crate 依賴它（The Hacker News 8/21 以 crates.io API 查得）；一條已驗證的依賴鏈為 winit → sctk-adwaita ^0.10.1 → tiny-skia ^0.11 → arrayref ^0.3.6，鏈上每段皆為 0.3.x caret 範圍，會接受 0.3.10
• 生態圈反應：blake3 於當日 09:09 UTC 的 1.8.7 移除該依賴，blake2b_simd 與 blake2s_simd 分別於 09:25、09:26 UTC 跟進
• 第二階段：據 Wiz，implant 以 HTTPS POST 回連 /49890878，於 Windows 用 Run 機碼、macOS 用 LaunchAgent、Linux 用 systemd user service 持久化，並竊取 Chrome／Brave／Edge 的瀏覽器憑證；Nextron 指出所分析的 Windows 階段只讀 origin_url 與 username_value，且該分析未涵蓋 Linux 與 macOS payload
• 處置：無 CVE、無修補版本；官方作法是以 find 指令檢查 ~/.cargo/registry/cache 是否留有相關 .crate 檔，並將 arrayref 釘在 0.3.9 或更早
• 對電子製造業的意涵：受害面在 CI 建置節點與工程師開發機，不在出貨的產品本身；韌體與嵌入式團隊應檢視建置環境是否允許 build script 對外連線，並把「建置期網路egress」納入與產線同級的控制項目
• 誠實的未知數：RustSec 三則通告均記載無證據顯示惡意版本被實際使用；被刪除版本的下載次數至今無人公布，曝險規模不可由總下載量推估

#SupplyChainSecurity #Rust #DevSecOps #AppSec

#### 部落格要點（English）
Title: When the yank warning becomes the lure — build-time supply chain risk after an 86-minute Rust compromise

• The event: at 07:15 UTC on 20 August 2026 the Rust Security Response Team received a report that proc-macro1 was malicious, verified it, deleted that crate along with proc-macro-en, aovine, arone, aronenao and tinymember, and locked the publishing account
• Affected releases and exposure windows, with the maintainers' own timestamps: arrayref 0.3.10 (published 07:15:00Z, deleted 08:41:40Z — 86 minutes), internment 0.8.7 (07:34:07Z–09:04:11Z — 90 minutes), append-only-vec 0.1.9 (07:37:49Z–09:25:24Z — 107 minutes)
• The entry point: all three belong to one maintainer account; the Rust team assessed the author as not acting maliciously but with a likely compromised machine or credentials, and the compromise method has not been disclosed
• The technical core: each release added a single manifest line, a dependency on proc-macro1, a typosquat of proc-macro2 whose library source is a genuine copy — so builds completed normally and everything malicious lived in the build script
• What the build script did: reassembled the payload host and C2 address from base64 fragments at build time, installed a custom certificate verifier whose three verification methods return success unconditionally (effectively disabling TLS validation), and selected one of four payloads by OS and CPU architecture; on Unix and macOS it wrote /tmp/rust-setup and spawned it detached, and on Windows it ran PowerShell hidden through a VBScript launcher under wscript.exe before abandoning the child process to escape Cargo's job object
• The lure: within the same minute, versions 0.3.5 through 0.3.9 were yanked, leaving the malicious 0.3.10 as the only version that would not trigger "consider updating to a version that is not yanked" — a safety prompt turned into a delivery path; the Rust team later unyanked the maliciously-yanked versions
• Exposure: arrayref has 245,385,500 all-time downloads, 53,905,601 in the 90 days to 20 August, and 403 dependent crates (verified by The Hacker News via the crates.io API on 21 August); one confirmed chain runs winit → sctk-adwaita ^0.10.1 → tiny-skia ^0.11 → arrayref ^0.3.6, and every caret range on 0.3.x accepts 0.3.10
• Ecosystem response: blake3 dropped the dependency in 1.8.7 at 09:09 UTC the same morning, with blake2b_simd and blake2s_simd following at 09:25 and 09:26 UTC
• Stage two: per Wiz, the implant beacons over HTTPS POST to /49890878, persists via a Registry Run key on Windows, a LaunchAgent on macOS and a systemd user service on Linux, and steals browser credentials from Chrome, Brave and Edge; Nextron notes the Windows stage it analysed queries only origin_url and username_value, and that its analysis did not cover the Linux and macOS payloads
• Remediation: no CVE and no patched version; the official guidance is a find over ~/.cargo/registry/cache for the specific .crate files, plus pinning arrayref at 0.3.9 or earlier
• What it means for electronics manufacturing: the exposed surface is CI runners and developer machines, not the shipped product; firmware and embedded teams should ask whether their build environment permits outbound connections from build scripts, and treat build-time egress as a controlled item on par with production network controls
• The honest unknown: all three RustSec advisories record no evidence that any malicious version was used, and download counts for the deleted versions remain unpublished — exposure cannot be inferred from the all-time total

#SupplyChainSecurity #Rust #DevSecOps #AppSec

#### 新聞簡報 / 簡訊（中文版）
2026 年 8 月 20 日 07:15 UTC，Rust 資安應變團隊接獲通報指 proc-macro1 crate 為惡意套件，經驗證確認其 build script 會在建置時下載並執行遠端 payload，隨即刪除該套件與 proc-macro-en、aovine、arone、aronenao、tinymember，並鎖定發布帳號。團隊同時發現三個熱門套件已被改為依賴它：arrayref 0.3.10 線上 86 分鐘、internment 0.8.7 線上 90 分鐘、append-only-vec 0.1.9 線上 107 分鐘，三者同屬一位維護者帳號，Rust 團隊判斷作者本人並無惡意而是電腦或憑證遭入侵。攻擊的關鍵在於惡意程式碼藏於被注入依賴的 build script，只要依賴解析到它，cargo build、cargo check、cargo test 均會執行 payload，專案本身不需呼叫該套件；proc-macro1 是 proc-macro2 的錯字仿冒且函式庫原始碼為真實副本，因此建置過程毫無異狀。攻擊者並在同一分鐘內將 arrayref 0.3.5 至 0.3.9 全部 yank，使惡意的 0.3.10 成為唯一不會觸發更新警告的版本。本案無 CVE、無修補版本，官方處置為以 find 指令檢查 ~/.cargo/registry/cache 是否留有相關 .crate 檔並將 arrayref 釘在 0.3.9 或更早；RustSec 通告記載目前無證據顯示惡意版本曾被實際使用，被刪除版本的下載次數尚未公布。建議韌體與嵌入式團隊立即檢查 CI 建置節點與開發機，並檢視建置環境是否允許 build script 對外連線。主要來源：Rust 官方部落格（8/20）、RUSTSEC-2026-0260（8/20）、The Hacker News（8/20）。

#SupplyChainSecurity #Rust #DevSecOps #AppSec

#### 新聞簡報 / 簡訊（English）
At 07:15 UTC on 20 August 2026 the Rust Security Response Team received a report that the proc-macro1 crate was malicious, verified that its build script downloaded and executed a remote payload at build time, and deleted it along with proc-macro-en, aovine, arone, aronenao and tinymember, locking the publishing account. The team also found three widely used crates had been republished to depend on it: arrayref 0.3.10 was online for 86 minutes, internment 0.8.7 for 90 minutes and append-only-vec 0.1.9 for 107 minutes, all from one maintainer account that the team assessed as compromised rather than malicious. The decisive detail is that the malicious code lived in the build script of the injected dependency, so resolving it was enough for cargo build, cargo check or cargo test to run the payload without the project ever calling the crate; proc-macro1 is a typosquat of proc-macro2 whose library source is a genuine copy, so builds completed with no visible anomaly. The attacker also yanked arrayref 0.3.5 through 0.3.9 within the same minute, leaving the malicious 0.3.10 as the only version that would not trigger Cargo's update warning. There is no CVE and no patched version; official remediation is a find over ~/.cargo/registry/cache for the specific .crate files plus pinning arrayref at 0.3.9 or earlier, and the RustSec advisories record no evidence that any malicious version was used, with download counts for the deleted versions still unpublished. Firmware and embedded teams should check CI runners and developer machines now, and review whether their build environments permit outbound connections from build scripts. Sources: Rust Blog (8/20), RUSTSEC-2026-0260 (8/20), The Hacker News (8/20).

#SupplyChainSecurity #Rust #DevSecOps #AppSec
