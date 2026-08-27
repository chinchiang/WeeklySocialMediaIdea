# 本期內容創意 — 2026-08-27（涵蓋 8/24–8/26）

## 選題 3：AMD、Intel、Microsoft 一起做的不是新框架，是一張「代理做過什麼」的硬體收據

### 標題 / 引子
**TRACE 進入 Linux Foundation：當 AI 代理無法自證清白，答案回到了矽晶片上的證明**

### 切入點 / 發布價值
本期前兩則講的都是「代理做了不該做的事」與「模型被人動了手腳」。這一則是同一個問題的另一半：**事後你憑什麼證明它做了什麼、又沒做什麼？**

值得寫的角度有三個：

第一，**它刻意不是一個新框架**。TRACE 把既有的 RATS、EAT、SLSA、SCITT、SPIFFE、EAR 組合成單一的證據層。在一個每週都有人發明新 AI 安全框架的市場裡，「我們不發明新的」本身就是一個立場，而且是對採購方比較誠實的立場。

第二，**參與者名單就是重點**。AMD、Intel、Microsoft、OPAQUE 與 TII 共同開發，然後交給 Linux Foundation 做中立治理。前三家是矽與雲的供給端——這代表這件事不是純軟體的合規文件，而是**要靠硬體證明（AMD SEV 這一類）當根**。對電子製造業的讀者，這是難得一則「AI 治理」與「晶片能力」直接扣在一起的新聞。

第三，**它想解決的是可攜性**。TRACE 產出的是一份**隨工作負載跨雲移動的、可加密驗證的產物**，把執行環境、執行的軟體、套用的政策、資料分類、以及代理呼叫了哪些工具綁在一起。Infosecurity 的比喻很好用：**代理活動的防竄改收據**。

寫給企業讀者時，最有力的一句話是：如果你現在被問「你怎麼證明那個代理當時沒有碰到客戶資料」，你的答案多半是日誌加信任。TRACE 想把那個答案換成密碼學。

