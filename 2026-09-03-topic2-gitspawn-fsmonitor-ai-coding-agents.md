# 本期內容創意 — 2026-09-03（涵蓋 8/31–9/2）

## 選題 2：你還沒按下「信任這個資料夾」，程式已經跑了——一個 git 設定值打穿七款 AI coding agent

### 標題 / 引子
**Manifold Security 在 8 款發現中證明：只要你用 AI coding agent 打開一個別人給的資料夾，`.git/config` 裡的一行設定就能在你的機器上執行指令。不需要 prompt，不需要模型回應，不需要工具核准。而這個洞，2025 年 12 月就被修過一次。**

### 切入點 / 發布價值
這則的價值不在「又一個 AI 工具有漏洞」，而在它精準地反駁了一個很流行的直覺。

過去一年，AI coding agent 的資安討論幾乎都繞著模型打轉：prompt injection、工具濫用、代理自主性。Manifold 的研究把注意力拉回一個更難堪的地方，他們的原句是：

「這個漏洞不在模型裡，也不在任何新東西裡。它在底下那些平凡的管線裡——在代理啟動時為了搞清楚自己在哪，而生出來的那個子行程。」

具體機制簡單到令人不安。AI coding agent 為了取得脈絡，會在啟動時執行 git 指令（例如查目前分支狀態）。git 的設定檔可以指定「執行外部指令」的欄位，其中 `core.fsmonitor` 會在索引刷新時被 git 呼叫執行。於是：**一個惡意儲存庫可以決定你的機器要跑什麼指令**——而且這件事發生在工作區信任提示之前、甚至在驗證之前，跑在代理的沙箱之外，也不會觸發任何工具核准流程。

Manifold 的說法是：「如果那個資料夾是別的地方來的，那就由那個儲存庫來決定那個指令跑什麼。」

有三個角度值得寫。

**第一，這是一個「類別」問題，不是一個 bug。** Sonar 的研究員 Yaniv Nizry 在 2026 年 4 月 30 日發表的分析裡就寫過同一個 sink：Claude Code CLI 在使用者按下信任提示之前就執行 `git status`，惡意專案把 `core.fsmonitor` 設成任意指令即可執行；該問題在 **2025 年 12 月 16 日**的 v2.0.71 修掉。同一篇還記錄了另外三條路徑——`log.showSignature` 搭配 `gpg.program`、`.claude/settings.json` 的 `apiKeyHelper`（原文形容為「一段自訂腳本，會在 /bin/sh 中執行」）、以及信任前就會跑的 hooks。九個月後，同一個 sink 出現在七款不同的代理上。這正好接上 CISA 在 9 月 1 日那份談「消除漏洞類別」的檢討的核心命題：一個一個修，不會讓這類漏洞消失。

**第二，修補狀態的落差本身就是新聞。** 依 Manifold 公布的對照表，發表當下 8 項發現中有 4 項未修：Claude Code 的另一條路徑（ultrareview，7/15 通報，2.1.252 仍未修）、Qwen Code（7/7 通報，0.22.3 仍未修）、Grok Build（7/14 通報，1.0.13 仍未修）、Hermes（7/20 通報，0.21.0 仍未修）。已修的是 Claude Code 的 `core.fsmonitor` 路徑（2.1.196）、goose（1.44.0）、OpenAI Codex、Cursor。Manifold 另記錄：有五份報告被以「與同日獨立提交的發現重複」為由退回；Hermes 方面「跨五個管道嘗試聯繫六次」都沒有得到分流回應。

**第三，對 CISO 與工程主管的實務結論非常明確**：把「clone 一個別人的 repo，然後在裡面開 agent」這個動作，視同執行來路不明的執行檔。這不是比喻——在未修版本上，它的效果就是。

