# 本期內容創意 — 2026-08-27（涵蓋 8/24–8/26）

## 選題 2：逛一個網頁，就把你本機 AI 代理背後的模型改掉了——而且改的是模型層，客戶端看不見

### 標題 / 引子
**一次瀏覽，永久植入：NVIDIA NemoClaw 的本地推論設定，讓惡意網頁能改寫模型的 chat template**

### 切入點 / 發布價值
「把 AI 跑在本機比較安全」是這兩年最常聽到的假設之一。這則正好戳在那個假設上。

值得寫的有三層：

第一，**受害的不是應用程式，是模型本身**。攻擊者寫入的是 Ollama 的 chat template——那是把結構化的訊息陣列轉成原始文字、送進模型之前的那一層。被汙染之後，每一次對話的 system message 後面都會被追加攻擊者的文字，**而且代理自己送進來的 system prompt 也蓋不掉它**。研究者的原話是：「客戶端偵測不到也阻止不了——template 是模型層級的屬性，對 API 消費者是不可見的。」

第二，**根因是一行環境變數**。NemoClaw 在某些路徑上以 `OLLAMA_HOST=0.0.0.0:11434` 啟動 Ollama，把模型伺服器綁到所有網路介面。而 Ollama 的 Host header 驗證——那是 2024 年為了修 DNS rebinding（CVE-2024-28224）才加上的——**在綁定位址不是 loopback 時會被整個跳過**。一個為了讓容器連得到主機而做的便利設定，把 2024 年修好的洞又打開了。

第三，**這則本身就是一個「查證會改變結論」的好例子**。8 月 25 日的媒體報導寫「這項研究沒有 CVE 編號」——那在發稿當下是對的。但同一天稍晚，NVIDIA PSIRT 指派的 **CVE-2026-65105** 就進了 NVD。更值得談的是：NVIDIA 自己的描述把影響寫成「資訊揭露與阻斷服務」，CVSS 向量也標成 **I:N（完整性影響：無）**——可是研究描述的是**持久性的模型汙染**，那明明是完整性問題。廠商評分與研究描述之間的這道落差，比漏洞本身更值得寫。