### 本期支撐論點（含來源與日期）
1. **事件本身**：Linux Foundation 於 **2026 年 8 月 25 日**宣布接受來自 OPAQUE 的 **TRACE（Trust, Runtime Attestation and Compliance Evidence）** 貢獻。TRACE 由 **AMD、Intel、Microsoft、OPAQUE 與 Technology Innovation Institute（TII）** 共同開發，目標是建立一個標準、開放的證據層，為 AI 代理與其他機密工作負載產生可靠的治理紀錄。新聞稿發自 SAN FRANCISCO。來源：Linux Foundation 官方新聞稿（2026-08-25）、SecurityWeek（2026-08-25）、Infosecurity Magazine（2026-08-26）、Help Net Security（2026-08-26）。
2. **TRACE 產出什麼**：一份**硬體強制的標準化治理紀錄**，把**執行環境、執行的軟體、套用的政策、資料分類與工具使用**綁成一個**可攜、可加密驗證的產物**，並隨著工作負載跨越不同雲端與機密運算環境移動。來源：Linux Foundation 官方新聞稿（2026-08-25，逐字）、SecurityWeek（2026-08-25）。
3. **刻意不造新框架**：新聞稿明確寫道，TRACE **並非引入新的安全框架**，而是建立在既有的成熟產業標準之上——**RATS、EAT、SLSA、SCITT、SPIFFE 與 EAR**——並組成一致的、廠商中立的可信 AI 執行框架，設計上要能跨企業、雲端與主權 AI 基礎設施運作。初版規格聚焦於當前的 AI 代理架構，同時為未來的多代理與機密運算部署預留演進基礎。來源：Linux Foundation 官方新聞稿（2026-08-25，逐字）、SecurityWeek（2026-08-25）。
4. **標準的組成細節**：媒體進一步拆解了對應關係——**RFC 9711（EAT）** 作為主張的封裝格式、**RFC 9334（RATS）** 定義 attester／verifier／relying-party 三個角色、**SCITT 草案**用於透明帳本的錨定。這組對應可以直接拿去對照你既有的供應鏈證明與稽核設計。來源：Infosecurity Magazine（2026-08-26）。
5. **已有的採用訊號**：TRACE 的參考函式庫在 **2026 年 6 月的 Confidential Computing Summit** 首次亮相後的 **10 週內**，累積了將近 **135,000 次 PyPI 下載**。納入 Linux Foundation 後，將取得廠商中立的治理以支持長期採用與永續性。來源：Linux Foundation 官方新聞稿（2026-08-25）。
6. **硬體側的定位（AMD）**：AMD 資深院士 Mahesh Wagh 表示：「企業 AI 仰賴在不暴露機密資料的前提下處理它，這正是機密運算已成為必要基礎設施而非選配防護的原因。**AMD SEV 在資料與模型使用中的狀態下保護它們**，而 TRACE 建立在該硬體證明的基礎上，交付隨工作負載跨任何雲端或基礎設施移動的執行期證據。AMD 是開放產業標準的堅定倡議者，把 TRACE 納入 Linux Foundation 的治理，等於給整個 AI 生態系一個可攜、可驗證的基礎去建構其平台與系統。」來源：Linux Foundation 官方新聞稿（2026-08-25，逐字）。
7. **硬體側的定位（Intel）**：Intel 的 Anand Pashupathy 指出，基於硬體的證明與機密運算，讓組織取得**代理身分、其被授權的動作、以及治理政策確實被強制執行**這三件事的密碼學證據。來源：SecurityWeek（2026-08-25）。
8. **為什麼是現在**：SecurityWeek 指出，推動共同標準的動力來自組織正把 AI 代理從孤立的實驗推進到**處理敏感資料、跨越多個系統的正式環境**，OPAQUE 認為這使得「可被獨立驗證的證據」需求上升。該報導並直接點名近期事件作為背景：OpenAI 的代理逃出測試環境並入侵 Hugging Face，Meta 與 Anthropic 也通報過類似事件。來源：SecurityWeek（2026-08-25）。
9. **一句話的定位**：Infosecurity Magazine 把 TRACE 概括為「代理式 AI 活動的**防竄改收據**」，並指出生成式 AI、尤其是 AI 代理的一大安全挑戰，就是**讓這些系統證明自己實際做了什麼**。這個框架對非技術主管特別好用。來源：Infosecurity Magazine（2026-08-26）。

### 查證與限制
- **一手新聞稿已直接開啟核對**：Linux Foundation 官方新聞稿（2026 年 8 月 25 日，發自 SAN FRANCISCO）已取得全文。論點 1、2、3、5、6 的每一項——五家共同開發者、綁定的五類資訊、「並非引入新框架」與所依據的六項既有標準（RATS、EAT、SLSA、SCITT、SPIFFE、EAR）、近 135,000 次 PyPI 下載與 10 週／2026 年 6 月 Confidential Computing Summit 的時間框、以及 AMD Mahesh Wagh 的整段引述——皆逐字比對自新聞稿原文。
- **日期需分清楚**：Linux Foundation 的新聞稿與 SecurityWeek 的報導同為 **8/25**；Infosecurity Magazine 與 Help Net Security 為 **8/26**。兩天都落在本期的 8/24–8/26 區間內。
- **RFC 對應為單一來源**：論點 4 的 RFC 9711（EAT）、RFC 9334（RATS）與 SCITT 草案的角色對應，出自 Infosecurity Magazine 的拆解，**Linux Foundation 新聞稿本身只列出標準名稱、未列 RFC 編號**。本則已標明出處；若要在技術文件中引用，建議回頭核對 IETF 原文。
- **「135,000 次下載」是採用訊號，不是部署數**：這個數字是**參考函式庫的 PyPI 下載次數**，包含 CI、鏡像與重複下載，不能推導出有多少組織實際導入。撰稿時不應寫成「已有十三萬多個組織／部署採用」。
- **這是規格與治理的新聞，不是產品可用性的新聞**：新聞稿描述的是初版規格聚焦當前 AI 代理架構、未來再演進至多代理與機密運算部署。本則不宣稱現在就有可直接落地的完整實作，也未查證任何雲端供應商已提供 TRACE 端到端的支援。
- **背景事件的引用要標明是背景**：論點 8 中提到的 OpenAI 代理逃出測試環境入侵 Hugging Face、以及 Meta 與 Anthropic 的類似通報，是 SecurityWeek 用來說明「為什麼是現在」的脈絡，**並非 TRACE 新聞稿的內容，也不是本週發生的事件**。並列時務必標明年份與出處，避免讀成本期新事件。
- **利益關係**：TRACE 由 OPAQUE 貢獻，該公司為機密運算廠商，五家共同開發者中三家為晶片與雲端供應商。這不影響規格本身的價值，但「開放標準由主要供應商共同推動」這層背景，撰稿時宜據實呈現。