### 本期支撐論點（含來源與日期）
1. **研究本體**：Manifold Security 於 2026 年 9 月 1 日發表「GitSpawn: A Single Flaw Lets Untrusted Repos Run Code in Claude Code, Codex, Cursor, and Grok」，涵蓋 **8 項發現、7 款代理**，發表當下有 **4 項未修**。來源：Manifold Security 研究文章（2026-09-01）。
2. **機制**：AI coding agent 為蒐集脈絡而在啟動時執行 git 指令，這常常發生在工作區信任提示或驗證之前。git 設定檔可指定執行指令的 sink——特別是 `core.fsmonitor`——並在儲存庫索引刷新時執行任意程式碼。原文：「If that folder came from somewhere else, the repository decides what that command runs.」與「The vulnerability is not in the model, or in anything new. It is in the ordinary plumbing underneath, the subprocess an agent spawns at session startup to work out where it is.」來源：Manifold Security（2026-09-01）；後句經 The Hacker News（2026-09-02）引述。
3. **受影響代理與修補狀態（Manifold 對照表）**：Claude Code（`core.fsmonitor` 路徑，2.1.193，2026-06-26 通報，已於 2.1.196 修補）；Claude Code（ultrareview 路徑，2.1.210，2026-07-15 通報，2.1.252 未修）；Qwen Code（0.19.6，2026-07-07 通報，0.22.3 未修）；goose（1.41.0，2026-07-13 通報，1.44.0 已修）；Grok Build（0.2.93，2026-07-14 通報，1.0.13 未修）；Hermes（0.18.2，2026-07-20 通報，0.21.0 未修）；OpenAI Codex（2026-07-20 通報，已修）；Cursor（2026-07-08 通報，已修）。來源：Manifold Security（2026-09-01）。
4. **goose 的 CVE 與官方諮詢**：CVE-2026-72718，GitHub 安全諮詢 GHSA-r5pp-p5r8-466r，標題「Arbitrary command execution in goose CLI via `goose review` via git core.fsmonitor」，發布日 **2026-07-24**，嚴重度 High，**CVSS v4.0 基本分數 7.0**（向量 CVSS:4.0/AV:L/AC:L/AT:N/PR:L/UI:A/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N），影響版本為 1.44.0 以下、修補版本 1.44.0，通報者具名為 **Manifold Security 的 Francisco Rosales**。諮詢原文說明該指令執行會繞過 goose 全部的安全控制，包含 LLM 工具核准與信任提示，並以執行使用者的權限執行，可外洩環境變數中的機密與 API 金鑰。同一 CVE 已於 **2026-08-10** 收錄於 NVD，評分一致（7.0 HIGH，CVSS v4.0）。來源：GitHub 安全諮詢（2026-07-24）、NVD（2026-08-10）。
5. **OpenAI Codex 的 CVE**：CVE-2026-19592，NVD 發布日 **2026-09-01**，CVSS v3.1 **7.3 HIGH**。NVD 描述指 Codex CLI（Windows／macOS／Linux）與 Codex Desktop（Windows／macOS）在自動蒐集 git 儲存庫中繼資料時未停用儲存庫本地的 `core.fsmonitor` 設定；若使用者開啟攻擊者準備好的儲存庫，git 可在 Codex 蒐集中繼資料時執行該 helper，且**執行於 Codex 的指令沙箱之外、且無使用者核准提示**，以使用者權限執行。來源：NVD（2026-09-01）。
6. **Hermes 的 CVE 尚未公開**：CVE-2026-71963 由 VulnCheck 指派，Manifold 表示廠商從未對該諮詢進行分流。本站於本期查詢 NVD，該 CVE **查無資料**（totalResults 為 0），與「尚未發布」的說法一致。來源：Manifold Security（2026-09-01）、NVD 查詢（2026-09-03，無結果）。
7. **Claude Code 相關的另一個已公開 CVE（需區分，勿混寫）**：CVE-2026-55607，NVD 發布日 **2026-06-29**，CVSS v4.0 7.7 / v3.1 8.8（皆為 HIGH）。其描述為：Claude Code 自 2.1.38 起至 2.1.163 為止，worktree 處理允許建立名為 `.git` 的 worktree 並導向沙箱脈絡外的 worktree，形成 git 目錄混淆攻擊；透過符號連結操作與 worktree 操作期間的 git fsmonitor 執行，攻擊者可覆寫使用者家目錄中的檔案（例如 `.zshenv`），在 seatbelt 沙箱限制之外取得程式碼執行。這與 Manifold 表中「Claude Code `core.fsmonitor` 路徑於 2.1.196 修補」**不是同一項**，兩者相關但影響版本與修補版本都不同。來源：NVD（2026-06-29）。
8. **同一個 sink 九個月前就被修過**：Sonar 研究員 Yaniv Nizry 於 2026 年 4 月 30 日發表「Arbitrary code execution and Claude Code CLI: How Claude executed code before you click 'trust'」，記錄 Claude Code CLI 的兩個關鍵漏洞，於 **2025 年 12 月 16 日的 v2.0.71** 修補。其一即 git 專案設定造成的任意程式碼執行：原文「If a malicious project sets this value to an arbitrary command, Git will execute it when `git status` is run, which happens before Claude Code's security prompt.」；另有 `log.showSignature` 搭配 `gpg.program` 的變體。其二為 `.claude/settings.json` 在信任對話框之前即被載入，可經 `apiKeyHelper`（原文：「a Custom script, to be executed in /bin/sh」）或信任前 hooks 執行指令。文中結論：「Simply cloning or downloading an untrusted repository and running the tool inside it would be enough to compromise a developer's environment.」來源：Sonar（2026-04-30）。
9. **廠商回應的品質差異**：Manifold 記錄五份報告被以與同日獨立提交的發現重複為由退回，其中 Claude Code 的報告被以重複結案；Hermes 則在「跨五個管道嘗試聯繫六次」後仍未獲分流回應。來源：Manifold Security（2026-09-01）。
10. **同期的治理對照**：CISA 於 2026 年 9 月 1 日發表檢討，主張應以「消除漏洞類別」取代逐案修補。本則正好是該主張的實證：同一個 git sink 在 2025 年 12 月被單點修掉之後，2026 年在七款不同代理上重新出現。來源：Help Net Security（2026-09-01）。