### 本期支撐論點（含來源與日期）
1. **研究本身**：Oasis Security 揭露 NVIDIA NemoClaw 的一項弱點，可讓**攻擊者控制的網頁在未經認證的情況下取得本機 Ollama 實例的控制權**，並在模型本身裡植入隱藏指令。研究在發表前已通報 NVIDIA 的產品安全事件應變小組（PSIRT）。來源：The Hacker News（2026-08-25）、SiliconANGLE（2026-08-25）。
2. **CVE 狀態（本則的關鍵更新）**：本案已指派 **CVE-2026-65105**，由 **NVIDIA PSIRT** 作為來源，NVD 於 **2026-08-25T21:17Z** 發布，狀態為 Received。CVSS 3.1 基本分數 **8.1（HIGH）**，向量為 `CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H`。NVIDIA 的官方描述為：「NVIDIA NemoClaw for Linux 的推論伺服器設定存在一項弱點，遠端攻擊者可在未經認證的情況下存取推論服務。成功利用可能導致資訊揭露與阻斷服務。」來源：NVD／CVE-2026-65105 記錄（2026-08-25，本次直接查詢 NVD API 取得）、NVIDIA 產品安全公告 5872。
3. **廠商評分與研究描述的落差（值得單獨寫一段）**：NVIDIA 的描述與 CVSS 向量把影響定為機密性高（C:H）、可用性高（A:H）、**完整性無（I:N）**；但研究描述的核心後果是**改寫 chat template、讓隱藏指令套用到之後的每一次對話**——那是完整性影響。此外向量的攻擊途徑是 **AV:A（相鄰網路）**，而研究描述的鏈是**任何使用者瀏覽一個網頁**即可觸發。引用 CVSS 分數時應同時指出這個落差，不要讓 8.1 這個數字取代對實際後果的判讀。來源：NVD／CVE-2026-65105 記錄（2026-08-25）、The Hacker News（2026-08-25）。
4. **NemoClaw 是什麼**：NVIDIA 的開源參考堆疊，用來在其 OpenShell 沙箱內執行 OpenClaw 之類的代理；Ollama 是它支援的本地推論後端之一。也就是說，**這條路徑影響的正是「把代理與模型都放在自己機器上」的那群使用者**。來源：The Hacker News（2026-08-25）。
5. **根因與平台差異**：報告指出 NemoClaw 以 `OLLAMA_HOST=0.0.0.0:11434` 啟動 Ollama，把模型伺服器綁到每一個網路介面。NemoClaw 的 Ollama 處理方式因平台而異——非 WSL 主機把 Ollama 留在 `127.0.0.1:11434`，前面擋一層綁在 `0.0.0.0:11435` 的 token 驗證反向代理，且 onboarding 會把已綁在別處的 daemon 重啟回 loopback；WSL 上的 Docker Desktop 跳過該代理，因為容器是透過 `host.docker.internal` 觸及主機 loopback；**Windows 主機的 Ollama 路徑則設定 `OLLAMA_HOST=0.0.0.0:11434`，讓 Docker Desktop 的容器連得到，而 11434 埠不需要任何認證**。來源：The Hacker News（2026-08-25，引述 Oasis 報告）。
6. **兩層防護為何同時失效**：11434 埠上的 API 沒有認證，僅靠兩層 middleware 阻擋來自瀏覽器的請求。當綁定位址不是 loopback 時，**Host header 檢查被整個跳過**；接著 CORS 那一層會把請求視為同源而放行，因為 Origin 與 Host 兩個標頭帶的都是攻擊者自己的網域——只要攻擊者把頁面架在 11434 埠上即可。剩下的缺口由 **DNS rebinding** 補上：攻擊者的網域先解析到自己的伺服器、再解析到 127.0.0.1，而瀏覽器全程仍視為同源。來源：The Hacker News（2026-08-25，引述 Oasis 報告）。
7. **這是 2024 年那個洞的回歸**：對 Ollama API 的 DNS rebinding 攻擊本身早有紀錄——Ollama 於 **2024 年 3 月 14 日**在 v0.1.29 修補，NCC Group 次月以 **CVE-2024-28224** 公布通告，該通告建議在伺服器端驗證 Host header、只允許一組授權值。Oasis 研究主管 Elad Luz 表示 Ollama 確實依 2024 年的揭露加入了該驗證，「但只要它綁定到非 loopback 位址，Ollama 就會跳過該驗證——而 `0.0.0.0` 正是 NemoClaw 的設定方式。」來源：The Hacker News（2026-08-25，逐字引用）。
8. **汙染怎麼持久化**：取得 API 後，報告的 payload 透過 `/api/create` 寫入一個被修改過的 Go template。該 template 控制結構化的 messages 陣列在送進模型前如何被渲染成原始文字，被汙染的版本會在推論時**把攻擊者控制的文字附加到每一則 system message 之後**。以此方式植入的指令會跨越後續的對話持續存在，並且**在代理自行提供 system prompt 的情況下仍然存活**。Oasis 的說法是：「客戶端偵測不到也阻止不了——template 是模型層級的屬性，對 API 消費者不可見。」來源：The Hacker News（2026-08-25，引述 Oasis 報告）。
9. **修補狀態（有平台差異，且需注意版本編號）**：Elad Luz 告訴媒體，**NemoClaw v0.0.35 在 macOS 與 Linux 上修正了此問題**；**Windows 與 WSL 路徑則沒有修補**，v0.0.34 在該路徑上加的是一段警告而非修正。另外，媒體於 8 月 25 日檢視 NemoClaw 儲存庫（commit 17f0ca3b）發現，本地 Ollama 代理現在會拒絕對非 loopback 綁定的後端啟動——這是 **v0.0.106 於 8 月 10 日**引入的預設，會以專屬狀態碼結束並印出「Refusing to start: an Ollama daemon reachable on a non-loopback interface bypasses the proxy's token check entirely…」。但該檢查**可用環境變數 `NEMOCLAW_OLLAMA_PROXY_SKIP_BIND_PROBE=1` 關閉**，且在無法執行綁定探測的主機上**不會 fail closed**。來源：The Hacker News（2026-08-25，含其自行檢視儲存庫）。
10. **NVIDIA 的回應與研究團隊背景**：NVIDIA 表示：「我們感謝研究人員的發現與通報。他們的工作展現了開源開發如何促成生態系中透明的協作，去測試軟體的極限、快速識別並修補漏洞，以強化代理式的資安。」另可補充的產業脈絡：這是 Oasis 團隊自 Cyera 於 7 月同意以據報 10 億美元收購該公司之後的第一份研究。來源：SiliconANGLE（2026-08-25，NVIDIA 聲明逐字）。
11. **利用現況**：截至 **2026 年 8 月 25 日，未有任何實際遭利用的報告**。完整攻擊鏈由 Luz 在 macOS 上以 Firefox 對一個有漏洞的 NemoClaw 版本測試通過。此類攻擊的標準修法是驗證 Host 與 Origin 標頭。來源：The Hacker News（2026-08-25）。