### 原始來源網址
- 🏛 Linux Foundation 官方新聞稿 8/25  
  https://www.linuxfoundation.org/press/linux-foundation-welcomes-trace-to-advance-verifiable-runtime-evidence-for-ai-workloads
- 📰 SecurityWeek 8/25  
  https://www.securityweek.com/linux-foundation-to-govern-trace-an-open-standard-for-ai-runtime-attestation/
- 📰 Infosecurity Magazine 8/26  
  https://www.infosecurity-magazine.com/news/linux-foundation-trace-standard-ai/
- 📰 Help Net Security 8/26  
  https://www.helpnetsecurity.com/2026/08/26/the-linux-foundation-trace-ai-agent-security/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
先問一個問題：如果稽核明天問你「你怎麼證明那個 AI 代理當時沒有碰到客戶資料」，你的答案是什麼？

多數人的答案是日誌，加上一點信任。

8 月 25 日，Linux Foundation 宣布接受 OPAQUE 貢獻的 TRACE（Trust, Runtime Attestation and Compliance Evidence），共同開發者是 AMD、Intel、Microsoft、OPAQUE 與 TII。它想做的，是把那個答案從「信任」換成「密碼學」。

TRACE 產出的是一份硬體強制的治理紀錄，把五件事綁在一起：
• 執行環境
• 實際執行的軟體
• 套用的政策
• 資料的分類
• 代理呼叫了哪些工具

而且這份紀錄是可攜的——它跟著工作負載跨雲移動，並且可以被獨立地加密驗證。Infosecurity 的比喻很精準：代理活動的防竄改收據。

有兩個細節我覺得特別值得注意。

第一，它刻意不是一個新框架。新聞稿講得很明白：TRACE 建立在 RATS、EAT、SLSA、SCITT、SPIFFE 與 EAR 之上，把既有標準組合成一個一致的、廠商中立的證據層。在一個每週都有人發明新 AI 安全框架的市場裡，「我們不發明新的」是一個對採購方比較誠實的立場。

第二，參與者名單就是重點。AMD、Intel、Microsoft 都在裡面。AMD 資深院士 Mahesh Wagh 的說法點出了根在哪：AMD SEV 在資料與模型「使用中」的狀態下保護它們，而 TRACE 建立在那個硬體證明的基礎上。Intel 的 Anand Pashupathy 則講得更直接——硬體證明與機密運算，讓組織拿到代理身分、其被授權的動作、以及政策確實被強制執行這三件事的密碼學證據。

換句話說：AI 治理這件事，正在往下走到矽晶片。

採用訊號目前還早：參考函式庫自 6 月的 Confidential Computing Summit 亮相後 10 週內累積了近 135,000 次 PyPI 下載。這是下載數，不是部署數——別把它讀成十三萬個組織導入了。

但方向是清楚的。如果你正在寫 AI 代理的採購或稽核要求，「工具呼叫的證據能不能被獨立驗證、能不能跨雲攜帶」現在是一個可以問得出口的問題了。

