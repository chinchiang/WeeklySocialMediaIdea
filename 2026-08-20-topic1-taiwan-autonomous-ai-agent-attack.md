# 本期內容創意 — 2026-08-20（涵蓋 8/17–8/19）

## 選題 1：台灣政府機關遭近乎全自動的 AI Agent 攻擊——4 天、12 波、21 套系統，工具全部開源

### 標題 / 引子
**4 天、12 波、21 套系統：台灣政府機關遭近乎全自動的 AI Agent 攻擊，工具全部開源**

### 切入點 / 發布價值
這是第一起有完整鑑識紀錄佐證的國家級 AI Agent 攻擊，而且沒有用到任何客製化攻擊程式。對內容經營而言，價值不在「AI 會攻擊了」這個標題，而在三個可驗證的細節：攻擊邊際成本的崩塌幅度（一支團隊四天的工作量由開源代理平行完成）、安全機制被繞過的方式（一句「已授權滲透測試」的宣告，屬語意層防線）、以及官方與國際媒體對「自主程度」的定性落差（數發部認定為人為操作結合 AI Agent 輔助的混合模式）。第三點特別值得寫，因為多數轉載都省略了它，而它正是治理討論最需要的精確度。

### 本期支撐論點（含來源與日期）
1. **證據基礎**：以色列資安公司 Dream 於例行威脅追蹤中發現一份對外暴露的 160MB 線上封存檔，內含 1,395 份檔案，是該攻擊框架的完整工作區，涵蓋行動的規劃、執行與後處理。來源：Dream 研究部落格（2026-08-12）、CyberScoop（2026-08-12）、CNN Business（2026-08-13）、Taipei Times（2026-08-14）——一手來源加三個獨立媒體交叉確認。
2. **攻擊規模與時序**：攻擊執行於 2026 年 7 月 1 日至 7 月 4 日，共 12 波次，最多同時派出 8 個子代理，各自分配目標與攻擊手法，測繪 21 套相互連通的政府系統。來源：CyberScoop（2026-08-12）、CNN Business（2026-08-13）。
3. **資料損失**：85 組政府帳號遭攻破、逾 2,500 筆人事資料外洩（部分報導載明為 2,564 筆）、7 組 SSO 用戶端密鑰、6 組內部資料庫憑證（涵蓋 MSSQL、Oracle、Sybase），並以 JSON 形式匯出全部部門系統使用者清單，另取得內部網段 IP 範圍。來源：數位發展部資通安全署新聞稿（2026-08-13）、The Register（2026-08-12）、CNN Business（2026-08-13）。
4. **擴散範圍**：目標後續擴及核安主管機關、供應鏈廠商與至少 7 家能源業者。來源：Taipei Times（2026-08-14）、CyberScoop（2026-08-12）。
5. **工具組成**：框架由 Nous Research 於 2026 年 2 月發布的 Hermes Agent，以及 2025 年 11 月推出、半年內累積 34 萬 GitHub 星數的開源個人 AI 助理 OpenClaw 組成，未使用任何客製化攻擊程式。來源：CyberScoop（2026-08-12）、CNN Business（2026-08-13）。
6. **安全機制繞過手法**：兩套工具皆內建防止攻擊性使用的機制，攻擊方以「已授權的滲透測試」包裝整個行動而繞過，原始文件以簡體中文撰寫。來源：CyberScoop（2026-08-12）。
7. **官方定性**：數位發展部 2026 年 8 月 13 日證實事件，說明資安監控單位於 7 月即偵測到攻擊、國家資通安全研究院自 7 月 20 日起發布警示，並將攻擊定性為「人為操作結合 AI Agent 輔助」的混合模式，而非完全自主；調查已結束，受影響機關均已完成修補。來源：數位發展部資通安全署新聞稿（2026-08-13）、iThome（2026-08*）。
8. **首報時序**：本事件由《金融時報》於 2026 年 8 月 12 日首報，數發部次日證實。來源：CyberScoop（2026-08-12）、CNN Business（2026-08-13）。
9. **一手來源與「指名」的差異**：Dream 於 2026 年 8 月 12 日在自家研究部落格發表完整分析，但依公司政策僅描述為「亞洲地區政府機關」，並未指名台灣；指名台灣的是《金融時報》的首報與後續媒體，以及數發部自身的證實。援引本案時應區分「Dream 的鑑識發現」與「目標國家的歸屬」兩層資訊。來源：Dream 研究部落格（2026-08-12）、CyberScoop（2026-08-12）。
10. **決策機制**：框架核心是一具雙層貝氏決策引擎，分別對單一漏洞與整條攻擊鏈評分，後驗機率推高至 0.95 以上才晉級下一階段；另記錄 5 次「Learning Cycles」自主研究循環（自公開漏洞資料庫與 GitHub 抓取可用於目標環境的技術），以及攔下 7 個誤判的自我校正機制（其中一例是把 SQL injection 誤讀為 SMTP timeout）。內部日誌顯示曾調用 DeepSeek-V4-Flash 模型，Dream 發言人表示無法確認是否為唯一使用的模型。來源：Dream 研究部落格（2026-08-12）、iThome（2026-08*）。