### 查證與限制
- **一手來源已直接開啟核對**：Manifold Security 的研究文章、goose 的 GitHub 安全諮詢（GHSA-r5pp-p5r8-466r）、Sonar 的技術分析，皆已取得內文；CVE-2026-72718、CVE-2026-19592、CVE-2026-55607 三項則直接查詢 **NVD API** 取得原始 JSON，發布日期、CVSS 分數與向量、影響版本敘述均逐字比對自 NVD，未經媒體轉手。
- **一項媒體誤讀，本則更正**：The Hacker News（2026-09-02）在列舉 CVE 時寫「CVE-2026-72718 (goose, CVSS 4.0)」。查 NVD 與 GitHub 諮詢，**4.0 是 CVSS 的版本號，不是分數**，該漏洞的 CVSS v4.0 基本分數為 **7.0（High）**。若照抄會嚴重低估嚴重度。
- **一項媒體歸類需要修正，本則分開處理**：The Hacker News 把 CVE-2026-55607 列為「Claude Code fsmonitor」。NVD 原始描述顯示該 CVE 的核心是 **worktree 目錄混淆**（影響 2.1.38–2.1.163），fsmonitor 只是其利用鏈的一環；而 Manifold 對照表中 Claude Code 的 `core.fsmonitor` 路徑是在 **2.1.196** 修補。兩者相關但不是同一項，本則分列並註明差異，不合併敘述。
- **Hermes 的 CVE 目前無法從公開資料庫查證**：CVE-2026-71963 在本期查詢 NVD 時查無資料。「由 VulnCheck 指派」「廠商未分流」兩項僅有 Manifold 單方陳述，本站未能取得廠商回應或第三方佐證，撰稿時應標明為研究方說法。
- **未修狀態是「發表當下」的快照**：Manifold 表中列為未修的四項（Claude Code ultrareview 路徑、Qwen Code、Grok Build、Hermes），其版本號為 2026 年 9 月 1 日的狀態。這類工具更新極快，轉發或再利用本內容前**必須重新確認當前版本**，不可把「未修」寫成持續事實。
- **Manifold 是商業資安廠商**：本則的核心敘事、對照表與廠商回應紀錄均出自 Manifold Security 自己的發表。CVE 與 GHSA 部分已由 NVD 與 GitHub 獨立佐證，但「五份報告被以重複退回」「六次聯繫五個管道」等流程性描述僅有單方紀錄。
- **Sonar 那篇的日期需要說清楚**：Sonar 文章發表於 **2026 年 4 月 30 日**，但其所述漏洞的修補時點是 **2025 年 12 月 16 日（v2.0.71）**。撰稿時兩個日期不可混用，否則「九個月前就修過」的時間線會錯。
- **本則不主張任何具名產品「目前不安全」**：所有敘述均綁定特定版本號與特定通報／修補日期。避免寫成對某品牌的整體安全評價。
- **與本站既有選題的關係**：本則**不重複** 2026-08-24 期選題 02（Rust crates build script 供應鏈投毒）與 2026-08-27 期選題 02（NVIDIA NemoClaw／Ollama 模型投毒）。那兩則的載體是套件與模型，本則的載體是**開發者本機的 git 設定檔與代理啟動流程**，攻擊面與修補責任方都不同。

### 原始來源網址
- 🏛 Manifold Security：GitSpawn: A Single Flaw Lets Untrusted Repos Run Code in Claude Code, Codex, Cursor, and Grok（2026-09-01）
  https://www.manifold.security/blog/ai-coding-agents-git-hijack
- 🏛 GitHub 安全諮詢 GHSA-r5pp-p5r8-466r（goose，CVE-2026-72718，2026-07-24）
  https://github.com/aaif-goose/goose/security/advisories/GHSA-r5pp-p5r8-466r
- 🏛 NVD：CVE-2026-72718（2026-08-10）
  https://nvd.nist.gov/vuln/detail/CVE-2026-72718
- 🏛 NVD：CVE-2026-19592（OpenAI Codex，2026-09-01）
  https://nvd.nist.gov/vuln/detail/CVE-2026-19592
- 🏛 NVD：CVE-2026-55607（Claude Code worktree，2026-06-29）
  https://nvd.nist.gov/vuln/detail/CVE-2026-55607
- 🏛 Sonar：Arbitrary code execution and Claude Code CLI（2026-04-30）
  https://www.sonarsource.com/blog/claude-arbitrary-code-execution/
- 📰 The Hacker News：Malicious .git Configs Enable Code Execution in AI Coding Agents（2026-09-02）
  https://thehackernews.com/2026/09/malicious-git-configs-can-make-claude.html
- 📰 Help Net Security：CISA review makes the case for eliminating vulnerability classes（2026-09-01）
  https://www.helpnetsecurity.com/2026/09/01/cisa-on-eliminating-recurring-security-weaknesses/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