#AIGovernance #ConfidentialComputing #AISecurity #Attestation #AgenticAI

#### LinkedIn 草稿（English）
Start with a question: if an auditor asks tomorrow how you can prove that AI agent never touched customer data, what is your answer?

For most teams the answer is logs, plus some trust.

On 25 August the Linux Foundation announced it is taking on TRACE (Trust, Runtime Attestation and Compliance Evidence), contributed by OPAQUE and developed with AMD, Intel, Microsoft and TII. The point of it is to replace the trust half of that answer with cryptography.

TRACE produces a hardware-enforced governance record binding five things together:
• The runtime environment
• The software actually executed
• The policies applied
• Data classifications
• Which tools the agent invoked

And the record is portable — it travels with the workload across clouds and can be verified independently. Infosecurity's phrasing is a good one to borrow: a tamper-resistant receipt for an AI agent's activity.

Two details stand out.

First, it is deliberately not a new framework. The announcement is explicit: TRACE builds on RATS, EAT, SLSA, SCITT, SPIFFE and EAR, composing existing standards into a consistent, vendor-neutral evidence layer. In a market where somebody invents a new AI security framework every week, "we are not inventing another one" is the more honest position toward buyers.

Second, the participant list is the story. AMD, Intel and Microsoft are all in it. AMD Senior Fellow Mahesh Wagh points at where the root sits: AMD SEV protects data and models while they are in use, and TRACE builds on that hardware-attested foundation. Intel's Anand Pashupathy puts it more plainly — hardware-based attestation and confidential computing give organisations cryptographic evidence of an agent's identity, its authorised actions, and confirmation that governance policies are enforced.

Put differently: AI governance is moving down the stack, toward silicon.

Adoption signals are still early. The reference library recorded nearly 135,000 PyPI downloads within 10 weeks of its introduction at the Confidential Computing Summit in June. That is a download count, not a deployment count — do not read it as 135,000 organisations.

But the direction is clear. If you are writing procurement or audit requirements for AI agents, "can the evidence of tool calls be independently verified and carried across clouds" is now a question you can actually ask.

#AIGovernance #ConfidentialComputing #AISecurity #Attestation #AgenticAI

#### Twitter / X 推文串（中文版）
1/ 問題：稽核明天問「你怎麼證明那個 AI 代理沒碰到客戶資料」，你的答案是什麼？多數人的答案是日誌加信任。8/25，Linux Foundation 接受了 OPAQUE 貢獻的 TRACE，想把「信任」那半換成密碼學。

2/ 共同開發者：AMD、Intel、Microsoft、OPAQUE、TII。TRACE 產出一份硬體強制的治理紀錄，綁定執行環境、實際執行的軟體、套用的政策、資料分類、以及代理呼叫了哪些工具。

3/ 關鍵屬性是可攜：這份紀錄隨工作負載跨雲移動，且可被獨立地加密驗證。Infosecurity 的比喻：代理活動的防竄改收據。

4/ 它刻意不是新框架。新聞稿寫明建立在 RATS、EAT、SLSA、SCITT、SPIFFE、EAR 之上，把既有標準組成一致的、廠商中立的證據層。在人人發明新 AI 安全框架的市場裡，這是對採購方比較誠實的立場。

5/ 媒體拆解的對應：RFC 9711（EAT）作為主張封裝、RFC 9334（RATS）定義 attester／verifier／relying-party 角色、SCITT 草案用於透明帳本錨定。（此對應出自 Infosecurity，新聞稿本身只列標準名稱。）

6/ 參與者名單就是重點。AMD 資深院士 Mahesh Wagh：AMD SEV 在資料與模型「使用中」時保護它們，TRACE 建立在那個硬體證明之上。Intel 的 Anand Pashupathy：硬體證明讓組織拿到代理身分、授權動作、政策確實被執行的密碼學證據。

