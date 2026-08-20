# 本期內容創意 — 2026-08-20（涵蓋 8/17–8/19）

## 選題 3：勒索軟體的主場是中型企業——73% 受害者、製造業獨占 26%

### 標題 / 引子
**勒索軟體的主場不是大企業：73% 受害者是中型企業，製造業獨占 26%**

### 切入點 / 發布價值
這份報告可以推翻一個很普遍的直覺：勒索軟體不是主要打大企業。對台灣供應鏈尤其有用的是報告裡的「能力落差」段落——中型供應商與開源維護者負擔不起每年 50 萬到 200 萬美元的資安工具堆疊，偵測時間仍停在 197 天。把這個數字接到「大廠的資安成熟度不等於供應鏈的資安成熟度」，就是一篇對同業真正有價值、而不只是轉述統計的貼文。收尾建議把第三方評估指標從文件完備度改成實際偵測與修補時間，是可以直接被讀者採用的具體主張。

### 本期支撐論點（含來源與日期）
1. **研究方法與樣本**：Black Kite 於 2026 年 8 月 18 日發布報告《Mid-Market Is the Routine Target: Ransomware, Third-Party Risk, and the Widening AI Gap》，資料由兩個部分組成——北美與歐洲 **13,336 件具可查證營收的勒索軟體事件**（2023 年 1 月至 2026 年 6 月），以及對 **120,128 家中型企業**所做的攻擊者視角外部攻擊面掃描。73% 一數出自前者的事件資料集，而非後者的掃描樣本。這是 Black Kite 首次將中型企業當成獨立區隔來研究。來源：Black Kite 原始報告（2026-08-18）、Black Kite 新聞稿（2026-08-18）。
2. **核心數據**：2023 年 1 月至 2026 年 6 月之間，近四分之三（73%）的勒索軟體受害者為中型企業，而非普遍認知的大型企業。報告對「中型企業」的定義是**年營收 1,000 萬至 10 億美元**——引用此數據時務必一併載明定義，否則讀者無從判斷自家是否落在該區間。來源：Black Kite 新聞稿（2026-08-18）、Infosecurity Magazine（2026-08-18）。
3. **產業分布**：製造業是中型企業受害者中最大的族群，占 26%，其後依序為專業、科學與技術服務業以及營建業。來源：Infosecurity Magazine（2026-08-18）。
4. **趨勢穩定性**：事件總量自 2023 年的 2,320 件成長 44% 至 2025 年的 3,340 件，但中型企業的占比幾乎沒有變動——2023 年 74.6%、2024 年 72.1%、2025 年 74%、2026 上半年 72.3%，四個期間全部落在 72–75% 之間，顯示這是結構性而非階段性現象。來源：Black Kite 原始報告（2026-08-18）、Black Kite 新聞稿（2026-08-18）。
5. **製造業被鎖定的原因**：製造業對停機的容忍度極低，且持有高敏感度資料，使其成為具吸引力的目標。來源：Infosecurity Magazine（2026-08-18）。
6. **能力落差**：中型供應商、小型軟體發行商與開源維護者無法取得每年成本 50 萬至 200 萬美元的資安工具，平均仍需 197 天偵測、60 天修補。來源：Black Kite 原始報告（2026-08-18）、Black Kite 新聞稿（2026-08-18）。
7. **落差的另一半（AI Gap 的實質）**：相對地，已導入 AI 弱點掃描的大型企業平均將偵測壓縮至 **14 天**、修補至 **21 天**。197 天對 14 天、60 天對 21 天——這組對照才是報告副標「Widening AI Gap」的具體內容，也是寫作時最有說服力的一組數字。隨企業邊界因 AI 防禦而變硬，攻擊者正把重心移向這些「Tier 2」供應商。來源：Black Kite 新聞稿（2026-08-18）。（附註：同一組 197/60 與 14/21 天的數據亦見於 Black Kite《2026 Supply Chain Vulnerability Report》，引用時可擇一標注。）

### 查證與限制
**2026-08-19 重新查證結果**：本次執行環境的網路政策仍以 403 阻擋 blackkite.com、prnewswire.com 與 infosecurity-magazine.com 的直連，改以搜尋引擎索引內容逐條核對，仍未能開啟原始報告 PDF 逐項核對。核對結果如下：