你的 AI coding agent 在你按下「信任這個資料夾」之前，已經跑過指令了。

Manifold Security 9 月 1 日發表的研究，在 7 款 AI coding agent 上找到 8 項發現，發表當下有 4 項還沒修。機制簡單到令人不安：

代理啟動時，會執行 git 指令來搞清楚自己在哪個分支、狀態如何。git 的設定檔裡有一個欄位叫 core.fsmonitor，它的值是一個「指令」，git 會在索引刷新時執行它。

所以，如果那個 .git/config 是別人給你的——它就決定了你的機器要跑什麼。

不需要 prompt。不需要模型回應。不需要工具核准。而且跑在代理的沙箱之外。

Manifold 的原話我覺得是這則研究最好的一句：

「這個漏洞不在模型裡，也不在任何新東西裡。它在底下那些平凡的管線裡——在代理啟動時為了搞清楚自己在哪，而生出來的那個子行程。」

過去一年 AI 工具的資安討論幾乎都在講 prompt injection 和代理自主性。這則把注意力拉回一個更難堪的地方：問題出在 subprocess。

但真正讓我停下來的是時間線。

Sonar 的研究員 Yaniv Nizry 早就寫過同一個 sink。Claude Code CLI 在信任提示之前執行 git status，惡意專案設定 core.fsmonitor 即可執行任意指令——這個問題在 2025 年 12 月 16 日的 v2.0.71 就修掉了。同一篇還記錄了 log.showSignature 搭 gpg.program、.claude/settings.json 的 apiKeyHelper（Sonar 形容它是「一段會在 /bin/sh 執行的自訂腳本」）、還有信任前就會跑的 hooks。

九個月後，同一個 sink 在七款不同的代理上重新出現。

這正是 CISA 9 月 1 日那份檢討在講的事：逐案修補不會讓一個漏洞類別消失。單點修掉一個產品的一條路徑，別的產品照樣會踩。

已經有 CVE 的部分（我直接查了 NVD，不是引用媒體）：
• CVE-2026-72718，goose，CVSS v4.0 基本分數 7.0 High，1.44.0 修補，通報者是 Manifold 的 Francisco Rosales
• CVE-2026-19592，OpenAI Codex，9 月 1 日發布，CVSS v3.1 7.3 High，NVD 明確寫「執行於 Codex 的指令沙箱之外、且無使用者核准提示」
• CVE-2026-71963，Hermes，VulnCheck 指派，NVD 目前查無資料

順帶更正一個已經在流傳的錯誤：有報導把 goose 那項寫成「CVSS 4.0」。4.0 是 CVSS 的版本號，分數是 7.0。

實務上只有一句話要記：在未修版本上，clone 一個別人的 repo 然後在裡面開 agent，等同於執行一個來路不明的執行檔。請照這個等級去對待它。

（各產品的修補狀態是 9 月 1 日的快照，工具更新很快，行動前請重新確認你手上的版本。）

#AISecurity #DevSecOps #SupplyChainSecurity #AppSec #AICodingAgents

#### LinkedIn 草稿（English）
Your AI coding agent has already run a command before you click "trust this folder."

Research published by Manifold Security on 1 September covers eight findings across seven AI coding agents, four of them unpatched at publication. The mechanism is uncomfortably simple:

At startup, the agent runs git commands to work out which branch it is on and what state the repo is in. Git config has a field called core.fsmonitor whose value is a command, and git executes it when the index refreshes.

So if that .git/config came from someone else, it decides what runs on your machine.

No prompt. No model response. No tool approval. And it runs outside the agent's sandbox.

Manifold's own line is the best sentence in the research:

"The vulnerability is not in the model, or in anything new. It is in the ordinary plumbing underneath, the subprocess an agent spawns at session startup to work out where it is."

For a year the security conversation around AI tooling has been prompt injection and agent autonomy. This pulls attention back to somewhere more embarrassing: it is the subprocess.

What actually made me stop, though, is the timeline.

Sonar's Yaniv Nizry documented the same sink months ago. Claude Code CLI ran git status before the trust prompt, so a malicious project setting core.fsmonitor got arbitrary execution — fixed in v2.0.71 on 16 December 2025. The same write-up covers a log.showSignature plus gpg.program variant, the apiKeyHelper setting in .claude/settings.json (which Sonar describes as "a Custom script, to be executed in /bin/sh"), and pre-trust hooks.

Nine months later the same sink shows up across seven different agents.

Which is exactly the argument in CISA's 1 September review: patching case by case does not eliminate a vulnerability class. Closing one path in one product does not stop the next product walking into it.

The CVEs, pulled from NVD directly rather than from coverage:
• CVE-2026-72718, goose, CVSS v4.0 base score 7.0 High, fixed in 1.44.0, credited to Manifold's Francisco Rosales
• CVE-2026-19592, OpenAI Codex, published 1 September, CVSS v3.1 7.3 High, with NVD stating the helper "runs outside Codex's command sandbox and without a user-approval prompt"
• CVE-2026-71963, Hermes, assigned by VulnCheck, currently not found in NVD