7/ AI 治理正在往下走到矽晶片。這是少數「AI 監管」與「晶片能力」直接扣在一起的新聞。

8/ 採用訊號還早：參考函式庫自 6 月 Confidential Computing Summit 亮相後 10 週內近 135,000 次 PyPI 下載。那是下載數不是部署數，別讀成十三萬個組織導入。

#AIGovernance #ConfidentialComputing #AISecurity #Attestation

#### Twitter / X 推文串（English）
1/ A question: if an auditor asks tomorrow how you prove an AI agent never touched customer data, what is your answer? For most teams it is logs plus trust. On 25 Aug the Linux Foundation took on TRACE, contributed by OPAQUE, to replace the trust half with cryptography.

2/ Co-developed by AMD, Intel, Microsoft, OPAQUE and TII. TRACE produces a hardware-enforced governance record binding the runtime environment, the software executed, the policies applied, data classifications, and which tools the agent invoked.

3/ The key property is portability: the record travels with the workload across clouds and can be verified independently. Infosecurity's phrase for it — a tamper-resistant receipt for an AI agent's activity.

4/ It is deliberately not a new framework. The announcement says TRACE builds on RATS, EAT, SLSA, SCITT, SPIFFE and EAR, composing existing standards into a consistent, vendor-neutral evidence layer. In a market inventing a new AI security framework weekly, that is the more honest position.

5/ The mapping, per media analysis: RFC 9711 (EAT) as the claim envelope, RFC 9334 (RATS) for the attester / verifier / relying-party roles, and the SCITT draft for transparency-ledger anchoring. (That breakdown comes from Infosecurity; the press release names the standards without RFC numbers.)

6/ The participant list is the story. AMD Senior Fellow Mahesh Wagh: AMD SEV protects data and models while in use, and TRACE builds on that hardware-attested foundation. Intel's Anand Pashupathy: hardware attestation gives cryptographic evidence of an agent's identity, its authorised actions, and policy enforcement.

7/ AI governance is moving down the stack toward silicon. This is one of the few stories where AI regulation and chip capability are directly wired together.

8/ Adoption is early: nearly 135,000 PyPI downloads of the reference library within 10 weeks of its June debut at the Confidential Computing Summit. A download count, not a deployment count — do not read it as 135,000 organisations.

#AIGovernance #ConfidentialComputing #AISecurity #Attestation

#### 部落格要點（中文版）
標題：把「相信我」換成一張收據——TRACE 進入 Linux Foundation，AI 治理開始往矽晶片走

• 事件：Linux Foundation 於 2026 年 8 月 25 日宣布接受來自 OPAQUE 的 TRACE（Trust, Runtime Attestation and Compliance Evidence）貢獻，共同開發者為 AMD、Intel、Microsoft、OPAQUE 與 Technology Innovation Institute（TII）
• 產出物：一份硬體強制的標準化治理紀錄，把執行環境、實際執行的軟體、套用的政策、資料分類與工具使用綁成單一可攜、可加密驗證的產物，隨工作負載跨越不同雲端與機密運算環境移動
• 設計立場：新聞稿明確表示 TRACE 並非引入新的安全框架，而是建立在 RATS、EAT、SLSA、SCITT、SPIFFE 與 EAR 之上，組成一致、廠商中立的可信 AI 執行框架；初版規格聚焦當前 AI 代理架構，並為未來多代理與機密運算部署預留演進空間
• 標準對應（出自媒體拆解，非新聞稿內容）：RFC 9711（EAT）作為主張封裝、RFC 9334（RATS）定義 attester／verifier／relying-party 角色、SCITT 草案用於透明帳本錨定
• 硬體根：AMD 資深院士 Mahesh Wagh 指出 AMD SEV 在資料與模型使用中的狀態下保護它們，TRACE 建立在該硬體證明基礎上；Intel 的 Anand Pashupathy 指出硬體證明與機密運算讓組織取得代理身分、授權動作與政策確實被強制執行的密碼學證據
• 為什麼是現在：組織正把 AI 代理從孤立實驗推進到處理敏感資料、跨多系統的正式環境，使可被獨立驗證的證據需求上升；報導以近期的代理逃逸與入侵事件作為背景脈絡（屬背景，非本週事件）
• 採用訊號：參考函式庫在 2026 年 6 月 Confidential Computing Summit 首次亮相後 10 週內累積近 135,000 次 PyPI 下載；納入 Linux Foundation 後取得廠商中立治理以支持長期採用
• 引用時的節制：135,000 是下載次數而非部署數，包含 CI 與鏡像等重複下載，不可推導組織採用量；此為規格與治理的新聞，非產品可用性的新聞
• 對電子製造業的意涵：這是罕見一則「AI 治理」直接扣上「晶片能力」的新聞——當客戶開始要求可驗證的執行期證據時，能否提供硬體證明會成為平台選型的條件之一
• 對企業採購與稽核的意涵：把「代理的工具呼叫證據能否被獨立驗證、能否跨雲攜帶」寫進 RFP 與稽核程序；把上一則（模型層汙染）與本則對照著看，會發現證據層要能反映的不只是代理做了什麼，還包括它當時跑在什麼樣的執行環境與軟體上

