# 本期內容創意 — 2026-08-20（涵蓋 8/17–8/19）

## 選題 4：Oracle 把資安更新改成月更——8/18 一次 943 個修補，官方理由是 AI

### 標題 / 引子
**你的維護窗口還按季排，原廠已經改成月更：Oracle 8/18 一次 943 個修補、467 項免登入可遠端利用**

### 切入點 / 發布價值
這則表面上是「又一次大批修補」，值得寫的其實是節奏本身的改變，以及 Oracle 給出的理由。Oracle 自 2026 年 5 月起，在維持季度 CPU 之外新增每月 CSPU，理由是 Oracle 自己導入前沿 AI 模型後，發現與修復漏洞的速度和規模都上來了，季度節奏已裝不下。對電子製造業特別有意義：E-Business Suite、JD Edwards、PeopleSoft、Supply Chain 是 ERP 與供應鏈的骨幹，而製造業的停機維護窗口幾乎都按季排——原廠節奏變成三倍，你的窗口沒變，這個差額就是曝險。再加上 Oracle 在公告裡自己寫的那句「攻擊者之所以得手，是因為目標客戶未套用已提供的修補」，這是一手材料裡少見、可以直接引用的責任歸屬句。把它跟本期選題 02（GitLab 排程外修補）與選題 03（中型供應商平均 197 天偵測）並排，就是一篇有結構的稿子，而不只是轉貼數字。

### 本期支撐論點（含來源與日期）
1. **規模**：943 個新資安修補，橫跨二十多個產品家族。以下分項為本次自 Oracle 公告的風險矩陣逐列清點所得，非引用媒體彙總：943 列風險矩陣中 **467 列**標示為免認證即可遠端利用、**151 個** CVE 的 CVSS 達 9.0 以上（Oracle 的 critical 門檻）、**89 個**達 9.8 以上、**3 個**為滿分 10.0（Oracle Internet Directory、Hyperion Data Relationship Management、Hyperion Financial Management）。風險矩陣涵蓋 **925 個**不重複 CVE，公告全文另提及第三方元件 CVE，合計出現 1,040 個 CVE 編號。發布日為 2026 年 8 月 18 日（Revision 1）。來源：Oracle 官方 CSPU 公告（2026-08-18，逐列清點）。
2. **風險集中在哪**：Fusion Middleware 與 Hyperion **各 262 個修補**並列最大宗——前者 182 個、後者 107 個免認證可遠端利用，兩者各含 CVSS 10.0 的項目；E-Business Suite 為 120 個修補、27 個免認證可遠端利用。相對地，Oracle Database Products 全部只有 17 個（資料庫本體 6 個）。兩者相加 524 個，佔本次 943 個修補的 **55%**：風險壓倒性地集中在中介層與績效管理套件，而不是資料庫本身——這正好對上多數企業把修補預算與停機窗口押在資料庫的直覺。來源：Oracle 官方 CSPU 公告（2026-08-18，逐列清點）。
3. **節奏改變**：Oracle 自 2026 年 5 月起新增每月 CSPU，排定於 2、3、5、6、8、9、11、12 月的**第三個週二**釋出，補上 1、4、7、10 月季度 CPU 之間的空窗；季度 CPU 仍維持累積式，涵蓋先前各月 CSPU 的修補，兩者為並行而非取代。2026 年實際日期為 5/28（首次，未依第三週二）、6/16、8/18、9/15、11/17、12/15，下一次季度 CPU 為 10/20。另自 2026 年 6 月起，每次 CSPU 前的週四會先發布預告。來源：Oracle 官方資安公告總表（2026-08-20 直接開啟原文核對）。
4. **官方理由（本輪更正）**：Oracle 的說法不是「AI 讓漏洞挖掘速度超過企業修補能力」這種攻擊方視角，而是**自身視角**——Oracle 大量導入 AI（含透過 Trusted Access for Cyber 取得的前沿模型）強化自家的程式碼分析、資安測試與漏洞偵測，使發現與修復的速度和規模同步提升，因此需要一個比季更密的交付節奏。Oracle 原文：「The latest generation of AI is transforming how software vulnerabilities are identified and fixed, increasing the speed and scale of discovery and remediation.」以及「This approach enables customers in customer-managed environments to reduce exposure by applying critical fixes sooner, without waiting for the next quarterly cycle.」首次 CSPU 於 2026 年 5 月 28 日釋出，公告原文載明 **35 個**新資安修補，涵蓋 Database Products、REST Data Services、Communications、E-Business Suite 與 Hospitality Applications 五項產品。來源：Oracle 官方部落格（2026-05-04）、Oracle 5 月 CSPU 公告（2026-05-28，逐列核對）、SecurityWeek（2026-05-06）、Help Net Security（2026-05-05）。
5. **Oracle 自己的歸因**：公告中載明「In some instances, it has been reported that attackers have been successful because targeted customers had failed to apply available Oracle patches.」（在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補。）來源：Oracle 官方 CSPU 公告（2026-08-18，逐字引用自原文）。
6. **這不是理論風險**：Oracle E-Business Suite 的 CVE-2026-46817（Oracle Payments 的 File Transmission 元件，CVSS 9.8，影響 12.2.3 至 12.2.15，未認證攻擊者具 HTTP 存取即可接管系統）修補於 5 月 CSPU 釋出，6 月底即遭實際利用：威脅情報公司 Defused 於自家 EBS 蜜罐觀測到攻擊，並指出「此漏洞先前無已知利用、亦無公開 PoC」；Shadowserver 同期追蹤到約 950 個對外暴露的 EBS 實例（BleepingComputer 標題記為逾 900 個，且說明無從得知其中多少已完成修補）。**CISA 於 2026 年 7 月 15 日將其列入 KEV**——本次直接下載 CISA KEV 目錄 JSON（2026.08.19 版）核對 dateAdded 欄位確認。這條線的意義是：修補已備妥、且是 Oracle 加密節奏後才釋出的那一批，真正的破口仍在客戶端的套用速度。來源：The Hacker News（2026-06-30）、BleepingComputer（2026-07-01）、CISA KEV 目錄（2026-08-19）。
7. **與本期其他選題的交叉意義**：GitLab 在 8/17 排程外緊急修補、Black Kite 指中型供應商平均仍需 197 天偵測、Oracle 把節奏從季壓到月——三者指向同一件事：修補時限的計價單位正在從「季」往「天」甚至「小時」壓縮，而供應鏈末端的實測數字還停在 197 天。這個落差本身就是本期最值得寫的一條線。