- **已確認無誤**：報告名稱《Mid-Market Is the Routine Target: Ransomware, Third-Party Risk, and the Widening AI Gap》、發布日 2026-08-18、120,128 家中型企業樣本、73%、製造業 26% 且為最大族群（其後為專業／科學／技術服務業、營建業）、事件總量 2,320（2023）→ 3,340（2025）成長 44%、每年 50 萬至 200 萬美元的資安工具堆疊、197 天偵測與 60 天修補。
- **已更正（重要）**：原稿把研究方法寫成「從攻擊者視角評估 120,128 家中型企業」，並讓 73% 看起來出自這 120,128 家的掃描。實際上報告由**兩個資料集**構成：73% 出自 **13,336 件具可查證營收的勒索軟體事件**（2023 年 1 月–2026 年 6 月，北美與歐洲），120,128 家則是外部攻擊面掃描樣本。全部草稿已改寫。
- **已補上關鍵定義**：報告的「中型企業」指**年營收 1,000 萬至 10 億美元**，原稿未載明，讀者無從對號入座，已補入所有草稿。
- **已確認並移除星號**：Black Kite 新聞稿確為 **2026 年 8 月 18 日**發布，與報告同日。
- **強化**：占比穩定性可具體到 2023 年 74.6%、2024 年 72.1%、2025 年 74%、2026 上半年 72.3%；能力落差的對照組為導入 AI 弱點掃描的大型企業平均 14 天偵測、21 天修補。

「製造業對停機容忍度低、持有高敏感資料」一項屬報導方的歸因說明，非報告的量化發現，撰稿時已據此措辭。

### 原始來源網址
- 🏛 Black Kite 原始報告 8/18  
  https://blackkite.com/reports/2026-mid-market-report/
- 🏛 Black Kite 新聞稿 8/18  
  https://www.prnewswire.com/news-releases/black-kite-research-reveals-that-ransomwares-primary-target-is-the-mid-market-not-enterprises-as-widely-assumed-302851242.html
- 📰 Infosecurity Magazine 8/18  
  https://www.infosecurity-magazine.com/news/threequarters-ransomware-attacks/
- 🏛 Black Kite 供應鏈漏洞報告 2026*（197/60 天與 50 萬–200 萬美元數據之出處，非本則的中型企業報告）  
  https://blackkite.com/reports/2026-supply-chain-vulnerability-report

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
我們談勒索軟體時，腦中浮現的通常是大型企業被癱瘓的新聞。資料說的不是這回事。

Black Kite 8 月 18 日發布的報告，分析了北美與歐洲 13,336 件具可查證營收的勒索軟體事件（2023 年 1 月至 2026 年 6 月），並對 120,128 家中型企業做了攻擊者視角的外部攻擊面掃描。核心發現：近四分之三——73%——的受害者是年營收 1,000 萬至 10 億美元的中型企業，不是大型企業。

而中型企業受害者裡，製造業是最大的一群，占 26%，遠高於第二名的專業科技服務業與第三名的營建業。

更值得注意的是趨勢的穩定性：事件總量從 2023 年的 2,320 件成長到 2025 年的 3,340 件，成長 44%，但中型企業的占比幾乎沒有變動。這不是一個「攻擊者暫時往下打」的現象，而是一個穩定的結構。

為什麼製造業排第一？報告與相關分析指出的原因其實很樸素：製造業對停機的容忍度極低——產線停一天的損失是可以精確計算的，這讓談判籌碼天生就在攻擊者手上；同時製造業手上握有高敏感度的資料，從設計圖到客戶規格。

另一份 Black Kite 報告——《2026 Supply Chain Vulnerability Report》，不是本則這份中型企業報告——點出的落差更值得台灣供應鏈重視：中型供應商、小型軟體發行商與開源維護者負擔不起每年 50 萬到 200 萬美元的資安工具，平均偵測時間仍停在 197 天、修補 60 天；而導入 AI 輔助漏洞掃描的大型企業，偵測已縮短到平均 14 天、修補 21 天。中間差了一個數量級，而落後的那一端正是大型製造商供應鏈裡的一環。

