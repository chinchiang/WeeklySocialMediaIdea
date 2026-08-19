# 本期內容創意 — 2026-08-20（涵蓋 8/17–8/19）

## 選題 4：Oracle 把資安更新改成月更——8/18 一次 943 個修補，官方理由是 AI

### 標題 / 引子
**你的維護窗口還按季排，原廠已經改成月更：Oracle 8/18 一次 943 個修補、逾 1,000 個 CVE**

### 切入點 / 發布價值
這則表面上是「又一次大批修補」，值得寫的其實是節奏本身的改變，以及 Oracle 給出的理由。Oracle 自 2026 年 5 月起，在維持季度 CPU 之外新增每月 CSPU，理由是 AI 輔助的漏洞挖掘速度已超過企業以季為單位的修補能力。對電子製造業特別有意義：E-Business Suite、JD Edwards、PeopleSoft、Supply Chain 是 ERP 與供應鏈的骨幹，而製造業的停機維護窗口幾乎都按季排——原廠節奏變成三倍，你的窗口沒變，這個差額就是曝險。再加上 Oracle 在公告裡自己寫的那句「攻擊者之所以得手，是因為目標客戶未套用已提供的修補」，這是一手材料裡少見、可以直接引用的責任歸屬句。把它跟本期選題 02（GitLab 排程外修補）與選題 03（中型供應商平均 197 天偵測）並排，就是一篇有結構的稿子，而不只是轉貼數字。

### 本期支撐論點（含來源與日期）
1. **規模**：943 個新資安修補，橫跨二十多個產品家族、解決逾 1,000 個 CVE；其中逾 460 個為免認證即可遠端利用，逾 150 個屬 critical 等級，近 90 個 CVSS 達 9.8 以上。發布日為 2026 年 8 月 18 日（Revision 1）。來源：Oracle 官方 CSPU 公告（2026-08-18，本次已直接開啟原文核對）、多家媒體轉述交叉比對。
2. **風險集中在哪**：Fusion Middleware 一家就佔 262 個修補，其中 182 個免認證可遠端利用，最高 CVSS 達 10.0；E-Business Suite 為 120 個修補、27 個免認證可遠端利用，最高 CVSS 9.8。換句話說，超過四分之一的修補集中在中介層，而不是資料庫本身。來源：Oracle 官方 CSPU 公告（2026-08-18）。
3. **節奏改變**：Oracle 自 2026 年 5 月起新增每月 CSPU，排定於 2、3、5、6、8、9、11、12 月的**第三個週二**釋出，補上 1、4、7、10 月季度 CPU 之間的空窗；季度 CPU 仍維持累積式，涵蓋先前各月 CSPU 的修補，兩者為並行而非取代。2026 年實際日期為 5/28（首次，未依第三週二）、6/16、8/18、9/15、11/17、12/15，下一次季度 CPU 為 10/20。來源：Oracle 官方資安公告總表（本次已直接開啟原文核對）。
4. **官方理由**：Oracle 表示 AI 輔助的漏洞挖掘速度已超過企業以季為單位修補的能力，因此以每月 CSPU 填補季度之間的空窗。首次 CSPU 於 2026 年 5 月 28 日釋出，修補 77 個漏洞、涵蓋 Database Server、REST Data Services、Communications、E-Business Suite 與 Hospitality Applications 五項產品。來源：SecurityWeek（2026-05*）、Help Net Security（2026-05-05）——此項為次級來源轉述，blogs.oracle.com 在本次環境中無法直連，未能核對 Oracle 原文措辭。
5. **Oracle 自己的歸因**：公告中載明「In some instances, it has been reported that attackers have been successful because targeted customers had failed to apply available Oracle patches.」（在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補。）來源：Oracle 官方 CSPU 公告（2026-08-18，逐字引用自原文）。
6. **這不是理論風險**：Oracle E-Business Suite 的 CVE-2026-46817（Oracle Payments 元件，CVSS 9.8，影響 12.2.3 至 12.2.15，未認證攻擊者具 HTTP 存取即可危及機密性、完整性與可用性）已遭實際利用，CISA 於 2026 年 7 月 15 日將其列入 KEV 已知遭利用漏洞清單；報導另指出逾 900 個對外暴露的 EBS 實例處於持續攻擊之下。來源：The Hacker News（2026-06*）、SecurityWeek（2026-06*）、BleepingComputer（2026-06*）。
7. **與本期其他選題的交叉意義**：GitLab 在 8/17 排程外緊急修補、Black Kite 指中型供應商平均仍需 197 天偵測、Oracle 把節奏從季壓到月——三者指向同一件事：修補時限的計價單位正在從「季」往「天」甚至「小時」壓縮，而供應鏈末端的實測數字還停在 197 天。這個落差本身就是本期最值得寫的一條線。