### 查證與限制
**2026-08-19 前一輪的狀態**：本則是當時唯一達到「直接開啟原文核對」標準的選題（oracle.com 未被阻擋），但 blogs.oracle.com 仍被 403 擋下，且分項數字只單次讀取、未經清點。

**2026-08-20 第三輪查證結果（網路限制已解除）**：Oracle 8 月 CSPU 公告、5 月 CSPU 公告、資安公告總表、Oracle 官方部落格、SecurityWeek、Help Net Security、The Hacker News、BleepingComputer 全數開啟原文；CISA KEV 目錄改以直接下載官方 JSON 核對。

- **從「媒體彙總」升級為「逐列清點」**：前一輪的總體統計（逾 1,000 個 CVE、逾 460 個免認證可遠端利用、逾 150 個 critical、近 90 個 CVSS ≥9.8）註明為「出自多家媒體對公告的統計，Oracle 公告本身未以這組彙總數字呈現」。本輪直接解析公告的 943 列風險矩陣清點：**免認證可遠端利用 467 列、CVSS ≥9.0 有 151 個 CVE、≥9.8 有 89 個、滿分 10.0 有 3 個、風險矩陣涵蓋 925 個不重複 CVE、全文出現 1,040 個 CVE 編號**。媒體口徑全部成立，且現在有一手依據，該段限制說明已可刪除。
- **已更正（一）風險分布漏了一半**：前一輪寫「Fusion Middleware 一家就佔 262 個修補」為最大宗。清點後發現 **Oracle Hyperion 同樣是 262 個修補**（107 個免認證可遠端利用），與 Fusion Middleware 並列；兩者相加佔本次 55%。原稿只點名其中一個，會讓讀者低估集中度，已補正。E-Business Suite 的 120／27 亦於本輪二次確認（前一輪標為「僅單次讀取、未經交叉確認，引用時宜保守」，該保留可以撤銷）。
- **已更正（二）首次 CSPU 的規模**：原稿寫「首次 CSPU…修補 77 個漏洞」。開啟 5 月 CSPU 公告原文，載明的是 **35 個**新資安修補；五項產品家族的列舉正確。77 一數無來源支持，已改。
- **已更正（三）Oracle 改節奏的官方理由被讀反了**：原稿寫「Oracle 表示 AI 輔助的漏洞挖掘速度已超過企業以季為單位修補的能力」——這是攻擊方視角。開啟 Oracle 官方部落格（2026-05-04）與 Help Net Security 引述的原文後確認，Oracle 講的是**自己這一側**：導入前沿模型（透過 Trusted Access for Cyber）後，自家發現與修復漏洞的速度和規模都上升，所以需要比季更密的交付節奏，讓客戶「不必等到下一個季度循環就能更早套用重大修補」。措辭已依原文改寫，並補上兩段逐字引用。blogs.oracle.com 的 403 限制本輪已解除，該項限制說明刪除。
- **已確認日期並移除星號**：SecurityWeek 談每月 CSPU 一文為 **2026-05-06**、The Hacker News 的 EBS 漏洞文為 **2026-06-30**（Ravie Lakshmanan）、BleepingComputer 為 **2026-07-01**，三處 `*` 全部取消。
- **已刪除無法查證的來源**：論點 6 原列「SecurityWeek（2026-06*）」，本輪查無對應文章網址，已自來源中移除，該論點改由 The Hacker News 與 BleepingComputer 支撐。前一輪提到「SecurityWeek 針對 8 月 CSPU 的專文標題可在站內索引確認存在但取不到網址」，本輪同樣未能取得，維持不列入。
- **CISA KEV 由推論升級為一手核對**：CVE-2026-46817 的 `dateAdded` 為 **2026-07-15**，與原稿一致。順帶核對本期選題 02 的 CVE-2026-19478，截至 KEV 2026.08.19 版（1,671 筆）**尚未收錄**，已在該則標明。
- **新增查得**：自 2026 年 6 月起，每次 CSPU 前的週四會先發布預告；CVE-2026-46817 的元件精確到 Oracle Payments 的 File Transmission；Shadowserver 追蹤到約 950 個對外暴露的 EBS 實例（BleepingComputer 記為逾 900）。