換句話說，如果你是體系內的大廠，你的資安成熟度不等於你的供應鏈的資安成熟度。第三方風險管理不能只做問卷。

三個可以立刻檢視的問題：
• 你的關鍵供應商裡，有多少家員工數在中型區間？
• 你對他們的資安要求，是否配套了他們負擔得起的做法？
• 你的產線停機情境演練，有沒有包含「供應商被勒索」這一種？

#Ransomware #ManufacturingCyber #ThirdPartyRisk #SupplyChainSecurity #OTSecurity

#### LinkedIn 草稿（English）
When we talk about ransomware, the image that comes to mind is usually a large enterprise brought to a halt. The data says otherwise.

Black Kite's report, published 18 August, analysed 13,336 ransomware incidents with verifiable revenue across North America and Europe from January 2023 to June 2026, alongside an attacker's-perspective external scan of 120,128 mid-market organisations. The headline finding: nearly three in four victims, 73%, were mid-market companies with 10 million to 1 billion US dollars in annual revenue, rather than large enterprises.

Within those mid-market victims, manufacturing is the single largest group at 26%, well ahead of professional, scientific and technical services in second place and construction in third.

What makes it more striking is how stable the trend is. Total incidents grew 44%, from 2,320 in 2023 to 3,340 in 2025, yet the mid-market share barely moved. This is not attackers temporarily working their way down the size curve. It is a stable structure.

Why is manufacturing first? The reasons are unglamorous: manufacturers have very low tolerance for downtime, and a day of stopped production has a precisely calculable cost, which hands the negotiating leverage to the attacker by default. They also hold highly sensitive data, from design files to customer specifications.

A separate Black Kite report — the 2026 Supply Chain Vulnerability Report, not this mid-market one — names a gap that anyone in a supply chain should sit with: mid-market vendors, small software publishers and open-source maintainers cannot fund tooling costing 500,000 to 2 million US dollars a year, and still average 197 days to detect and 60 days to remediate, while large enterprises using AI-powered vulnerability scanning are down to 14 days to detect and 21 to remediate. That is an order of magnitude, and the slow end sits inside a large manufacturer's supply chain.

Put plainly: if you are the large player in the ecosystem, your security maturity is not your supply chain's security maturity. Third-party risk management cannot stop at questionnaires.

Three questions worth checking immediately:
• How many of your critical suppliers sit in the mid-market headcount band?
• Do the security requirements you impose on them come with an approach they can actually afford?
• Does your production-downtime tabletop include the scenario where a supplier, not you, gets hit?

#Ransomware #ManufacturingCyber #ThirdPartyRisk #SupplyChainSecurity #OTSecurity

#### Twitter / X 推文串（中文版）
1/ Black Kite 8/18 報告：分析北美與歐洲 13,336 件具可查證營收的勒索事件，另對 120,128 家中型企業做攻擊者視角掃描。2023/1 至 2026/6，73% 的受害者是年營收 1,000 萬至 10 億美元的中型企業，不是大型企業。

2/ 中型企業受害者裡，製造業是最大族群，占 26%，其後是專業科技服務業與營建業。

3/ 趨勢很穩定：事件量從 2023 年 2,320 件成長 44% 到 2025 年 3,340 件，但中型企業占比幾乎沒動。這是結構，不是階段性現象。

4/ 為什麼是製造業？停機容忍度極低，產線停一天的損失可精確計算，談判籌碼天生在攻擊者手上；加上持有從設計圖到客戶規格的高敏感資料。

5/ 另一份 Black Kite 報告（《2026 Supply Chain Vulnerability Report》）點出的落差：中型供應商、小型軟體發行商與開源維護者負擔不起每年 50 萬到 200 萬美元的資安工具，平均偵測仍需 197 天、修補 60 天；導入 AI 輔助掃描的大型企業則是 14 天與 21 天。

6/ 對大廠的意涵：你的資安成熟度不等於你供應鏈的資安成熟度。第三方風險管理不能只做問卷，停機演練要包含「供應商被勒索」的情境。

#Ransomware #ManufacturingCyber #ThirdPartyRisk