One correction worth making, because it is already circulating: some coverage rendered the goose entry as "CVSS 4.0." That is the CVSS version. The score is 7.0.

Practically there is only one thing to remember. On an unpatched version, cloning someone else's repo and opening an agent inside it is equivalent to running an unknown executable. Treat it at that level.

(Patch statuses are a snapshot from 1 September. These tools move fast — re-check your own versions before acting.)

#AISecurity #DevSecOps #SupplyChainSecurity #AppSec #AICodingAgents

#### Twitter / X 推文串（中文版）
1/ Manifold Security（9/1）在 7 款 AI coding agent 上找到 8 項發現，發表當下 4 項未修。攻擊條件只有一個：你用 agent 打開一個別人給的資料夾。

2/ 機制：代理啟動時執行 git 指令取得脈絡。git 設定檔的 core.fsmonitor 欄位存的是一個指令，git 會在索引刷新時執行它。所以那個 .git/config 決定你的機器跑什麼——在信任提示之前，在沙箱之外，不經工具核准。

3/ Manifold 原話：「這個漏洞不在模型裡，也不在任何新東西裡。它在底下那些平凡的管線裡——在代理啟動時為了搞清楚自己在哪，而生出來的那個子行程。」

4/ CVE（直接查 NVD）：CVE-2026-72718，goose，CVSS v4.0 基本分數 7.0 High，1.44.0 修補，通報者 Manifold 的 Francisco Rosales。

5/ CVE-2026-19592，OpenAI Codex，9/1 發布，CVSS v3.1 7.3 High。NVD 描述明確：helper「執行於 Codex 的指令沙箱之外、且無使用者核准提示」，以使用者權限執行。

6/ CVE-2026-71963，Hermes，由 VulnCheck 指派，本站查詢 NVD 目前無資料。Manifold 稱廠商在「跨五個管道嘗試聯繫六次」後仍未分流。

7/ 更正一個流傳中的錯誤：有報導把 goose 那項寫成「CVSS 4.0」。4.0 是 CVSS 版本號，分數是 7.0。抄錯會低估嚴重度。

8/ 也要區分：CVE-2026-55607（Claude Code，6/29 發布，v4.0 7.7／v3.1 8.8）在 NVD 的核心描述是 worktree 目錄混淆（影響 2.1.38–2.1.163），fsmonitor 只是利用鏈一環；和 Manifold 表中 2.1.196 修補的 core.fsmonitor 路徑不是同一項。

9/ 最值得注意的是時間線：Sonar 的 Yaniv Nizry 早記錄過同一個 sink，Claude Code CLI 在信任提示前跑 git status 的問題，2025/12/16 的 v2.0.71 就修了。九個月後同一個 sink 出現在七款代理上。

10/ 這正是 CISA 9/1 檢討的主張：逐案修補不會消除一個漏洞類別。實務結論一句話：未修版本上，clone 別人的 repo 再開 agent，等同執行來路不明的執行檔。（修補狀態為 9/1 快照，行動前請重新確認版本。）

#AISecurity #DevSecOps #AppSec #AICodingAgents

#### Twitter / X 推文串（English）
1/ Manifold Security (1 Sept) reports eight findings across seven AI coding agents, four unpatched at publication. The only precondition: you open a folder someone else gave you, inside an agent.

2/ Mechanism: agents run git commands at startup to gather context. Git config's core.fsmonitor field holds a command, and git executes it on index refresh. So that .git/config decides what runs on your machine — before the trust prompt, outside the sandbox, with no tool approval.

3/ Manifold's own words: "The vulnerability is not in the model, or in anything new. It is in the ordinary plumbing underneath, the subprocess an agent spawns at session startup to work out where it is."

4/ CVEs, pulled from NVD: CVE-2026-72718, goose, CVSS v4.0 base score 7.0 High, fixed in 1.44.0, credited to Manifold's Francisco Rosales.

5/ CVE-2026-19592, OpenAI Codex, published 1 Sept, CVSS v3.1 7.3 High. NVD is explicit that the helper "runs outside Codex's command sandbox and without a user-approval prompt," executing with the user's privileges.

6/ CVE-2026-71963, Hermes, assigned by VulnCheck, currently returns no record in NVD. Manifold reports the vendor never triaged the advisory after "six contact attempts across five channels."

7/ One correction, because it is already spreading: some coverage renders the goose entry as "CVSS 4.0." That is the CVSS version. The score is 7.0. Copying it wrong understates the severity.

8/ Also keep these apart: CVE-2026-55607 (Claude Code, published 29 June, v4.0 7.7 / v3.1 8.8) is described in NVD as worktree directory confusion affecting 2.1.38–2.1.163, with fsmonitor only one link in the chain. It is not the core.fsmonitor path Manifold lists as fixed in 2.1.196.