### 原始來源網址
- 🏛 Oracle 官方 CSPU 公告 8/18  
  https://www.oracle.com/security-alerts/cspuaug2026.html
- 🏛 Oracle 官方資安公告總表（含 CSPU 排程）  
  https://www.oracle.com/security-alerts/
- 📰 Help Net Security 5/5  
  https://www.helpnetsecurity.com/2026/05/05/oracle-monthly-security-updates/
- 🏛 Oracle 官方部落格：每月 CSPU 自 2026-05-28 起 5/4  
  https://blogs.oracle.com/security/update-monthly-critical-security-patch-updates-cspus-begin-may-28-2026
- 🏛 Oracle 5 月 CSPU 公告 5/28（首次 CSPU，35 個修補）  
  https://www.oracle.com/security-alerts/cspumay2026.html
- 🏛 CISA 已知遭利用漏洞（KEV）目錄 2026-08-19（CVE-2026-46817 dateAdded 2026-07-15）  
  https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- 📰 SecurityWeek 5/6  
  https://www.securityweek.com/oracle-debuts-monthly-critical-security-patch-updates/
- 📰 The Hacker News 6/30  
  https://thehackernews.com/2026/06/oracle-e-business-suite-flaw-cve-2026.html
- 📰 BleepingComputer 7/1  
  https://www.bleepingcomputer.com/news/security/over-900-oracle-e-business-instances-exposed-to-ongoing-attacks/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
如果你的 ERP 維護窗口還是按季排的，有個壞消息：原廠已經不按季了。

Oracle 在 8 月 18 日釋出當月的 Critical Security Patch Update，一次 943 個資安修補，橫跨二十多個產品家族。逐列清點公告的風險矩陣：467 項免認證即可遠端利用、151 個 CVE 的 CVSS 達 9.0 以上、89 個達 9.8 以上、3 個滿分 10.0。

風險不是平均分布的。Fusion Middleware 與 Hyperion 各佔 262 個修補（免認證可遠端利用分別為 182 與 107 個，兩者都有 CVSS 10.0 的項目），兩家合計 524 個、佔本次的 55%；E-Business Suite 120 個。相對地，Oracle Database Products 全部只有 17 個，資料庫本體只有 6 個。壓力壓倒性地集中在中介層與績效管理套件，不是資料庫本身——而那往往正是最少人願意動的那一段。