### 查證與限制
**2026-08-19 查證**：本則是本期唯一達到「直接開啟原文核對」標準的選題——oracle.com 在本次執行環境中可直連，943 這個總數、2026-08-18 的發布日、CSPU 的排程月份與實際日期、以及論點 5 的逐字引用，全部取自 Oracle 官方公告原文，非二手轉述。

仍存在的限制：

- **blogs.oracle.com 被 403 阻擋**，因此「AI 輔助漏洞挖掘超過企業修補能力」這個節奏改變的官方理由，僅有 SecurityWeek 與 Help Net Security 等次級來源的轉述，未能核對 Oracle 原文措辭，已於論點 4 標明。
- **分項數字的佐證強度不一**：Fusion Middleware 的 262 / 182 / CVSS 10.0 另有獨立媒體佐證，可信度高；E-Business Suite 的 120 / 27 讀自公告風險矩陣但僅單次讀取、未經第二來源交叉確認，引用時宜保守，或僅引用「最高 CVSS 9.8」這個有雙來源支持的部分。
- **總體統計數字**（逾 1,000 個 CVE、逾 460 個免認證可遠端利用、逾 150 個 critical、近 90 個 CVSS ≥9.8）出自多家媒體對公告的統計，各家口徑一致，但 Oracle 公告本身未以這組彙總數字呈現。另有少數來源記為 945 個修補，本文採用 Oracle 公告原文的 **943**。
- **未列入來源清單者**：SecurityWeek 針對本次 8 月 CSPU 的專文標題可在其站內索引中確認存在，但未能取得確切 URL 與發布日期，故不列入來源清單，僅以其他來源支撐相同數字。

### 原始來源網址
- 🏛 Oracle 官方 CSPU 公告 8/18  
  https://www.oracle.com/security-alerts/cspuaug2026.html
- 🏛 Oracle 官方資安公告總表（含 CSPU 排程）  
  https://www.oracle.com/security-alerts/
- 📰 Help Net Security 5/5  
  https://www.helpnetsecurity.com/2026/05/05/oracle-monthly-security-updates/
- 📰 SecurityWeek 5月*  
  https://www.securityweek.com/oracle-debuts-monthly-critical-security-patch-updates/
- 📰 The Hacker News 6月*  
  https://thehackernews.com/2026/06/oracle-e-business-suite-flaw-cve-2026.html

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
如果你的 ERP 維護窗口還是按季排的，有個壞消息：原廠已經不按季了。

Oracle 在 8 月 18 日釋出當月的 Critical Security Patch Update，一次 943 個資安修補，橫跨二十多個產品家族、解決逾 1,000 個 CVE。其中逾 460 個免認證即可遠端利用，逾 150 個屬 critical 等級，近 90 個 CVSS 達 9.8 以上。

風險不是平均分布的。Fusion Middleware 一家就佔了 262 個修補，其中 182 個免認證可遠端利用，最高 CVSS 達 10.0；E-Business Suite 的最高分是 9.8。也就是說，壓力集中在中介層與應用層，不是資料庫本身——而中介層往往正是最少人願意動的那一段。

但真正的重點是節奏。Oracle 自 2026 年 5 月起新增每月 CSPU，排在 2、3、5、6、8、9、11、12 月的第三個週二，補上季度 CPU 之間的空窗；季度 CPU 仍然照舊、仍然累積。理由據報導是：AI 輔助的漏洞挖掘速度，已經超過企業以季為單位修補的能力。

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

On 18 August Oracle shipped its monthly Critical Security Patch Update: 943 security patches spanning more than two dozen product families and resolving over 1,000 CVEs. More than 460 are remotely exploitable without authentication, more than 150 are critical, and nearly 90 carry a CVSS score of 9.8 or higher.

The risk is not evenly spread. Fusion Middleware alone accounts for 262 patches, 182 of them remotely exploitable without authentication, with a top CVSS of 10.0. E-Business Suite tops out at 9.8. The pressure sits in the middleware and application tiers rather than the database itself, and middleware is usually the layer nobody wants to touch.