### 查證與限制
- **CVE 狀態由本次一手查詢確認，並更正了媒體報導**：The Hacker News 於 8/25 明載「這項研究沒有 CVE 編號」。本次直接以 NVD API 查詢確認 **CVE-2026-65105 確實存在**：sourceIdentifier 為 `psirt@nvidia.com`，published `2026-08-25T21:17:29Z`，vulnStatus 為 `Received`，CVSS 3.1 為 8.1／HIGH、向量 `AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H`，官方參考連結指向 NVIDIA 的 product-security 儲存庫第 5872 號。THN 的說法在其發稿當下應為正確（NVD 於同日稍晚才發布），本則據實記載兩者的時間關係，不寫成媒體錯誤。
- **廠商描述與研究描述的落差是本則的觀察，不是任何一方的說法**：NVIDIA 的 CVE 描述將影響限定為「資訊揭露與阻斷服務」、向量標為 `I:N`，而研究描述的核心後果是持久性的模型汙染（完整性）；向量的 `AV:A` 也與「瀏覽網頁即觸發」的描述不完全相符。本則將此標示為**兩份文件之間的不一致**，並未宣稱哪一方有誤，亦未自行改動 CVSS 評分。
- **Oasis 原始報告未能直接開啟**：論點 5、6、8 的技術細節取自 The Hacker News 對 Oasis 報告的引述（含逐字引號部分），本次未能取得 Oasis 報告原文逐字比對。THN 該篇有一項可信度加分：**它自行檢視了 NemoClaw 儲存庫的 commit 17f0ca3b 並引述了程式碼中的錯誤訊息**，屬記者自行驗證而非單純轉述。
- **版本編號存在需要留意的不一致**：研究者說「v0.0.35 修好 macOS 與 Linux」，而 THN 檢視儲存庫發現的拒絕啟動預設是「v0.0.106 於 8 月 10 日引入」。0.0.106 在數值上大於 0.0.35，兩者可能指涉不同的修補動作或不同的版本序列。本則將兩項分別標明出處，**不自行推斷孰先孰後**，讀者若要據此判斷自身版本是否安全，應以 NVIDIA 官方公告為準。
- **未證實的部分**：截至 8/25 無實際遭利用報告；Windows／WSL 路徑至今無修補（僅有警告）；完整鏈僅在 macOS + Firefox 上驗證過，其他瀏覽器與作業系統組合未經測試。
- **不要與同期其他 AI 代理事件混寫**：本期選題 01（Aikido 重現代理越權）與本則**不是同一類問題**——前者是代理在授權範圍內做了不該做的事，後者是外部攻擊者取得了代理背後模型的控制權。兩者都涉及 OpenClaw 生態，但成因與對策完全不同，並列時須明確分開。