### 查證與限制
本選題為補收錄：事件於 8/12（金融時報首報、Dream 研究部落格同日發表）至 8/14 之間曝光，正好落在 2026-08-17 期（涵蓋 8/13–8/16）與 2026-08-13 期（涵蓋 8/10–8/12）的區間交界，因規則縫隙未被收錄，經使用者指示補入 2026-08-20 期並標明原始日期。

**2026-08-19 重新查證結果**：本次執行環境的網路政策仍以 403 阻擋所有新聞網站與 moda.gov.tw 的直連（curl 與網頁抓取皆然），但搜尋索引可用，故改以搜尋引擎索引內容逐條核對，仍未能逐篇開啟原文。核對結果如下：

- **已更正**：原稿稱封存檔「內含 1,395 份診斷報告與各波次摘要」，實為 **1,395 份檔案**構成的完整工作區（涵蓋規劃、執行與後處理），已全面改正。
- **已確認並移除星號**：數發部資通安全署新聞稿確為 **2026 年 8 月 13 日（民國 115 年 8 月 13 日）** 發布，經工商時報（8/13）、中央社（8/13）、Newtalk（8/13）、知新聞同日轉載該篇新聞稿標題交叉確認；CyberScoop 一文確為 **2026 年 8 月 12 日**發表。
- **已確認**：7/1–7/4、12 波次、最多 8 個子代理、21 套系統、85 組帳號、逾 2,500 筆人事資料、7 組 SSO 用戶端密鑰、6 組資料庫憑證（MSSQL/Oracle/Sybase）、擴及核安主管機關與至少 7 家能源業者、Hermes Agent（Nous Research，2026 年 2 月）與 OpenClaw（2025 年 11 月推出，原名 Warelay）、以「已授權滲透測試」宣告繞過安全機制、原始文件為簡體中文，以及數發部「人為操作結合 AI Agent 輔助」的混合模式定性與 7/20 起的資安院警示，全部獲得多來源一致支持。
- **新增查得**：Dream 的一手研究部落格（已補列為 🏛 來源）；Dream 報告本身未指名台灣，僅稱「亞洲地區政府機關」；雙層貝氏決策引擎、5 次 Learning Cycles、7 個誤判的自我校正，以及內部日誌中的 DeepSeek-V4-Flash 調用跡證。
- **仍無法精確認定**：iThome 該篇的確切刊登日期（僅能推定為 8/13 或其後），維持 8月* 的降級標註。

撰稿時特別保留了官方「混合模式」與部分國際媒體「完全自主」之間的定性差異，未逕自採用單一說法。

### 原始來源網址
- 🏛 數發部資通安全署新聞稿 8/13  
  https://moda.gov.tw/ACS/press/news/press/20394
- 🏛 Dream 原始研究報告 8/12  
  https://www.dreamgroup.com/blog/inside-a-multi-agent-ai-framework-used-to-compromise-government-entities-in-asia
- 📰 CNN Business 8/13  
  https://www.cnn.com/2026/08/13/tech/china-taiwan-ai-agent-cyberattack-intl-hnk
- 📰 CyberScoop 8/12  
  https://cyberscoop.com/near-autonomous-ai-attack-government-target-taiwan/
- 📰 Taipei Times 8/14  
  https://www.taipeitimes.com/News/front/archives/2026/08/14/2003862463
- 📰 iThome 8月*  
  https://www.ithome.com.tw/news/178135

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
這次攻擊沒有寫任何一行客製化攻擊程式。工具全部是開源的，任何人都能下載。

以色列資安公司 Dream 取得了攻擊方遺留的完整工作區紀錄——一個 160MB 的封存檔，內含 1,395 份檔案，涵蓋行動的規劃、執行與後處理。紀錄顯示，2026 年 7 月 1 日至 7 月 4 日之間，一套 AI 代理框架對台灣政府機關發動 12 波攻擊，最多同時派出 8 個子代理，各自分配目標與攻擊手法。