但真正的重點是節奏。Oracle 自 2026 年 5 月起新增每月 CSPU，排在 2、3、5、6、8、9、11、12 月的第三個週二，補上季度 CPU 之間的空窗；季度 CPU 仍然照舊、仍然累積。Oracle 給的理由值得一字不漏地讀：「最新一代 AI 正在改變軟體漏洞被發現與修復的方式，提升了發現與修復的速度與規模」，因此改為月更，讓客戶「不必等到下一個季度循環就能更早套用重大修補」。注意這是原廠自述自己這一側變快了——不是在說攻擊者變快。對你的意義一樣直接：供給端加快，你的維護窗口沒動，差額就是曝險。

對電子製造業來說，這件事的意義很具體。E-Business Suite、JD Edwards、PeopleSoft、Supply Chain 是 ERP 與供應鏈的骨幹，而產線的停機維護窗口幾乎都是按季排的。原廠節奏變成三倍，你的窗口沒變——中間那段差額，就是曝險。

Oracle 自己在公告裡寫了一句話，值得原文引用：「在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補。」

這不是理論。E-Business Suite 的 CVE-2026-46817（Oracle Payments，CVSS 9.8，影響 12.2.3 至 12.2.15）已遭實際利用，CISA 在 7 月 15 日把它列入 KEV，報導並指出逾 900 個對外暴露的 EBS 實例處於持續攻擊之下。

三個今天就能問的問題：

• 你的 ERP 維護窗口是按季排的，還是跟得上月更？如果跟不上，缺口有多大、由誰承擔？
• 你的資產清單裡，Fusion Middleware 這類中介層元件有被獨立列管，還是被「ERP 系統」四個字含混帶過？
• 對外可達的 EBS 實例，你確定盤點過嗎？

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement #OTSecurity

#### LinkedIn 草稿（English）
If your ERP maintenance window is still scheduled by the quarter, here is the bad news: the vendor no longer works that way.

On 18 August Oracle shipped its monthly Critical Security Patch Update: 943 security patches spanning more than two dozen product families. Counted row by row from the advisory's own risk matrices: 467 are remotely exploitable without authentication, 151 CVEs score CVSS 9.0 or above, 89 reach 9.8 or above, and 3 are a straight 10.0.

The risk is not evenly spread. Fusion Middleware and Hyperion take 262 patches each — 182 and 107 respectively remotely exploitable without authentication, both containing CVSS 10.0 entries — which is 524 patches, 55% of the release, between two product families. E-Business Suite takes 120. Oracle Database Products, by contrast, account for 17 in total, with just 6 in the database itself. The pressure sits overwhelmingly in the middleware and performance-management tiers rather than the database, and that is usually the layer nobody wants to touch.

The real story is the cadence. Since May 2026 Oracle has added a monthly CSPU on the third Tuesday of February, March, May, June, August, September, November and December, filling the gaps between the quarterly CPUs, which continue unchanged and remain cumulative. Oracle's own stated rationale is worth reading exactly: "The latest generation of AI is transforming how software vulnerabilities are identified and fixed, increasing the speed and scale of discovery and remediation," and the monthly cadence "enables customers in customer-managed environments to reduce exposure by applying critical fixes sooner, without waiting for the next quarterly cycle." Note that this is the vendor describing its own side getting faster, not the attackers. The implication for you is the same: supply speeds up, your maintenance window does not, and the difference is exposure.

For electronics manufacturing the implication is concrete. E-Business Suite, JD Edwards, PeopleSoft and Supply Chain are the backbone of ERP and supply-chain operations, and production maintenance windows are almost always planned by the quarter. The vendor's cadence just tripled while your window did not. That difference is your exposure.

Oracle put a sentence in the advisory that is worth quoting directly: "In some instances, it has been reported that attackers have been successful because targeted customers had failed to apply available Oracle patches."

This is not theoretical. CVE-2026-46817 in E-Business Suite (Oracle Payments, CVSS 9.8, affecting 12.2.3 through 12.2.15) has been exploited in the wild, CISA added it to the Known Exploited Vulnerabilities catalog on 15 July, and reporting put more than 900 internet-exposed EBS instances under sustained attack.

Three questions worth asking today:

• Is your ERP maintenance window quarterly or monthly? If it cannot keep pace, how large is the gap and who owns it?
• Does your asset inventory track middleware components like Fusion Middleware separately, or are they folded into a single line that says "ERP"?
• Have you actually inventoried your internet-reachable EBS instances?

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement #OTSecurity