### 原始來源網址
- 🏛 NVD／CVE-2026-65105 記錄 8/25  
  https://nvd.nist.gov/vuln/detail/CVE-2026-65105
- 🏛 NVIDIA 產品安全公告（product-security #5872）  
  https://github.com/NVIDIA/product-security/tree/main/2026/5872
- 📰 The Hacker News 8/25  
  https://thehackernews.com/2026/08/a-malicious-webpage-could-poison-your.html
- 📰 SiliconANGLE 8/25  
  https://siliconangle.com/2026/08/25/nvidia-nemoclaw-flaw-let-attackers-poison-the-model-behind-a-developers-ai-agent/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
「把模型跑在本機比較安全」——這一則正好戳在那個假設上。

Oasis Security 揭露 NVIDIA NemoClaw 的一項弱點：使用者只要瀏覽一個攻擊者控制的網頁，攻擊者就能在未經認證的情況下取得本機 Ollama 實例的控制權，並把隱藏指令植入模型本身。

被改掉的東西很關鍵。攻擊者寫入的是 Ollama 的 chat template——把結構化訊息陣列轉成原始文字、送進模型之前的那一層。汙染之後，每一次對話的 system message 後面都會被追加攻擊者的文字，而且代理自己送進來的 system prompt 也蓋不掉它。

Oasis 的原話：「客戶端偵測不到也阻止不了——template 是模型層級的屬性，對 API 消費者是不可見的。」

根因是一行環境變數。NemoClaw 在某些平台路徑上以 OLLAMA_HOST=0.0.0.0:11434 啟動 Ollama，把模型伺服器綁到所有網路介面。而 Ollama 的 Host header 驗證——2024 年為了修 DNS rebinding（CVE-2024-28224）才加上的那個——在綁定位址不是 loopback 時會被整個跳過。CORS 那層接著把請求當成同源放行，因為 Origin 和 Host 帶的都是攻擊者自己的網域。剩下的缺口由 DNS rebinding 補上。

換句話說：一個「讓容器連得到主機」的便利設定，把 2024 年修好的洞又打開了。

還有一件事值得單獨講。8/25 的報導寫「這項研究沒有 CVE 編號」——發稿當下是對的。但同一天稍晚，NVIDIA PSIRT 指派的 CVE-2026-65105 就進了 NVD，CVSS 8.1 HIGH。

耐人尋味的是 NVIDIA 自己的描述：影響寫成「資訊揭露與阻斷服務」，CVSS 向量標的是 I:N——完整性影響：無。可是研究描述的是持久性的模型汙染，那明明是完整性問題。

如果你正在用 CVSS 分數決定修補優先序，這則是很好的提醒：分數描述的是廠商對影響的定性，不一定是你會遭遇的後果。

現況：macOS 與 Linux 已修，Windows 與 WSL 路徑至今只有警告、沒有修補；截至 8/25 無實際遭利用的報告。

#AISecurity #LLMSecurity #AgenticAI #AppSec #DNSRebinding

#### LinkedIn 草稿（English）
"Running the model locally is safer" — this one goes straight at that assumption.

Oasis Security has disclosed a weakness in NVIDIA NemoClaw in which visiting an attacker-controlled webpage lets that attacker take unauthenticated control of the local Ollama instance and plant hidden instructions inside the model itself.

What gets modified matters. The attacker writes Ollama's chat template — the layer that renders the structured messages array into raw text before the model sees it. Once poisoned, attacker-controlled text is appended to every system message at inference time, and it survives the agent supplying its own system prompt.

In Oasis's words: "The client cannot detect or prevent this — the template is a model-level property invisible to API consumers."