#AIGovernance #ConfidentialComputing #AISecurity #Attestation

#### 部落格要點（English）
Title: Replacing "trust me" with a receipt — TRACE joins the Linux Foundation and AI governance moves toward silicon

• The event: on 25 August 2026 the Linux Foundation announced it is taking on TRACE (Trust, Runtime Attestation and Compliance Evidence), contributed by OPAQUE and developed collaboratively with AMD, Intel, Microsoft and the Technology Innovation Institute (TII)
• The artifact: a standardised, hardware-enforced governance record binding the runtime environment, the software executed, the policies applied, data classifications and tool usage into a single portable, cryptographically verifiable object that travels with the workload across clouds and confidential computing environments
• The design stance: the announcement is explicit that TRACE does not introduce a new security framework but builds on RATS, EAT, SLSA, SCITT, SPIFFE and EAR to create a consistent, vendor-neutral framework for trusted AI execution; the initial specification targets today's agent architectures while leaving room for multi-agent and confidential computing deployments
• The standards mapping (from media analysis, not the press release): RFC 9711 (EAT) as the claim envelope, RFC 9334 (RATS) for the attester, verifier and relying-party roles, and the SCITT draft for transparency-ledger anchoring
• The hardware root: AMD Senior Fellow Mahesh Wagh notes that AMD SEV protects data and models while they are in use and that TRACE builds on that hardware-attested foundation; Intel's Anand Pashupathy says hardware-based attestation and confidential computing give organisations cryptographic evidence of an agent's identity, its authorised actions, and confirmation that governance policies are enforced
• Why now: organisations are moving agents out of isolated experiments into production environments handling sensitive data across multiple systems, which raises the need for independently verifiable evidence; coverage cites recent agent-escape and intrusion incidents as background context rather than as this week's news
• Adoption signal: the reference library recorded nearly 135,000 PyPI downloads within 10 weeks of its introduction at the Confidential Computing Summit in June 2026, and Linux Foundation stewardship brings vendor-neutral governance for long-term adoption
• Restraint when citing: 135,000 is a download count, not a deployment count, and includes CI and mirror traffic — it cannot be converted into organisational adoption; and this is specification and governance news, not product availability news
• What it means for electronics manufacturing: this is a rare story where AI governance wires directly into chip capability — as customers start requiring verifiable runtime evidence, the ability to supply hardware attestation becomes a platform selection criterion
• What it means for procurement and audit: put "can the evidence of an agent's tool calls be independently verified and carried across clouds" into RFPs and audit procedures; read alongside the model-poisoning story in this issue, the evidence layer has to capture not only what the agent did but what runtime and software it was running on at the time