9/ The timeline is the real story. Sonar's Yaniv Nizry documented the same sink earlier: Claude Code CLI running git status before the trust prompt, fixed in v2.0.71 on 16 Dec 2025. Nine months later the same sink appears across seven agents.

10/ Which is precisely CISA's 1 Sept argument: case-by-case patching does not eliminate a vulnerability class. Practical takeaway: on an unpatched version, cloning someone's repo and opening an agent in it equals running an unknown executable. (Patch status is a 1 Sept snapshot — re-check your versions.)

#AISecurity #DevSecOps #AppSec #AICodingAgents

#### 部落格要點（中文版）
標題：問題不在模型，在 subprocess——一個 git 設定值如何打穿七款 AI coding agent

• 事件：Manifold Security 於 2026 年 9 月 1 日發表研究「GitSpawn」，涵蓋 8 項發現、7 款 AI coding agent，發表當下 4 項未修
• 機制：代理在啟動時執行 git 指令以蒐集脈絡，這常發生在工作區信任提示或驗證之前；git 設定檔可指定執行指令的 sink，其中 core.fsmonitor 會在儲存庫索引刷新時被執行，因而讓儲存庫本身決定在使用者機器上執行什麼指令，且執行於代理沙箱之外、不經工具核准
• 研究者的定調：「這個漏洞不在模型裡，也不在任何新東西裡。它在底下那些平凡的管線裡——在代理啟動時為了搞清楚自己在哪，而生出來的那個子行程。」以及「如果那個資料夾是別的地方來的，那就由那個儲存庫來決定那個指令跑什麼。」
• 已修補（依 Manifold 對照表，2026-09-01 快照）：Claude Code 的 core.fsmonitor 路徑（2.1.193 通報，2.1.196 修補）、goose（1.41.0 通報，1.44.0 修補）、OpenAI Codex、Cursor
• 發表當下未修（同一快照）：Claude Code 的 ultrareview 路徑（7/15 通報，2.1.252）、Qwen Code（7/7 通報，0.22.3）、Grok Build（7/14 通報，1.0.13）、Hermes（7/20 通報，0.21.0）
• CVE-2026-72718（goose）：GitHub 安全諮詢 GHSA-r5pp-p5r8-466r 於 2026-07-24 發布，High，CVSS v4.0 基本分數 7.0，影響 1.44.0 以下版本，通報者為 Manifold Security 的 Francisco Rosales；諮詢說明該執行會繞過 goose 全部安全控制（含 LLM 工具核准與信任提示），以使用者權限執行並可外洩環境機密與 API 金鑰；NVD 於 2026-08-10 收錄，評分一致
• CVE-2026-19592（OpenAI Codex）：NVD 於 2026-09-01 發布，CVSS v3.1 7.3 High；描述指 Codex CLI 與 Codex Desktop 自動蒐集 git 中繼資料時未停用儲存庫本地的 core.fsmonitor，helper 執行於 Codex 指令沙箱之外且無使用者核准提示，以使用者權限執行
• CVE-2026-71963（Hermes）：由 VulnCheck 指派，本站於 2026-09-03 查詢 NVD 無資料；Manifold 稱廠商在跨五個管道六次聯繫後仍未分流
• 需要區分的另一項：CVE-2026-55607（Claude Code），NVD 於 2026-06-29 發布，CVSS v4.0 7.7／v3.1 8.8，核心為 worktree 目錄混淆（影響 2.1.38 至 2.1.163），可經符號連結與 worktree 操作期間的 git fsmonitor 執行覆寫家目錄檔案（如 .zshenv）並在 seatbelt 沙箱外取得執行；與 Manifold 表中 2.1.196 修補的 core.fsmonitor 路徑不是同一項
• 這是漏洞類別而非單一 bug 的證據：Sonar 研究員 Yaniv Nizry 於 2026-04-30 發表的分析記錄了同一 sink——Claude Code CLI 在信任提示前執行 git status，惡意專案設定 core.fsmonitor 即可執行任意指令——該問題於 2025-12-16 的 v2.0.71 修補；同文另記錄 log.showSignature 搭 gpg.program 變體，以及 .claude/settings.json 在信任對話框前載入所導致的 apiKeyHelper 與 pre-trust hooks 兩條執行路徑
• 治理對照：CISA 於 2026-09-01 發表檢討，主張以消除漏洞類別取代逐案修補。本案是該主張的實證——單點修掉一個產品的一條路徑，九個月後同一 sink 在七款代理上重現
• 廠商回應的品質差異（Manifold 單方紀錄）：五份報告被以與同日獨立提交的發現重複為由退回，Claude Code 的報告以重複結案；Hermes 在跨五個管道六次聯繫後未獲分流
• 對工程組織的實務結論：在未修版本上，clone 外部儲存庫並在其中啟動代理，其風險等同執行來路不明的執行檔。建議把外部 repo 的首次開啟限制在隔離環境、對代理啟動時的 git 呼叫加上設定隔離（例如以受控的 GIT_CONFIG 環境開啟）、並把 agent 版本納入資產盤點與修補管理
• 引用紀律：修補狀態為 2026-09-01 快照，工具更新極快，再利用本內容前必須重新確認版本；勿把「未修」寫成持續事實，也勿據此對任何品牌作整體安全評價