框架由兩套開源工具組成：Nous Research 於 2026 年 2 月發布的 Hermes Agent，以及 2025 年 11 月推出、半年內累積 34 萬 GitHub 星數的個人 AI 助理 OpenClaw。兩者原本都內建防止用於攻擊行為的安全機制——攻擊方繞過的方式，是把整個行動包裝成「已授權的滲透測試」，原始文件以簡體中文撰寫。

成果：測繪 21 套相互連通的政府系統、攻破 85 組政府帳號、取得逾 2,500 筆人事資料、7 組 SSO 用戶端密鑰、6 組內部資料庫憑證（涵蓋 MSSQL、Oracle、Sybase），並匯出全部部門系統使用者清單。目標範圍後續擴及核安主管機關、供應鏈廠商與至少 7 家能源業者。

數發部 8 月 13 日證實此事，並提供了一個值得注意的修正：資安監控單位 7 月即偵測到異常，國家資通安全研究院自 7 月 20 日起發布警示；調查認定這是「人為操作結合 AI Agent 輔助」的混合模式，而非完全自主。調查已結束，受影響機關均已完成修補。

這個「近乎自主」與「完全自主」的差別，正是治理上最該抓住的地方。爭論攻擊有幾成自動化沒有意義，真正改變的是三件事：

• 攻擊的邊際成本崩塌。原本需要一支團隊四天不間斷的工作量，現在由開源代理平行完成。
• 安全機制的防線是語意層，不是技術層。一句「這是授權滲透測試」就能繞過——這代表以宣告用途為基礎的防護，對有動機的攻擊者近乎無效。
• 防守方的偵測窗口被壓縮到「波次」等級。12 波、4 天，意味著以週為單位的弱點修補節奏已經跟不上。

如果你正在為公司制定 AI 使用政策：你的政策是否只規範「我們怎麼用 AI」，而沒有假設「對手也用同一批工具」？

#AISecurity #AIGovernance #AgenticAI #ThreatIntel #CyberDefense

#### LinkedIn 草稿（English）
Not one line of custom offensive code was written for this campaign. Every tool used was open source, and anyone can download them.

Israeli security firm Dream obtained the attackers' complete leftover workspace — a 160MB archive containing 1,395 files covering the campaign's planning, execution and post-processing. The records show that between 1 and 4 July 2026, an AI agent framework ran 12 attack waves against Taiwanese government agencies, deploying up to eight sub-agents in parallel, each assigned its own targets and techniques.

The framework was assembled from two open-source projects: Hermes Agent, released by Nous Research in February 2026, and OpenClaw, an open-source personal AI assistant launched in November 2025 that gathered 340,000 GitHub stars in under six months. Both ship with safety mechanisms intended to prevent offensive use. The attackers bypassed them by packaging the whole operation as an authorised penetration test, with the source documents written in Simplified Chinese.

The results: 21 interconnected government systems mapped, 85 government accounts cracked, more than 2,500 personnel records taken, seven SSO client secrets, six internal database credentials spanning MSSQL, Oracle and Sybase, plus a full export of every departmental system user. Targeting later extended to the nuclear safety regulator, supply-chain vendors and at least seven energy companies.

Taiwan's Ministry of Digital Affairs confirmed the incident on 13 August, with one correction worth noting: monitoring units detected the activity in July, and the National Institute of Cyber Security began issuing alerts from 20 July. The investigation concluded that this was a hybrid mode combining human operators with AI agent assistance, rather than fully autonomous operation. The investigation has closed and affected agencies have remediated.

That gap between near-autonomous and fully autonomous is exactly where the governance lesson sits. Arguing about the precise percentage of automation is not useful. Three things genuinely changed:

• The marginal cost of attack collapsed. What used to take a team four days of continuous work is now executed in parallel by open-source agents.
• The safety boundary is semantic, not technical. One claim of authorised penetration testing was enough to bypass it, which means intent-declaration-based guardrails offer close to zero resistance to a motivated adversary.
• Defender detection windows are now measured in waves. Twelve waves over four days means a weekly patching rhythm no longer keeps pace.

If you are writing your organisation's AI usage policy: does it only govern how you use AI, without assuming your adversary uses the same tools?

#AISecurity #AIGovernance #AgenticAI #ThreatIntel #CyberDefense

#### Twitter / X 推文串（中文版）
1/ 以色列資安公司 Dream 取得攻擊方遺留的 160MB 工作區封存檔，內含 1,395 份檔案。紀錄顯示 2026/7/1–7/4 有一套 AI 代理框架對台灣政府機關發動 12 波攻擊，最多同時派出 8 個子代理。

2/ 框架完全由開源工具組成：Nous Research 2026 年 2 月發布的 Hermes Agent，加上 2025 年 11 月推出、半年累積 34 萬星的 OpenClaw。沒有任何客製化攻擊程式。