#### Twitter / X 推文串（中文版）
1/ Oracle 8/18 釋出當月 CSPU：943 個資安修補，橫跨二十多個產品家族。逐列清點：467 項免認證可遠端利用、151 個 CVE 達 CVSS 9.0 以上、89 個達 9.8 以上、3 個滿分 10.0。

2/ 風險不平均。Fusion Middleware 與 Hyperion 各 262 個修補（182 與 107 個免認證可遠端利用，都含 CVSS 10.0），合計佔 55%；資料庫本體只有 6 個。壓力在中介層與應用層，不在資料庫。

3/ 但重點是節奏：Oracle 自 2026 年 5 月起新增每月 CSPU，排在 2、3、5、6、8、9、11、12 月的第三個週二，補季度 CPU 的空窗。季度 CPU 照舊、仍累積，兩者並行不是取代。

4/ Oracle 自己給的理由：導入前沿 AI 模型後，「發現與修復的速度與規模」都提升，所以季度交付不夠用，改成月更讓客戶更早套用。是原廠這一側變快，不是攻擊者變快——但對你的維護窗口是同一件事。

5/ 對製造業的具體意義：EBS、JD Edwards、PeopleSoft、Supply Chain 是 ERP 骨幹，而產線停機維護窗口幾乎都按季排。原廠節奏變三倍、你的窗口沒變，差額就是曝險。

6/ Oracle 自己在公告寫：「在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補。」EBS 的 CVE-2026-46817（CVSS 9.8）已遭實際利用，CISA 7/15 列入 KEV，逾 900 個對外實例遭持續攻擊。

#PatchManagement #ERPSecurity #ManufacturingCyber

#### Twitter / X 推文串（English）
1/ Oracle shipped its monthly CSPU on 18 Aug: 943 security patches across more than two dozen product families. Counted from the advisory's risk matrices: 467 remotely exploitable without authentication, 151 CVEs at CVSS 9.0 or above, 89 at 9.8 or above, 3 at a straight 10.0.

2/ The risk is not even. Fusion Middleware and Hyperion take 262 patches each (182 and 107 remotely exploitable without authentication, both with CVSS 10.0 entries) — 55% of the release between them. The database itself takes 6. The pressure is in middleware and applications, not the database.

3/ The real story is cadence: since May 2026 Oracle adds a monthly CSPU on the third Tuesday of Feb, Mar, May, Jun, Aug, Sep, Nov and Dec, filling the gaps between quarterly CPUs. The CPUs continue and stay cumulative. This is addition, not replacement.

4/ Oracle's own rationale: with frontier AI models in the loop, the "speed and scale of discovery and remediation" went up, so a quarterly drop no longer fits and monthly CSPUs let customers apply fixes sooner. That is the vendor's own side speeding up, not the attackers' — but for your maintenance window it amounts to the same thing.

5/ Why it matters in manufacturing: EBS, JD Edwards, PeopleSoft and Supply Chain are the ERP backbone, and production maintenance windows are planned by the quarter. The vendor cadence tripled, your window did not, and the difference is exposure.

6/ Oracle's own advisory says: "attackers have been successful because targeted customers had failed to apply available Oracle patches." EBS CVE-2026-46817 (CVSS 9.8) is exploited in the wild, CISA added it to KEV on 15 July, and 900+ exposed instances were reported under attack.

#PatchManagement #ERPSecurity #ManufacturingCyber

#### 部落格要點（中文版）
標題：當原廠把修補改成月更：Oracle 的節奏轉變對製造業 ERP 的意義