#AISecurity #DevSecOps #AppSec #AICodingAgents

#### 部落格要點（English）
Title: The problem is not the model, it is the subprocess — how one git config value broke seven AI coding agents

• The event: Manifold Security published "GitSpawn" on 1 September 2026, covering eight findings across seven AI coding agents, four of them unpatched at publication
• The mechanism: agents run git commands at startup to gather context, frequently before workspace-trust prompts or authentication. Git config can specify command-execution sinks, notably core.fsmonitor, which git executes when the repository index refreshes — so the repository itself decides what runs on the user's machine, outside the agent's sandbox and without any tool-approval step
• The researchers' framing: "The vulnerability is not in the model, or in anything new. It is in the ordinary plumbing underneath, the subprocess an agent spawns at session startup to work out where it is," and "If that folder came from somewhere else, the repository decides what that command runs."
• Patched, per Manifold's table as of 1 September 2026: Claude Code's core.fsmonitor path (reported at 2.1.193, fixed in 2.1.196), goose (reported at 1.41.0, fixed in 1.44.0), OpenAI Codex, and Cursor
• Unpatched at publication, same snapshot: Claude Code's ultrareview path (reported 15 July, still 2.1.252), Qwen Code (reported 7 July, still 0.22.3), Grok Build (reported 14 July, still 1.0.13), and Hermes (reported 20 July, still 0.21.0)
• CVE-2026-72718 (goose): GitHub advisory GHSA-r5pp-p5r8-466r published 24 July 2026, High severity, CVSS v4.0 base score 7.0, affecting versions below 1.44.0, credited to Francisco Rosales of Manifold Security. The advisory states the execution bypasses all of goose's security controls including LLM tool approval and trust prompts, runs with the privileges of the user, and can exfiltrate environment secrets and API keys. NVD ingested it on 10 August 2026 with matching scoring
• CVE-2026-19592 (OpenAI Codex): published in NVD on 1 September 2026, CVSS v3.1 7.3 High. Codex CLI and Codex Desktop automatically collected git repository metadata without disabling the repository-local core.fsmonitor setting, and the helper "runs outside Codex's command sandbox and without a user-approval prompt", executing with the user's privileges
• CVE-2026-71963 (Hermes): assigned by VulnCheck; an NVD query on 3 September 2026 returned no record. Manifold reports the vendor never triaged the advisory after six contact attempts across five channels
• A separate CVE that should not be conflated: CVE-2026-55607 (Claude Code), published in NVD on 29 June 2026, CVSS v4.0 7.7 / v3.1 8.8, describes worktree directory confusion affecting 2.1.38 through 2.1.163, where symlink manipulation plus git fsmonitor execution during worktree operations could overwrite home-directory files such as .zshenv and achieve execution outside seatbelt sandbox restrictions. This is not the same finding as the core.fsmonitor path Manifold lists as fixed in 2.1.196
• Evidence that this is a class, not a bug: Sonar researcher Yaniv Nizry documented the same sink in an analysis published 30 April 2026 — Claude Code CLI ran git status before the trust prompt, so a malicious project setting core.fsmonitor achieved arbitrary execution — and that issue was fixed in v2.0.71 on 16 December 2025. The same write-up records a log.showSignature plus gpg.program variant, and two further paths from .claude/settings.json being loaded before the trust dialog: the apiKeyHelper setting and pre-trust hooks
• The governance parallel: CISA published a review on 1 September 2026 arguing for eliminating vulnerability classes rather than patching case by case. This case is the evidence — one path closed in one product, and nine months later the same sink resurfaces across seven agents
• Differences in vendor response, as recorded by Manifold alone: five reports were returned as duplicates of independently filed same-day findings, with the Claude Code reports closed as duplicate, while Hermes went untriaged after six contact attempts across five channels
• What engineering organisations should do: on an unpatched version, cloning an external repository and starting an agent inside it carries the same risk as running an unknown executable. Restrict first-open of external repos to an isolated environment, isolate git configuration around the agent's startup calls (for example by opening with a controlled GIT_CONFIG environment), and bring agent versions into asset inventory and patch management
• Citation discipline: patch statuses are a 1 September 2026 snapshot and these tools move quickly, so re-verify versions before reusing this content. Do not write "unpatched" as a standing fact, and do not extend any of it into a blanket security judgement about a brand

#AISecurity #DevSecOps #AppSec #AICodingAgents