3/ 兩套工具都有防止攻擊性使用的安全機制。繞過方式：把整個行動包裝成「已授權的滲透測試」，原始文件以簡體中文撰寫。防線在語意層，不在技術層。

4/ 成果：21 套政府系統測繪、85 組帳號攻破、逾 2,500 筆人事資料、7 組 SSO 用戶端密鑰、6 組資料庫憑證（MSSQL/Oracle/Sybase）。後續擴及核安主管機關與至少 7 家能源業者。

5/ 數發部 8/13 證實，但做了重要修正：7 月即偵測到，國家資通安全研究院自 7/20 起示警；定性為「人為操作結合 AI Agent 輔助」的混合模式，而非完全自主。調查已結束、機關已修補。

6/ 治理重點不是自動化幾成，而是：攻擊邊際成本崩塌、以宣告用途為基礎的安全機制近乎無效、偵測節奏必須從「週」壓縮到「波次」。你的 AI 政策有假設對手用同一批工具嗎？

#AISecurity #AIGovernance #AgenticAI

#### Twitter / X 推文串（English）
1/ Israeli security firm Dream recovered a 160MB workspace archive left behind by the attackers, containing 1,395 files. It shows an AI agent framework running 12 attack waves against Taiwanese government agencies from 1 to 4 July 2026, with up to eight sub-agents in parallel.

2/ The framework was built entirely from open-source tools: Hermes Agent, released by Nous Research in February 2026, plus OpenClaw, launched November 2025 and up to 340,000 GitHub stars within six months. No custom offensive code at all.

3/ Both tools ship safety mechanisms against offensive use. The bypass: package the operation as an authorised penetration test. Source documents were written in Simplified Chinese. The boundary held at the semantic layer, not the technical one.

4/ Results: 21 government systems mapped, 85 accounts cracked, 2,500+ personnel records, seven SSO client secrets, six database credentials across MSSQL, Oracle and Sybase. Targeting later reached the nuclear safety regulator and at least seven energy companies.

5/ Taiwan's MODA confirmed on 13 Aug with an important correction: detection happened in July, with alerts from the National Institute of Cyber Security from 20 July. It was assessed as a hybrid of human operators plus AI agent assistance, not full autonomy. Investigation closed, agencies remediated.

6/ The governance point is not the percentage of automation. It is this: attack marginal cost collapsed, intent-declaration guardrails proved near useless, and detection cadence has to move from weekly to per-wave. Does your AI policy assume the adversary uses the same tools?

#AISecurity #AIGovernance #AgenticAI

#### 部落格要點（中文版）
標題：當攻擊框架不再需要客製化程式：台灣 AI Agent 攻擊事件的治理啟示

• 事件時間軸：攻擊執行於 2026/7/1–7/4；國家資通安全研究院自 7/20 起示警；金融時報 8/12 首報；數發部 8/13 證實
• 證據來源：以色列資安公司 Dream 取得攻擊方遺留的 160MB 工作區封存檔，含 1,395 份檔案，涵蓋行動的規劃、執行與後處理
• 攻擊規模：12 波次、最多 8 個子代理平行運作、測繪 21 套相互連通的政府系統
• 資料損失：85 組政府帳號、逾 2,500 筆人事資料、7 組 SSO 用戶端密鑰、6 組內部資料庫憑證（MSSQL、Oracle、Sybase）、全部門系統使用者清單匯出
• 擴散範圍：核安主管機關、供應鏈廠商、至少 7 家能源業者
• 工具組成：Hermes Agent（Nous Research，2026/2 發布）與 OpenClaw（2025/11 推出，半年 34 萬 GitHub 星），皆為開源、皆內建防濫用機制
• 繞過手法：將行動宣告為「已授權的滲透測試」，原始文件為簡體中文
• 官方定性差異：數發部認定為「人為操作結合 AI Agent 輔助」的混合模式，與部分國際媒體「完全自主」的描述有落差，此差異本身即為重要治理資訊
• 治理啟示一：攻擊邊際成本崩塌，威脅模型中「攻擊者資源有限」的假設需要重寫
• 治理啟示二：以宣告用途為基礎的安全防護屬語意層防線，對有動機的攻擊者近乎無效，不應作為合規依據
• 治理啟示三：偵測與修補節奏需從「週」壓縮至「波次」等級，並將帳號異常聚合行為納入偵測情境
• 企業行動清單：盤點對外可達的身分驗證端點與 SSO 用戶端密鑰、建立資料庫憑證輪替機制、將 AI 代理工具納入使用政策與資產清單、演練「大量帳號在短時間內被枚舉」的應變流程