The real story is the cadence. Since May 2026 Oracle has added a monthly CSPU on the third Tuesday of February, March, May, June, August, September, November and December, filling the gaps between the quarterly CPUs, which continue unchanged and remain cumulative. The reported rationale: AI-assisted vulnerability discovery has outpaced the ability of enterprises to remediate on a quarterly schedule.

For electronics manufacturing the implication is concrete. E-Business Suite, JD Edwards, PeopleSoft and Supply Chain are the backbone of ERP and supply-chain operations, and production maintenance windows are almost always planned by the quarter. The vendor's cadence just tripled while your window did not. That difference is your exposure.

Oracle put a sentence in the advisory that is worth quoting directly: "In some instances, it has been reported that attackers have been successful because targeted customers had failed to apply available Oracle patches."

This is not theoretical. CVE-2026-46817 in E-Business Suite (Oracle Payments, CVSS 9.8, affecting 12.2.3 through 12.2.15) has been exploited in the wild, CISA added it to the Known Exploited Vulnerabilities catalog on 15 July, and reporting put more than 900 internet-exposed EBS instances under sustained attack.

Three questions worth asking today:

• Is your ERP maintenance window quarterly or monthly? If it cannot keep pace, how large is the gap and who owns it?
• Does your asset inventory track middleware components like Fusion Middleware separately, or are they folded into a single line that says "ERP"?
• Have you actually inventoried your internet-reachable EBS instances?

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement #OTSecurity

#### Twitter / X 推文串（中文版）
1/ Oracle 8/18 釋出當月 CSPU：943 個資安修補，橫跨二十多個產品家族、解決逾 1,000 個 CVE。逾 460 個免認證可遠端利用，逾 150 個 critical，近 90 個 CVSS 9.8 以上。

2/ 風險不平均。Fusion Middleware 一家佔 262 個修補、182 個免認證可遠端利用，最高 CVSS 10.0；E-Business Suite 最高 9.8。壓力在中介層與應用層，不在資料庫。

3/ 但重點是節奏：Oracle 自 2026 年 5 月起新增每月 CSPU，排在 2、3、5、6、8、9、11、12 月的第三個週二，補季度 CPU 的空窗。季度 CPU 照舊、仍累積，兩者並行不是取代。

4/ 理由據報導是：AI 輔助的漏洞挖掘速度已超過企業以季為單位修補的能力。這句話值得製造業的資安與 IT 主管一起讀一次。

5/ 對製造業的具體意義：EBS、JD Edwards、PeopleSoft、Supply Chain 是 ERP 骨幹，而產線停機維護窗口幾乎都按季排。原廠節奏變三倍、你的窗口沒變，差額就是曝險。

6/ Oracle 自己在公告寫：「在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補。」EBS 的 CVE-2026-46817（CVSS 9.8）已遭實際利用，CISA 7/15 列入 KEV，逾 900 個對外實例遭持續攻擊。

#PatchManagement #ERPSecurity #ManufacturingCyber

#### Twitter / X 推文串（English）
1/ Oracle shipped its monthly CSPU on 18 Aug: 943 security patches across more than two dozen product families, resolving over 1,000 CVEs. More than 460 remotely exploitable without authentication, more than 150 critical, nearly 90 at CVSS 9.8 or above.

2/ The risk is not even. Fusion Middleware alone takes 262 patches, 182 of them remotely exploitable without authentication, top CVSS 10.0. E-Business Suite tops out at 9.8. The pressure is in middleware and applications, not the database.

3/ The real story is cadence: since May 2026 Oracle adds a monthly CSPU on the third Tuesday of Feb, Mar, May, Jun, Aug, Sep, Nov and Dec, filling the gaps between quarterly CPUs. The CPUs continue and stay cumulative. This is addition, not replacement.

4/ The reported rationale: AI-assisted vulnerability discovery has outpaced enterprises' ability to remediate on a quarterly schedule. That sentence deserves a joint read by manufacturing security and IT leadership.

5/ Why it matters in manufacturing: EBS, JD Edwards, PeopleSoft and Supply Chain are the ERP backbone, and production maintenance windows are planned by the quarter. The vendor cadence tripled, your window did not, and the difference is exposure.

6/ Oracle's own advisory says: "attackers have been successful because targeted customers had failed to apply available Oracle patches." EBS CVE-2026-46817 (CVSS 9.8) is exploited in the wild, CISA added it to KEV on 15 July, and 900+ exposed instances were reported under attack.

#PatchManagement #ERPSecurity #ManufacturingCyber

#### 部落格要點（中文版）
標題：當原廠把修補改成月更：Oracle 的節奏轉變對製造業 ERP 的意義