#### 新聞簡報 / 簡訊（中文版）
Manifold Security 於 2026 年 9 月 1 日發表研究「GitSpawn」，在 7 款 AI coding agent 上提出 8 項發現，發表當下 4 項未修。攻擊條件只有一個：使用者以代理打開一個外部來源的資料夾。代理啟動時會執行 git 指令蒐集脈絡，而這常發生在工作區信任提示或驗證之前；git 設定檔中的 core.fsmonitor 欄位存放的是一個指令，會在儲存庫索引刷新時被 git 執行，因此惡意儲存庫可決定使用者機器上執行什麼——執行於代理沙箱之外、不經工具核准、不需要任何 prompt 或模型回應。研究者的定調是：「這個漏洞不在模型裡，也不在任何新東西裡。它在底下那些平凡的管線裡——在代理啟動時為了搞清楚自己在哪，而生出來的那個子行程。」CVE 部分（本站直接查 NVD）：CVE-2026-72718（goose）為 CVSS v4.0 基本分數 7.0 High、影響 1.44.0 以下、通報者為 Manifold 的 Francisco Rosales，GitHub 諮詢說明其執行會繞過含 LLM 工具核准與信任提示在內的全部安全控制；CVE-2026-19592（OpenAI Codex）於 9 月 1 日發布、CVSS v3.1 7.3 High，NVD 明確指 helper 執行於 Codex 指令沙箱之外且無使用者核准提示；CVE-2026-71963（Hermes）由 VulnCheck 指派、NVD 目前查無資料。需特別更正兩點：其一，有報導把 goose 那項寫成「CVSS 4.0」，4.0 是 CVSS 版本號、分數為 7.0；其二，CVE-2026-55607（Claude Code，6/29 發布）在 NVD 的核心描述是 worktree 目錄混淆（影響 2.1.38–2.1.163），與 Manifold 表中 2.1.196 修補的 core.fsmonitor 路徑不是同一項。本案最值得注意的是它是漏洞類別而非單一 bug：Sonar 研究員 Yaniv Nizry 在 2026 年 4 月 30 日的分析中記錄過同一個 sink，該問題已於 2025 年 12 月 16 日的 v2.0.71 修補，九個月後同一 sink 在七款代理上重現——正好印證 CISA 於 9 月 1 日提出的「應消除漏洞類別而非逐案修補」。實務結論：在未修版本上，clone 外部儲存庫並在其中啟動代理，風險等同執行來路不明的執行檔；建議把外部 repo 首次開啟限制在隔離環境、對代理啟動時的 git 呼叫做設定隔離，並把 agent 版本納入資產盤點與修補管理。修補狀態為 9 月 1 日快照，行動前請重新確認版本。主要來源：Manifold Security（9/1）、GitHub 安全諮詢（7/24）、NVD、Sonar（4/30）。

#AISecurity #DevSecOps #AppSec #AICodingAgents

#### 新聞簡報 / 簡訊（English）
Manifold Security published "GitSpawn" on 1 September 2026, reporting eight findings across seven AI coding agents with four unpatched at publication. The precondition is simply that a user opens an externally sourced folder inside an agent. Agents run git commands at startup to gather context, often before workspace-trust prompts or authentication; git config's core.fsmonitor field holds a command that git executes when the repository index refreshes, so a malicious repository decides what runs on the user's machine — outside the agent's sandbox, without tool approval, and with no prompt or model response involved. The researchers frame it as: "The vulnerability is not in the model, or in anything new. It is in the ordinary plumbing underneath, the subprocess an agent spawns at session startup to work out where it is." On the CVEs, queried directly from NVD: CVE-2026-72718 (goose) carries a CVSS v4.0 base score of 7.0 High, affects versions below 1.44.0 and is credited to Manifold's Francisco Rosales, with the GitHub advisory stating the execution bypasses all of goose's security controls including LLM tool approval and trust prompts; CVE-2026-19592 (OpenAI Codex) was published on 1 September at CVSS v3.1 7.3 High, with NVD stating explicitly that the helper runs outside Codex's command sandbox and without a user-approval prompt; CVE-2026-71963 (Hermes) was assigned by VulnCheck and currently returns no NVD record. Two corrections matter: some coverage rendered the goose entry as "CVSS 4.0", which is the CVSS version rather than the score of 7.0; and CVE-2026-55607 (Claude Code, published 29 June) is described in NVD as worktree directory confusion affecting 2.1.38 through 2.1.163, which is not the core.fsmonitor path Manifold lists as fixed in 2.1.196. The most significant point is that this is a vulnerability class rather than a single bug: Sonar researcher Yaniv Nizry documented the same sink in an analysis published 30 April 2026, with that issue fixed in v2.0.71 on 16 December 2025, and nine months later the same sink resurfaces across seven agents — precisely the argument in CISA's 1 September review that vulnerability classes should be eliminated rather than patched case by case. Practically, on an unpatched version cloning an external repository and starting an agent inside it carries the same risk as running an unknown executable; restrict first-open of external repos to an isolated environment, isolate git configuration around agent startup calls, and bring agent versions into asset inventory and patch management. Patch statuses are a 1 September snapshot — re-verify your versions before acting. Sources: Manifold Security (1 Sept), GitHub advisory (24 July), NVD, Sonar (30 April).

#AISecurity #DevSecOps #AppSec #AICodingAgents