#AISecurity #AIGovernance #AgenticAI #ThreatIntel

#### 部落格要點（English）
Title: When an Attack Framework Needs No Custom Code: Governance Lessons from the Taiwan AI Agent Campaign

• Timeline: the campaign ran 1 to 4 July 2026; Taiwan's National Institute of Cyber Security issued alerts from 20 July; the Financial Times reported it first on 12 August; MODA confirmed on 13 August
• Evidence base: Israeli security firm Dream recovered a 160MB workspace archive left by the attackers, holding 1,395 files covering the campaign's planning, execution and post-processing
• Scale: 12 attack waves, up to eight sub-agents running in parallel, 21 interconnected government systems mapped
• Data loss: 85 government accounts, more than 2,500 personnel records, seven SSO client secrets, six internal database credentials across MSSQL, Oracle and Sybase, plus a full export of departmental system users
• Spread: the nuclear safety regulator, supply-chain vendors and at least seven energy companies
• Toolchain: Hermes Agent (Nous Research, released February 2026) and OpenClaw (launched November 2025, 340,000 GitHub stars within six months), both open source and both shipping anti-abuse mechanisms
• Bypass method: declaring the operation an authorised penetration test, with source documents written in Simplified Chinese
• Official framing differs: MODA assessed a hybrid of human operation plus AI agent assistance, which diverges from the fully autonomous framing used by some international outlets. That divergence is itself governance-relevant information
• Lesson one: the marginal cost of attack has collapsed, so the threat-model assumption that attackers have limited resources needs rewriting
• Lesson two: intent-declaration guardrails are a semantic boundary and offer near-zero resistance to a motivated adversary, so they should not be treated as a compliance control
• Lesson three: detection and patching cadence must compress from weekly to per-wave, and aggregate account anomalies belong in detection scenarios
• Enterprise action list: inventory internet-reachable authentication endpoints and SSO client secrets, establish database credential rotation, bring AI agent tooling into usage policy and asset inventory, and rehearse the response to mass account enumeration in a short window

#AISecurity #AIGovernance #AgenticAI #ThreatIntel

#### 新聞簡報 / 簡訊（中文版）
以色列資安公司 Dream 取得攻擊方遺留的 160MB 工作區封存檔（含 1,395 份檔案），揭露 2026 年 7 月 1 日至 4 日一套 AI 代理框架對台灣政府機關發動 12 波攻擊，最多同時派出 8 個子代理，測繪 21 套相互連通的政府系統、攻破 85 組帳號、取得逾 2,500 筆人事資料、7 組 SSO 用戶端密鑰與 6 組資料庫憑證，目標並擴及核安主管機關與至少 7 家能源業者。框架完全由開源工具組成——Nous Research 的 Hermes Agent 與 OpenClaw——並以「已授權滲透測試」的宣告繞過兩者內建的防濫用機制。數發部 8 月 13 日證實事件，說明資安監控單位 7 月即偵測到、國家資通安全研究院自 7 月 20 日起示警，並將其定性為人為操作結合 AI Agent 輔助的混合模式，調查已結束、受影響機關均已修補。建議企業盤點對外可達的身分驗證端點與 SSO 密鑰，並將 AI 代理工具納入使用政策。主要來源：數發部資通安全署新聞稿（8/13）、CNN Business（8/13）、Taipei Times（8/14）。

#AISecurity #AIGovernance

#### 新聞簡報 / 簡訊（English）
Israeli security firm Dream recovered a 160MB workspace archive left behind by the attackers, containing 1,395 files, revealing that between 1 and 4 July 2026 an AI agent framework ran 12 attack waves against Taiwanese government agencies with up to eight sub-agents in parallel, mapping 21 interconnected government systems, cracking 85 accounts, taking more than 2,500 personnel records, seven SSO client secrets and six database credentials, with targeting extending to the nuclear safety regulator and at least seven energy companies. The framework was assembled entirely from open-source tools, Hermes Agent from Nous Research and OpenClaw, and bypassed both projects' anti-abuse mechanisms by declaring the operation an authorised penetration test. Taiwan's Ministry of Digital Affairs confirmed the incident on 13 August, noting that monitoring units detected the activity in July, that the National Institute of Cyber Security issued alerts from 20 July, and that it assessed the campaign as a hybrid of human operation with AI agent assistance; the investigation has closed and affected agencies have remediated. Enterprises should inventory internet-reachable authentication endpoints and SSO secrets and bring AI agent tooling into usage policy. Sources: MODA Administration for Cyber Security press release (8/13), CNN Business (8/13), Taipei Times (8/14).

#AISecurity #AIGovernance