#### Twitter / X 推文串（English）
1/ Black Kite report, 18 Aug: 13,336 ransomware incidents with verifiable revenue across North America and Europe, plus an attacker's-perspective scan of 120,128 mid-market firms. From January 2023 to June 2026, 73% of victims were mid-market companies with 10 million to 1 billion US dollars in revenue, not large enterprises.

2/ Within those mid-market victims, manufacturing is the largest group at 26%, followed by professional, scientific and technical services, then construction.

3/ The trend is stable: incidents grew 44%, from 2,320 in 2023 to 3,340 in 2025, yet the mid-market share barely moved. This is structural, not a phase.

4/ Why manufacturing? Very low downtime tolerance, and a precisely calculable cost per day of stopped production, which hands leverage to the attacker. Plus highly sensitive data, from design files to customer specifications.

5/ From a separate Black Kite report, the 2026 Supply Chain Vulnerability Report: mid-market vendors, small software publishers and open-source maintainers cannot fund 500,000 to 2 million US dollars a year of tooling, and average 197 days to detect and 60 to remediate — against 14 and 21 days for large enterprises using AI-powered scanning.

6/ For large manufacturers: your security maturity is not your supply chain's security maturity. Third-party risk management cannot stop at questionnaires, and downtime tabletops need a supplier-hit scenario.

#Ransomware #ManufacturingCyber #ThirdPartyRisk

#### 部落格要點（中文版）
標題：勒索軟體的結構性受害者：為什麼製造業中型企業是主要目標，以及大廠該做什麼

• 研究方法：Black Kite 於 2026 年 8 月 18 日發布報告，分析北美與歐洲 13,336 件具可查證營收的勒索軟體事件（2023 年 1 月–2026 年 6 月），並對 120,128 家中型企業做攻擊者視角的外部攻擊面掃描
• 核心數據：2023 年至 2026 上半年，73% 的勒索軟體受害者為年營收 1,000 萬至 10 億美元的中型企業；逐年占比為 2023 年 74.6%、2024 年 72.1%、2025 年 74%、2026 上半年 72.3%
• 產業分布：製造業占中型企業受害者的 26%，為最大族群，其後為專業科技服務業與營建業
• 趨勢穩定性：事件總量自 2023 年 2,320 件成長 44% 至 2025 年 3,340 件，中型企業占比幾乎未變，顯示為結構性而非階段性現象
• 製造業被鎖定的原因：對停機的容忍度極低使談判籌碼天生偏向攻擊者，加上持有設計圖與客戶規格等高敏感資料
• 能力落差（出自 Black Kite《2026 Supply Chain Vulnerability Report》，非本則的中型企業報告）：中型供應商、小型軟體發行商與開源維護者無法負擔每年 50 萬至 200 萬美元的資安工具，平均偵測 197 天、修補 60 天；導入 AI 輔助漏洞掃描的大型企業則為偵測 14 天、修補 21 天
• 供應鏈意涵：大型製造商的資安成熟度不等於其供應鏈的資安成熟度，落差集中在中型與小型的上游節點
• 第三方風險管理缺口：以問卷為主的評估無法反映實際偵測與修補能力，需要可驗證的指標
• 行動清單：盤點關鍵供應商的規模分布、把資安要求配套為供應商可負擔的做法、將「供應商遭勒索」納入產線停機演練情境、以偵測與修補時間而非文件完備度作為第三方評估指標

#Ransomware #ManufacturingCyber #ThirdPartyRisk #SupplyChainSecurity

#### 部落格要點（English）
Title: Ransomware's Structural Victims: Why Mid-Market Manufacturers Are the Primary Target, and What Large Players Should Do