The root cause is one environment variable. On some platform paths NemoClaw starts Ollama with OLLAMA_HOST=0.0.0.0:11434, binding the model server to every interface. Ollama's Host header validation — added in 2024 to fix a DNS rebinding issue, CVE-2024-28224 — is skipped entirely whenever the bind address is not loopback. The CORS layer then treats the request as same-origin and allows it, because Origin and Host both carry the attacker's own domain. DNS rebinding closes the remaining gap.

Put plainly: a convenience setting that lets containers reach the host reopened a hole that was fixed in 2024.

One more thing worth separating out. Coverage on 25 August said the research carried no CVE identifier — correct at press time. Later the same day, CVE-2026-65105, assigned by NVIDIA PSIRT, landed in the NVD at CVSS 8.1 HIGH.

The interesting part is NVIDIA's own description: impact is stated as information disclosure and denial of service, and the CVSS vector carries I:N — integrity impact: none. Yet what the research describes is persistent model poisoning, which is squarely an integrity problem.

If you prioritise patching by CVSS score, treat this as a reminder: the score reflects the vendor's characterisation of impact, not necessarily the consequence you would experience.

Current status: fixed on macOS and Linux; the Windows and WSL path still carries a warning rather than a fix; no exploitation reported as of 25 August.

#AISecurity #LLMSecurity #AgenticAI #AppSec #DNSRebinding

#### Twitter / X 推文串（中文版）
1/ Oasis Security 揭露 NVIDIA NemoClaw 的弱點：使用者瀏覽一個惡意網頁，攻擊者就能未經認證取得本機 Ollama 的控制權，並把隱藏指令植入模型本身。「跑在本機比較安全」的假設，這則直接戳破。

2/ 被改的是 Ollama 的 chat template——訊息陣列在送進模型前渲染成原始文字的那一層。汙染後，攻擊者的文字會被附加到每一則 system message 之後，而且代理自己的 system prompt 蓋不掉它。

3/ Oasis 原話：「客戶端偵測不到也阻止不了——template 是模型層級的屬性，對 API 消費者不可見。」

4/ 根因：NemoClaw 在某些路徑用 OLLAMA_HOST=0.0.0.0:11434 啟動 Ollama。而 Ollama 的 Host header 驗證（2024 年為修 CVE-2024-28224 才加的）在綁定非 loopback 時會被整個跳過。CORS 接著當同源放行，DNS rebinding 補上最後一哩。

5/ 也就是說：一個「讓容器連得到主機」的便利設定，把 2024 年修好的洞又打開了。

6/ 8/25 的報導寫「沒有 CVE」——發稿當下正確。但同日稍晚 NVIDIA PSIRT 指派的 CVE-2026-65105 就進了 NVD，CVSS 8.1 HIGH。

7/ 耐人尋味的是廠商描述：影響寫成「資訊揭露與阻斷服務」，向量標 I:N（完整性：無）。但研究描述的是持久性模型汙染——那是完整性。用 CVSS 排修補優先序的人請注意這道落差。

8/ 現況：macOS／Linux 已修；Windows 與 WSL 路徑至今只有警告沒有修補。截至 8/25 無實際遭利用報告。完整鏈僅在 macOS + Firefox 上驗證過。

#AISecurity #LLMSecurity #AgenticAI #AppSec

#### Twitter / X 推文串（English）
1/ Oasis Security disclosed a NVIDIA NemoClaw weakness: visiting a malicious webpage lets an attacker take unauthenticated control of the local Ollama instance and plant hidden instructions in the model itself. So much for "local is safer."

2/ What gets modified is Ollama's chat template — the layer rendering the messages array into raw text before the model sees it. Once poisoned, attacker text is appended to every system message, and it survives the agent's own system prompt.

3/ Oasis: "The client cannot detect or prevent this — the template is a model-level property invisible to API consumers."