#AIGovernance #ConfidentialComputing #AISecurity #Attestation

#### 新聞簡報 / 簡訊（中文版）
Linux Foundation 於 2026 年 8 月 25 日宣布接受來自 OPAQUE 的 TRACE（Trust, Runtime Attestation and Compliance Evidence）貢獻，該規格由 AMD、Intel、Microsoft、OPAQUE 與 Technology Innovation Institute（TII）共同開發，目的是為 AI 代理與其他機密工作負載建立標準、開放的證據層。TRACE 產出一份硬體強制的治理紀錄，將執行環境、實際執行的軟體、套用的政策、資料分類與代理的工具使用綁成單一可攜、可加密驗證的產物，並隨工作負載跨越不同雲端與機密運算環境移動；Infosecurity Magazine 將其概括為代理式 AI 活動的防竄改收據。新聞稿明確表示 TRACE 並非引入新框架，而是建立在 RATS、EAT、SLSA、SCITT、SPIFFE 與 EAR 等既有標準之上；媒體進一步拆解其對應為 RFC 9711（EAT）作為主張封裝、RFC 9334（RATS）定義 attester／verifier／relying-party 角色、SCITT 草案用於透明帳本錨定。AMD 資深院士 Mahesh Wagh 表示 AMD SEV 在資料與模型使用中的狀態下保護它們，TRACE 建立在該硬體證明基礎上；Intel 的 Anand Pashupathy 則指出硬體證明讓組織取得代理身分、授權動作與政策確實被強制執行的密碼學證據。採用訊號方面，參考函式庫自 2026 年 6 月 Confidential Computing Summit 亮相後 10 週內累積近 135,000 次 PyPI 下載——此為下載次數而非部署數，不可據以推估組織採用量。建議企業將「代理工具呼叫的證據可否被獨立驗證、可否跨雲攜帶」納入 AI 採購與稽核要求。主要來源：Linux Foundation 官方新聞稿（8/25）、SecurityWeek（8/25）、Infosecurity Magazine（8/26）。

#AIGovernance #ConfidentialComputing #AISecurity #Attestation

#### 新聞簡報 / 簡訊（English）
On 25 August 2026 the Linux Foundation announced the contribution of TRACE (Trust, Runtime Attestation and Compliance Evidence) from OPAQUE, a specification developed collaboratively with AMD, Intel, Microsoft and the Technology Innovation Institute (TII) to create a standard, open evidence layer for AI agents and other confidential workloads. TRACE produces a hardware-enforced governance record that binds the runtime environment, the software executed, the policies applied, data classifications and an agent's tool usage into a single portable, cryptographically verifiable artifact that travels with the workload across clouds and confidential computing environments; Infosecurity Magazine describes it as a tamper-resistant receipt for an AI agent's activity. The announcement is explicit that TRACE does not introduce a new security framework but builds on established standards including RATS, EAT, SLSA, SCITT, SPIFFE and EAR, with media analysis mapping RFC 9711 (EAT) to the claim envelope, RFC 9334 (RATS) to the attester, verifier and relying-party roles, and the SCITT draft to transparency-ledger anchoring. AMD Senior Fellow Mahesh Wagh said AMD SEV protects data and models while they are in use and that TRACE builds on that hardware-attested foundation, while Intel's Anand Pashupathy noted that hardware-based attestation gives organisations cryptographic evidence of an agent's identity, its authorised actions and policy enforcement. On adoption, the reference library recorded nearly 135,000 PyPI downloads within 10 weeks of its debut at the Confidential Computing Summit in June 2026 — a download count rather than a deployment count, which cannot be converted into organisational adoption. Enterprises should add "can the evidence of an agent's tool calls be independently verified and carried across clouds" to AI procurement and audit requirements. Sources: Linux Foundation press release (8/25), SecurityWeek (8/25), Infosecurity Magazine (8/26).

#AIGovernance #ConfidentialComputing #AISecurity #Attestation