• 本次規模：Oracle 於 2026 年 8 月 18 日釋出 CSPU，943 個新資安修補、橫跨二十多個產品家族、解決逾 1,000 個 CVE；逾 460 個免認證可遠端利用、逾 150 個 critical、近 90 個 CVSS 9.8 以上
• 風險分布：Fusion Middleware 262 個修補（182 個免認證可遠端利用，最高 CVSS 10.0）、E-Business Suite 120 個修補（27 個免認證可遠端利用，最高 CVSS 9.8）——壓力集中在中介層與應用層，不在資料庫
• 節奏改變：自 2026 年 5 月起新增每月 CSPU，排定於 2、3、5、6、8、9、11、12 月的第三個週二，與 1、4、7、10 月的季度 CPU 並行；季度 CPU 仍為累積式，涵蓋先前各月 CSPU
• 2026 年實際日程：5/28（首次，未依第三週二）、6/16、8/18、9/15、11/17、12/15，下一次季度 CPU 為 10/20
• 官方理由（次級來源轉述）：AI 輔助的漏洞挖掘速度已超過企業以季為單位修補的能力
• Oracle 的責任歸屬句：公告載明「在部分案例中，據報攻擊者之所以得手，是因為目標客戶未套用已提供的 Oracle 修補」
• 實際遭利用案例：E-Business Suite 的 CVE-2026-46817（Oracle Payments，CVSS 9.8，影響 12.2.3 至 12.2.15），CISA 於 7 月 15 日列入 KEV，逾 900 個對外暴露實例遭持續攻擊
• 製造業的結構問題一：ERP 停機維護窗口按季排，原廠節奏已改月更，兩者之間的差額就是曝險，且這個差額沒有任何人在正式追蹤
• 製造業的結構問題二：Fusion Middleware 這類中介層元件通常不在資產清單上獨立列管，被「ERP 系統」一詞含混帶過，於是最高風險的那一段沒有負責人
• 製造業的結構問題三：對外可達的 EBS 實例往往是歷史遺留（供應商入口、客戶查詢介面），最容易被排除在盤點之外
• 與本期其他選題的交叉線索：GitLab 8/17 排程外緊急修補、Black Kite 指中型供應商平均 197 天偵測——修補時限的計價單位正在從「季」壓縮到「天」甚至「小時」，而供應鏈末端還停在 197 天
• 企業行動清單：把 ERP 維護窗口從季改為月並指派缺口責任人、將中介層元件在資產清單中獨立列管、盤點所有對外可達的 EBS 與應用層入口、訂閱 Oracle CSPU 與 CPU 兩條公告線、把「原廠節奏快於維護窗口」列為正式風險項目並定期複審

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement

#### 部落格要點（English）
Title: When the Vendor Goes Monthly: What Oracle's Cadence Shift Means for Manufacturing ERP

• Scale: Oracle's Critical Security Patch Update of 18 August 2026 delivered 943 new security patches across more than two dozen product families, resolving over 1,000 CVEs; more than 460 are remotely exploitable without authentication, more than 150 are critical, and nearly 90 score CVSS 9.8 or higher
• Risk distribution: Fusion Middleware took 262 patches (182 remotely exploitable without authentication, top CVSS 10.0) and E-Business Suite 120 patches (27 remotely exploitable without authentication, top CVSS 9.8), so the pressure sits in the middleware and application tiers rather than the database
• Cadence change: since May 2026 a monthly CSPU lands on the third Tuesday of February, March, May, June, August, September, November and December, running alongside the quarterly CPUs of January, April, July and October, which remain cumulative and still contain the fixes from prior monthly CSPUs
• Actual 2026 dates: 28 May (the first, off the third-Tuesday pattern), 16 June, 18 August, 15 September, 17 November and 15 December, with the next quarterly CPU on 20 October
• Reported rationale: AI-assisted vulnerability discovery has outpaced enterprises' ability to remediate on a quarterly schedule
• Oracle's own attribution: the advisory states that "in some instances, it has been reported that attackers have been successful because targeted customers had failed to apply available Oracle patches"
• Exploited in the wild: CVE-2026-46817 in E-Business Suite (Oracle Payments, CVSS 9.8, affecting 12.2.3 through 12.2.15), added to CISA's Known Exploited Vulnerabilities catalog on 15 July, with more than 900 internet-exposed instances reported under sustained attack
• Structural problem one: ERP maintenance windows are planned quarterly while the vendor now ships monthly, and nobody formally tracks the gap between the two
• Structural problem two: middleware components such as Fusion Middleware are rarely inventoried separately, folded instead into a single line reading "ERP", which leaves the highest-risk tier without an owner
• Structural problem three: internet-reachable EBS instances are often legacy surfaces such as supplier portals and customer lookup interfaces, and are the most likely to be left out of an inventory
• Cross-reference with this issue's other topics: GitLab's out-of-band emergency patch on 17 August and Black Kite's finding that mid-market suppliers still average 197 days to detect together show remediation deadlines compressing from quarters toward days and hours, while the tail of the supply chain remains at 197 days
• Enterprise action list: move the ERP maintenance window from quarterly to monthly and assign an owner for the residual gap, inventory middleware components separately, enumerate every internet-reachable EBS and application-tier entry point, subscribe to both the CSPU and CPU advisory streams, and register "vendor cadence exceeds maintenance window" as a formal, periodically reviewed risk item