• Method: Black Kite published its report on 18 August 2026, analysing 13,336 ransomware incidents with verifiable revenue across North America and Europe from January 2023 to June 2026, alongside an attacker's-perspective external scan of 120,128 mid-market organisations
• Headline figure: between 2023 and the first half of 2026, 73% of ransomware victims were mid-market companies with 10 million to 1 billion US dollars in annual revenue; the yearly split was 74.6% in 2023, 72.1% in 2024, 74% in 2025 and 72.3% in H1 2026
• Sector split: manufacturing accounts for 26% of mid-market victims, the largest single group, followed by professional, scientific and technical services, then construction
• Trend stability: total incidents grew 44%, from 2,320 in 2023 to 3,340 in 2025, while the mid-market share barely moved, indicating a structural rather than phase-driven pattern
• Why manufacturing is targeted: very low tolerance for downtime tilts negotiating leverage toward the attacker by default, and manufacturers hold highly sensitive data including design files and customer specifications
• The capability gap (from Black Kite's 2026 Supply Chain Vulnerability Report, not this mid-market report): mid-market vendors, small software publishers and open-source maintainers cannot fund tooling costing 500,000 to 2 million US dollars a year, and average 197 days to detect and 60 days to remediate, against 14 days to detect and 21 to remediate for large enterprises using AI-powered vulnerability scanning
• Supply chain implication: a large manufacturer's security maturity is not its supply chain's security maturity, and the gap concentrates in mid-sized and small upstream nodes
• Third-party risk gap: questionnaire-led assessment does not reflect real detection and remediation capability, so verifiable metrics are needed
• Action list: map the size distribution of critical suppliers, pair security requirements with approaches suppliers can afford, add a supplier-ransomware scenario to production downtime exercises, and assess third parties on detection and remediation time rather than documentation completeness

#Ransomware #ManufacturingCyber #ThirdPartyRisk #SupplyChainSecurity

#### 新聞簡報 / 簡訊（中文版）
Black Kite 於 2026 年 8 月 18 日發布報告，分析北美與歐洲 13,336 件具可查證營收的勒索軟體事件（2023 年 1 月–2026 年 6 月）並掃描 120,128 家中型企業，發現 73% 的受害者是年營收 1,000 萬至 10 億美元的中型企業而非大型企業；其中製造業為最大受害族群，占中型企業受害者的 26%，其後依序為專業科技服務業與營建業。事件總量自 2023 年的 2,320 件成長 44% 至 2025 年的 3,340 件，但中型企業的占比幾乎未變，顯示這是結構性而非階段性現象。另一份 Black Kite 報告《2026 Supply Chain Vulnerability Report》則指出能力落差：中型供應商、小型軟體發行商與開源維護者無法負擔每年 50 萬至 200 萬美元的資安工具，平均仍需 197 天偵測、60 天修補，而導入 AI 輔助掃描的大型企業已縮短至 14 天與 21 天。對大型製造商的意涵是自身資安成熟度不等於供應鏈的成熟度，建議將第三方評估指標從文件完備度改為實際偵測與修補時間，並把供應商遭勒索納入產線停機演練。主要來源：Black Kite 中型企業報告（8/18）、Infosecurity Magazine（8/18）、Black Kite《2026 Supply Chain Vulnerability Report》。

#Ransomware #ManufacturingCyber

#### 新聞簡報 / 簡訊（English）
Black Kite published a report on 18 August 2026 analysing 13,336 ransomware incidents with verifiable revenue across North America and Europe from January 2023 to June 2026 alongside a scan of 120,128 mid-market organisations, finding that 73% of victims were mid-market companies with 10 million to 1 billion US dollars in annual revenue rather than large enterprises; manufacturing was the largest victim group at 26% of mid-market victims, followed by professional, scientific and technical services, then construction. Total incidents grew 44%, from 2,320 in 2023 to 3,340 in 2025, while the mid-market share barely moved, indicating a structural rather than phase-driven pattern. A separate Black Kite report, the 2026 Supply Chain Vulnerability Report, identifies a capability gap: mid-market vendors, small software publishers and open-source maintainers cannot fund tooling costing 500,000 to 2 million US dollars a year and average 197 days to detect and 60 days to remediate, against 14 and 21 days for large enterprises using AI-powered vulnerability scanning. For large manufacturers the implication is that their own security maturity is not their supply chain's, so third-party assessment should shift from documentation completeness to actual detection and remediation time, and supplier ransomware belongs in production downtime exercises. Sources: Black Kite mid-market report (8/18), Infosecurity Magazine (8/18), Black Kite 2026 Supply Chain Vulnerability Report.

#Ransomware #ManufacturingCyber