• 本次規模：Oracle 於 2026 年 8 月 18 日釋出 CSPU，943 個新資安修補、橫跨二十多個產品家族；逐列清點為 467 項免認證可遠端利用、151 個 CVE 達 CVSS 9.0 以上、89 個達 9.8 以上、3 個滿分 10.0，風險矩陣涵蓋 925 個不重複 CVE
• 風險分布：Fusion Middleware 與 Hyperion 各 262 個修補（免認證可遠端利用 182 與 107 個，皆含 CVSS 10.0）、E-Business Suite 120 個（27 個免認證可遠端利用）、Oracle Database Products 合計僅 17 個——壓力集中在中介層與績效管理套件，不在資料庫
• 節奏改變：自 2026 年 5 月起新增每月 CSPU，排定於 2、3、5、6、8、9、11、12 月的第三個週二，與 1、4、7、10 月的季度 CPU 並行；季度 CPU 仍為累積式，涵蓋先前各月 CSPU
• 2026 年實際日程：5/28（首次，未依第三週二）、6/16、8/18、9/15、11/17、12/15，下一次季度 CPU 為 10/20
• 官方理由（Oracle 官方部落格逐字）：最新一代 AI 正在改變軟體漏洞被發現與修復的方式，提升了發現與修復的速度與規模；月更讓客戶不必等到下一個季度循環就能更早套用重大修補
• Oracle 的責任歸屬句：公告載明「在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補」
• 實際遭利用案例：E-Business Suite 的 CVE-2026-46817（Oracle Payments，CVSS 9.8，影響 12.2.3 至 12.2.15），CISA 於 7 月 15 日列入 KEV，逾 900 個對外暴露實例遭持續攻擊
• 製造業的結構問題一：ERP 停機維護窗口按季排，原廠節奏已改月更，兩者之間的差額就是曝險，且這個差額沒有任何人在正式追蹤
• 製造業的結構問題二：Fusion Middleware 這類中介層元件通常不在資產清單上獨立列管，被「ERP 系統」一詞含混帶過，於是最高風險的那一段沒有負責人
• 製造業的結構問題三：對外可達的 EBS 實例往往是歷史遺留（供應商入口、客戶查詢介面），最容易被排除在盤點之外
• 與本期其他選題的交叉線索：GitLab 8/17 排程外緊急修補、Black Kite 供應鏈報告指中型供應商平均 197 天偵測——修補時限的計價單位正在從「季」壓縮到「天」甚至「小時」，而供應鏈末端還停在 197 天
• 企業行動清單：把 ERP 維護窗口從季改為月並指派缺口責任人、將中介層元件在資產清單中獨立列管、盤點所有對外可達的 EBS 與應用層入口、訂閱 Oracle CSPU 與 CPU 兩條公告線、把「原廠節奏快於維護窗口」列為正式風險項目並定期複審

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement

#### 部落格要點（English）
Title: When the Vendor Goes Monthly: What Oracle's Cadence Shift Means for Manufacturing ERP