#PatchManagement #ERPSecurity #ManufacturingCyber #VulnerabilityManagement

#### 新聞簡報 / 簡訊（中文版）
Oracle 於 2026 年 8 月 18 日釋出當月 Critical Security Patch Update，一次 943 個新資安修補，橫跨二十多個產品家族、解決逾 1,000 個 CVE；其中逾 460 個免認證即可遠端利用、逾 150 個屬 critical 等級、近 90 個 CVSS 達 9.8 以上。風險高度集中：Fusion Middleware 一家佔 262 個修補（182 個免認證可遠端利用，最高 CVSS 10.0），E-Business Suite 最高 CVSS 9.8。更值得注意的是節奏本身——Oracle 自 2026 年 5 月起在季度 CPU 之外新增每月 CSPU，排定於 2、3、5、6、8、9、11、12 月的第三個週二釋出，季度 CPU 仍維持累積式，兩者並行而非取代；據報導其理由是 AI 輔助的漏洞挖掘速度已超過企業以季為單位修補的能力。Oracle 在公告中載明，部分案例中攻擊者之所以得手，是因為目標客戶未套用已提供的修補；E-Business Suite 的 CVE-2026-46817（CVSS 9.8）已遭實際利用，CISA 於 7 月 15 日列入 KEV。對電子製造業的意涵：EBS、JD Edwards、PeopleSoft 與 Supply Chain 是 ERP 骨幹，而停機維護窗口多半按季排定，原廠節奏與維護窗口之間的差額即為曝險。建議把 ERP 維護窗口改為月度並指派缺口責任人、將中介層元件在資產清單中獨立列管、盤點所有對外可達的 EBS 入口。主要來源：Oracle 官方 CSPU 公告（8/18）、Oracle 官方資安公告總表、Help Net Security（5/5）。

#PatchManagement #ERPSecurity #ManufacturingCyber

#### 新聞簡報 / 簡訊（English）
Oracle released its monthly Critical Security Patch Update on 18 August 2026, delivering 943 new security patches across more than two dozen product families and resolving over 1,000 CVEs; more than 460 are remotely exploitable without authentication, more than 150 are critical, and nearly 90 score CVSS 9.8 or higher. The risk is concentrated: Fusion Middleware alone accounts for 262 patches, 182 of them remotely exploitable without authentication and topping out at CVSS 10.0, while E-Business Suite peaks at 9.8. The cadence matters more than the count. Since May 2026 Oracle has run a monthly CSPU on the third Tuesday of February, March, May, June, August, September, November and December, alongside quarterly CPUs that remain cumulative, an addition rather than a replacement; the reported rationale is that AI-assisted vulnerability discovery has outpaced enterprises' ability to remediate on a quarterly schedule. Oracle's advisory notes that in some instances attackers succeeded because targeted customers had failed to apply available patches, and CVE-2026-46817 in E-Business Suite (CVSS 9.8) is already exploited in the wild, added to CISA's Known Exploited Vulnerabilities catalog on 15 July. For electronics manufacturing the implication is direct: EBS, JD Edwards, PeopleSoft and Supply Chain form the ERP backbone while maintenance windows are planned quarterly, and the gap between vendor cadence and maintenance window is exposure. Recommended actions are to move the ERP maintenance window to monthly with an owner for the residual gap, inventory middleware components separately, and enumerate every internet-reachable EBS entry point. Sources: Oracle CSPU advisory (8/18), Oracle security alerts index, Help Net Security (5/5).

#PatchManagement #ERPSecurity #ManufacturingCyber