4/ Root cause: on some paths NemoClaw starts Ollama with OLLAMA_HOST=0.0.0.0:11434. Ollama's Host header validation — added in 2024 to fix CVE-2024-28224 — is skipped whenever the bind is non-loopback. CORS then allows it as same-origin, and DNS rebinding closes the gap.

5/ In short: a convenience setting so containers can reach the host reopened a hole fixed in 2024.

6/ Coverage on 25 Aug said the research carried no CVE — true at press time. Later that day CVE-2026-65105, assigned by NVIDIA PSIRT, appeared in the NVD at CVSS 8.1 HIGH.

7/ The interesting bit is the vendor description: impact stated as information disclosure and denial of service, vector carrying I:N (integrity: none). But the research describes persistent model poisoning, which is an integrity impact. Worth noting if you triage by CVSS.

8/ Status: fixed on macOS and Linux; the Windows and WSL path still has a warning rather than a fix. No exploitation reported as of 25 Aug. The full chain was verified on macOS with Firefox only.

#AISecurity #LLMSecurity #AgenticAI #AppSec

#### 部落格要點（中文版）
標題：模型層的後門——NemoClaw 的一行環境變數，如何讓一次瀏覽變成永久的指令植入

• 事件：Oasis Security 揭露 NVIDIA NemoClaw 的弱點，攻擊者控制的網頁可未經認證取得本機 Ollama 實例的控制權，並在模型本身植入隱藏指令；研究於發表前已通報 NVIDIA PSIRT
• CVE 狀態：已指派 CVE-2026-65105，由 NVIDIA PSIRT 作為來源，NVD 於 2026-08-25T21:17Z 發布、狀態 Received，CVSS 3.1 為 8.1（HIGH），向量 AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H
• 廠商描述與研究描述的落差：NVIDIA 將影響定為「資訊揭露與阻斷服務」且向量標 I:N（完整性無），但研究的核心後果是持久性模型汙染，屬完整性影響；向量的 AV:A（相鄰網路）也與「瀏覽網頁即觸發」不完全相符——引用分數時應一併說明
• NemoClaw 的角色：NVIDIA 的開源參考堆疊，用於在其 OpenShell 沙箱內執行 OpenClaw 等代理，Ollama 為其支援的本地推論後端之一；受影響的正是「代理與模型都放在自己機器上」的使用者
• 根因與平台差異：非 WSL 主機把 Ollama 留在 127.0.0.1:11434、前面擋 token 驗證反向代理（0.0.0.0:11435）；WSL 上的 Docker Desktop 跳過該代理；Windows 主機路徑則設 OLLAMA_HOST=0.0.0.0:11434 且 11434 埠不需認證
• 防護為何同時失效：11434 埠無認證，僅靠兩層 middleware；綁定非 loopback 時 Host header 檢查被整個跳過，CORS 因 Origin 與 Host 同為攻擊者網域而視為同源放行，DNS rebinding 補上最後缺口
• 歷史回歸：Ollama 於 2024-03-14 在 v0.1.29 修補 DNS rebinding，NCC Group 次月以 CVE-2024-28224 公布；Ollama 依此加入 Host header 驗證，但綁定非 loopback 時會跳過該驗證——而 0.0.0.0 正是 NemoClaw 的設定
• 汙染的持久化機制：payload 透過 /api/create 寫入修改過的 Go template，於推論時把攻擊者文字附加到每一則 system message 之後；植入的指令跨對話存續，且在代理自行提供 system prompt 時仍存活；template 為模型層屬性，對 API 消費者不可見
• 修補狀態：研究者稱 v0.0.35 修正了 macOS 與 Linux；Windows 與 WSL 路徑無修補，v0.0.34 加的是警告；另有媒體檢視儲存庫發現 v0.0.106（8/10）引入「拒絕對非 loopback 後端啟動」的預設，但可用 NEMOCLAW_OLLAMA_PROXY_SKIP_BIND_PROBE=1 關閉，且在無法探測綁定的主機上不會 fail closed
• NVIDIA 回應：感謝研究人員的發現與通報，並稱其工作展現開源開發如何促成透明協作以測試軟體極限、快速識別並修補漏洞
• 利用現況：截至 2026-08-25 無實際遭利用報告；完整鏈僅在 macOS 搭配 Firefox 對有漏洞版本驗證過；此類攻擊的標準修法為驗證 Host 與 Origin 標頭
• 對導入本地 AI 的團隊之意涵：把「推論後端的綁定位址與認證」列為部署檢核項；不要把沙箱等同於安全邊界——沙箱保護的是端點，取得代理則等於取得它的存取權與工具；並將 chat template 的完整性納入變更管理