• Scale: Oracle's Critical Security Patch Update of 18 August 2026 delivered 943 new security patches across more than two dozen product families; counted row by row, 467 are remotely exploitable without authentication, 151 CVEs score CVSS 9.0 or above, 89 reach 9.8 or above and 3 are a straight 10.0, across 925 distinct CVEs in the risk matrices
• Risk distribution: Fusion Middleware and Hyperion took 262 patches each (182 and 107 remotely exploitable without authentication, both with CVSS 10.0 entries), E-Business Suite 120 (27 remotely exploitable without authentication) and Oracle Database Products 17 in total, so the pressure sits in the middleware and performance-management tiers rather than the database
• Cadence change: since May 2026 a monthly CSPU lands on the third Tuesday of February, March, May, June, August, September, November and December, running alongside the quarterly CPUs of January, April, July and October, which remain cumulative and still contain the fixes from prior monthly CSPUs
• Actual 2026 dates: 28 May (the first, off the third-Tuesday pattern), 16 June, 18 August, 15 September, 17 November and 15 December, with the next quarterly CPU on 20 October
• Stated rationale (Oracle's own blog, verbatim): the latest generation of AI is transforming how software vulnerabilities are identified and fixed, increasing the speed and scale of discovery and remediation; the monthly cadence lets customers apply critical fixes sooner without waiting for the next quarterly cycle
• Oracle's own attribution: the advisory states that "in some instances, it has been reported that attackers have been successful because targeted customers had failed to apply available Oracle patches"
• Exploited in the wild: CVE-2026-46817 in E-Business Suite (Oracle Payments, CVSS 9.8, affecting 12.2.3 through 12.2.15), added to CISA's Known Exploited Vulnerabilities catalog on 15 July, with more than 900 internet-exposed instances reported under sustained attack
• Structural problem one: ERP maintenance windows are planned quarterly while the vendor now ships monthly, and nobody formally tracks the gap between the two
• Structural problem two: middleware components such as Fusion Middleware are rarely inventoried separately, folded instead into a single line reading "ERP", which leaves the highest-risk tier without an owner
• Structural problem three: internet-reachable EBS instances are often legacy surfaces such as supplier portals and customer lookup interfaces, and are the most likely to be left out of an inventory
• Cross-reference with this issue's other topics: GitLab's out-of-band emergency patch on 17 August and Black Kite's supply-chain report finding that mid-market suppliers still average 197 days to detect together show remediation deadlines compressing from quarters toward days and hours, while the tail of the supply chain remains at 197 days
• Enterprise action list: move the ERP maintenance window from quarterly to monthly and assign an owner for the residual gap, inventory middleware components separately, enumerate every internet-reachable EBS and application-tier entry point, subscribe to both the CSPU and CPU advisory streams, and register "vendor cadence exceeds maintenance window" as a formal, periodically reviewed risk item

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement

#### 新聞簡報 / 簡訊（中文版）
Oracle 於 2026 年 8 月 18 日釋出當月 Critical Security Patch Update，一次 943 個新資安修補，橫跨二十多個產品家族；逐列清點公告風險矩陣為 467 項免認證即可遠端利用、151 個 CVE 達 CVSS 9.0 以上、89 個達 9.8 以上、3 個滿分 10.0。風險高度集中：Fusion Middleware 與 Hyperion 各佔 262 個修補（免認證可遠端利用 182 與 107 個，皆含 CVSS 10.0），合計佔 55%，而 Oracle Database Products 合計僅 17 個。更值得注意的是節奏本身——Oracle 自 2026 年 5 月起在季度 CPU 之外新增每月 CSPU，排定於 2、3、5、6、8、9、11、12 月的第三個週二釋出，季度 CPU 仍維持累積式，兩者並行而非取代；Oracle 官方給的理由是自身導入前沿 AI 模型後，漏洞發現與修復的速度與規模皆提升，月更可讓客戶不必等到下一個季度循環。Oracle 在公告中載明，部分案例中攻擊者之所以得手，是因為目標客戶未套用已提供的修補；E-Business Suite 的 CVE-2026-46817（CVSS 9.8）已遭實際利用，CISA 於 7 月 15 日列入 KEV。對電子製造業的意涵：EBS、JD Edwards、PeopleSoft 與 Supply Chain 是 ERP 骨幹，而停機維護窗口多半按季排定，原廠節奏與維護窗口之間的差額即為曝險。建議把 ERP 維護窗口改為月度並指派缺口責任人、將中介層元件在資產清單中獨立列管、盤點所有對外可達的 EBS 入口。主要來源：Oracle 官方 CSPU 公告（8/18）、Oracle 官方資安公告總表、Help Net Security（5/5）。

#PatchManagement #ERPSecurity #ManufacturingCyber

#### 新聞簡報 / 簡訊（English）
Oracle released its monthly Critical Security Patch Update on 18 August 2026, delivering 943 new security patches across more than two dozen product families; counted row by row from the advisory, 467 are remotely exploitable without authentication, 151 CVEs score CVSS 9.0 or above, 89 reach 9.8 or above and 3 are a straight 10.0. The risk is concentrated: Fusion Middleware and Hyperion take 262 patches each (182 and 107 remotely exploitable without authentication, both with CVSS 10.0 entries), 55% of the release between them, while Oracle Database Products account for 17 in total. The cadence matters more than the count. Since May 2026 Oracle has run a monthly CSPU on the third Tuesday of February, March, May, June, August, September, November and December, alongside quarterly CPUs that remain cumulative, an addition rather than a replacement; Oracle's stated rationale is that the latest generation of AI has increased the speed and scale of its own vulnerability discovery and remediation, so the monthly cadence lets customers apply critical fixes without waiting for the next quarterly cycle. Oracle's advisory notes that in some instances attackers succeeded because targeted customers had failed to apply available patches, and CVE-2026-46817 in E-Business Suite (CVSS 9.8) is already exploited in the wild, added to CISA's Known Exploited Vulnerabilities catalog on 15 July. For electronics manufacturing the implication is direct: EBS, JD Edwards, PeopleSoft and Supply Chain form the ERP backbone while maintenance windows are planned quarterly, and the gap between vendor cadence and maintenance window is exposure. Recommended actions are to move the ERP maintenance window to monthly with an owner for the residual gap, inventory middleware components separately, and enumerate every internet-reachable EBS entry point. Sources: Oracle CSPU advisory (8/18), Oracle security alerts index, Help Net Security (5/5).

#PatchManagement #ERPSecurity #ManufacturingCyber