#AISecurity #LLMSecurity #AgenticAI #AppSec

#### 部落格要點（English）
Title: A backdoor at the model layer — how one environment variable in NemoClaw turns a single page visit into a permanent instruction implant

• The event: Oasis Security disclosed a weakness in NVIDIA NemoClaw where an attacker-controlled webpage can take unauthenticated control of the local Ollama instance and plant hidden instructions inside the model itself; the research was reported to NVIDIA PSIRT before publication
• CVE status: CVE-2026-65105, sourced to NVIDIA PSIRT, published in the NVD at 2026-08-25T21:17Z with status Received, CVSS 3.1 base score 8.1 (HIGH), vector AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H
• The gap between vendor description and research description: NVIDIA states impact as information disclosure and denial of service and the vector carries I:N (no integrity impact), yet the research's central consequence is persistent model poisoning, which is an integrity impact; the vector's AV:A (adjacent) also sits awkwardly with a chain triggered by visiting a webpage — say so when citing the score
• What NemoClaw is: NVIDIA's open source reference stack for running agents such as OpenClaw inside its OpenShell sandboxes, with Ollama as one supported local inference backend — so the exposed population is precisely those running both agent and model on their own machine
• Root cause and platform differences: non-WSL hosts keep Ollama on 127.0.0.1:11434 behind a token-gated reverse proxy on 0.0.0.0:11435; Docker Desktop on WSL skips that proxy; the Windows-host path sets OLLAMA_HOST=0.0.0.0:11434 with no authentication required on port 11434
• Why both protections failed at once: the API on 11434 has no authentication and relies on two middleware layers; when the bind address is not loopback the Host header check is skipped entirely, CORS then treats the request as same-origin because Origin and Host both carry the attacker's domain, and DNS rebinding closes the remaining gap
• A regression of a 2024 fix: Ollama patched DNS rebinding in v0.1.29 on 14 March 2024 and NCC Group published CVE-2024-28224 the following month; Ollama added Host header validation in response, but skips it whenever bound to a non-loopback address — and 0.0.0.0 is exactly how NemoClaw configures it
• How the poisoning persists: the payload writes a modified Go template through /api/create, appending attacker-controlled text to every system message at inference time; planted instructions persist across later conversations and survive the agent supplying its own system prompt, and the template is a model-level property invisible to API consumers
• Fix status: the researchers say v0.0.35 fixed macOS and Linux; the Windows and WSL path has no fix, with v0.0.34 adding a warning instead; separately, a repository review found a default introduced in v0.0.106 on 10 August that refuses to start the local proxy against a non-loopback backend, though it can be disabled with NEMOCLAW_OLLAMA_PROXY_SKIP_BIND_PROBE=1 and does not fail closed where the bind probe cannot run
• NVIDIA's response: it thanked the researchers for the discovery and report, saying their work shows how open-source development fosters transparent collaboration to test software limits and rapidly identify and patch vulnerabilities
• Exploitation status: none reported as of 25 August 2026; the full chain was verified on macOS with Firefox against a vulnerable version; the standard fix for this class is validating Host and Origin headers
• What it means for teams deploying local AI: put the inference backend's bind address and authentication on the deployment checklist; do not equate the sandbox with the security boundary, since sandboxing protects the endpoint while taking over the agent takes over its access and tools; and bring chat template integrity into change management

#AISecurity #LLMSecurity #AgenticAI #AppSec

#### 新聞簡報 / 簡訊（中文版）
Oasis Security 揭露 NVIDIA NemoClaw 的一項弱點，可讓攻擊者控制的網頁在未經認證的情況下取得本機 Ollama 實例的控制權，並在模型本身植入隱藏指令。根因是 NemoClaw 在部分平台路徑以 OLLAMA_HOST=0.0.0.0:11434 啟動 Ollama，把模型伺服器綁到所有網路介面；Ollama 於 2024 年為修補 DNS rebinding（CVE-2024-28224）而加入的 Host header 驗證，在綁定位址非 loopback 時會被整個跳過，CORS 層則因 Origin 與 Host 同為攻擊者網域而視為同源放行，最後由 DNS rebinding 補上缺口。攻擊者透過 /api/create 寫入修改過的 Go template，使攻擊者文字在推論時被附加到每一則 system message 之後，且跨對話存續、代理自行提供的 system prompt 亦無法覆蓋，因為 template 屬模型層級屬性、對 API 消費者不可見。本案已指派 CVE-2026-65105，由 NVIDIA PSIRT 作為來源，NVD 於 2026-08-25 發布，CVSS 3.1 為 8.1（HIGH）；值得注意的是 NVIDIA 的描述將影響定為「資訊揭露與阻斷服務」、向量標為 I:N（完整性無），與研究描述的持久性模型汙染存在落差，引用分數時應一併說明。修補方面，研究者稱 macOS 與 Linux 已於 v0.0.35 修正，Windows 與 WSL 路徑至今僅有警告而無修補；截至 8 月 25 日無實際遭利用報告。建議導入本地 AI 的團隊立即檢查推論後端的綁定位址與認證設定，並將 chat template 完整性納入變更管理。主要來源：NVD／CVE-2026-65105（8/25）、NVIDIA 產品安全公告、The Hacker News（8/25）、SiliconANGLE（8/25）。

#AISecurity #LLMSecurity #AgenticAI #AppSec

#### 新聞簡報 / 簡訊（English）
Oasis Security disclosed a weakness in NVIDIA NemoClaw that lets an attacker-controlled webpage take unauthenticated control of the local Ollama instance serving an AI agent and plant hidden instructions inside the model itself. The root cause is that NemoClaw starts Ollama with OLLAMA_HOST=0.0.0.0:11434 on some platform paths, binding the model server to every network interface; the Host header validation Ollama added in 2024 to fix a DNS rebinding issue (CVE-2024-28224) is skipped entirely when the bind address is not loopback, the CORS layer then treats the request as same-origin because Origin and Host both carry the attacker's domain, and DNS rebinding closes the remaining gap. The payload writes a modified Go template through /api/create so that attacker-controlled text is appended to every system message at inference time, persisting across later conversations and surviving the agent's own system prompt, because the template is a model-level property invisible to API consumers. The issue is tracked as CVE-2026-65105, sourced to NVIDIA PSIRT and published in the NVD on 25 August 2026 with a CVSS 3.1 base score of 8.1 (HIGH); notably, NVIDIA's description limits the impact to information disclosure and denial of service and the vector carries I:N, which sits at odds with the persistent model poisoning the research describes, so cite the score with that caveat. On fixes, the researchers say macOS and Linux were addressed in v0.0.35 while the Windows and WSL path still carries a warning rather than a fix; no exploitation had been reported as of 25 August. Teams running local AI should check the bind address and authentication of their inference backend now and bring chat template integrity into change management. Sources: NVD/CVE-2026-65105 (8/25), NVIDIA product security advisory, The Hacker News (8/25), SiliconANGLE (8/25).

#AISecurity #LLMSecurity #AgenticAI #AppSec
