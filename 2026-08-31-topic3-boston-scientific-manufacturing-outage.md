# 本期內容創意 — 2026-08-31（涵蓋 8/27–8/30）

## 選題 3：一家年營收 200 億美元的醫材製造商，公告裡寫的是「影響了製造產品的能力」

### 標題 / 引子
**雲端沒事，出事的是地端：Boston Scientific 的網路中斷，把「製造」與「出貨」一起停下來**

### 切入點 / 發布價值
這則對電子製造業讀者的價值，不在「又一家大公司被駭」，而在**這家公司把中斷寫得夠具體**，具體到你可以拿去對照自己的營運持續計畫。

三個可以直接用的點：

第一，**受影響的清單裡有一句話**：事件影響到「某些作業系統與商業應用的存取，**包括製造產品的能力**，以及處理與出貨客戶訂單的能力」。多數資安事件公告只寫「IT 系統受影響」；這一句把 IT 事件與**產線停擺**之間的那條線畫出來了。

第二，**雲端與地端的分界被明確說出來**。公司在 8 月 29 日的更新中表示，調查顯示**雲端系統與應用未受影響，未授權活動僅限於某些地端系統**。這對正在做混合架構的製造業是個很好的討論起點：你的哪些關鍵營運能力還綁在地端？如果地端整片不可用，你還剩下什麼？

第三，**他們的降級運作方式值得抄**。訂單沒有停收——公司說仍可透過 **EDI 與在地應用**電子化接單並排入佇列等待日後履行，包含經由 **Global Health Exchange（GHX）** 進來的訂單，先保留到系統回復。這是「業務連續性」很實際的一種樣貌：不是全有全無，而是**把接單與履行解耦**。

另外值得注意的一層：這家公司的產品是植入式醫材，所以他們額外花了很大篇幅說明**裝置本身沒有受影響、但新裝置的遠端監測啟用受影響**。這種「產品安全」與「企業 IT 安全」必須分開溝通的處境，任何有連網產品的製造商遲早都會遇到。

### 本期支撐論點（含來源與日期）
1. **事件與時序**：Boston Scientific 於 **2026 年 8 月 25 日**識別到一起影響其部分資訊科技系統的資安事件，並在 **8 月 26 日**向美國證券交易委員會（SEC）提交 **Form 8-K**。公司表示偵測到後即啟動事件應變程序，並在第三方資安專家協助下展開調查以評估與控制威脅。來源：SEC Form 8-K（2026-08-26，逐字）、Boston Scientific 官方更新頁、Help Net Security（2026-08-27）。
2. **8-K 的用語（本則最該逐字引用的部分）**：申報書寫道，該事件「已經造成、且預期將持續造成對公司**部分資訊系統與商業應用**之存取的中斷與限制，這些系統支援公司營運的若干面向，**包括處理與出貨客戶訂單的能力**」；並稱「公司正努力回復受影響的功能與系統存取，惟**完全回復的時程尚未可知**」。來源：SEC Form 8-K（2026-08-26，逐字）。
3. **重大性尚未認定**：8-K 明載公司的調查仍在進行，事件的**完整範圍、性質與影響（含營運與財務影響）尚未可知**，因此公司**尚未判定該事件是否合理可能對公司產生重大影響**。這一點在轉述時不可省略——它是法遵語言，不是公關語言。來源：SEC Form 8-K（2026-08-26，逐字）。
4. **公司自己的更新把「製造」寫進去了**：在官方更新頁 **8 月 27 日 23:38（美東）** 與 **8 月 29 日 16:55（美東）** 的兩則更新中，公司均寫道：事件「影響到某些作業系統與商業應用的存取，**包括製造產品的能力**，以及處理與出貨客戶訂單的能力」。來源：Boston Scientific 官方更新頁（2026-08-27、2026-08-29，逐字）。
5. **雲端未受影響，範圍限於地端**：8 月 29 日的更新表示，「目前我們的調查顯示，**對雲端系統與應用沒有影響**，且**未授權活動僅限於某些地端系統**」。同一則更新並指出公司持續與 **CrowdStrike** 及其他第三方資安專家合作。來源：Boston Scientific 官方更新頁（2026-08-29，逐字）。
6. **降級運作：接單與履行解耦**：公司表示客戶**仍可繼續下單**——可透過 **EDI 與在地應用**電子化接收訂單並置入佇列以待日後履行，其中包含經由 **Global Health Exchange（GHX）** 進來的訂單，這些訂單會**保留到系統回復上線**。客戶亦可透過既有管道（業務代表、電子郵件與既有數位平台）繼續與公司溝通。來源：Boston Scientific 官方更新頁（2026-08-29，逐字）。
7. **產品安全與企業 IT 安全必須分開講**：8 月 28 日 19:34（美東）的更新中，公司就產品面作出三項陳述——**未連接至 Boston Scientific 網路的裝置沒有已知影響**；臨床人員使用該類裝置的能力沒有已知影響；**沒有證據顯示受影響的網路環境經由該公司裝置對醫院網路造成額外資安風險**。來源：Boston Scientific 官方更新頁（2026-08-28，逐字）。
8. **但「新啟用」這一段受到影響（細節值得寫）**：同一則更新針對心律管理（CRM）裝置說明——**已植入裝置的功能與既有遠端監測沒有已知影響，程式器讀取也不受影響**；然而**新的遠端監測啟用受到中斷影響**：新植入的 CRM 裝置（非植入式心律監測器）**無法啟用新的遠端監測通訊器**，因此在通訊器可被啟用之前，可取得的裝置資料**不會**傳送到遠端病患管理系統；新植入的植入式心律監測器（ICM）必須以該公司的 Clinic Assistant 應用程式啟用才能正確記錄事件，且**無法與病患的遠端監測手機配對**，資料須待配對完成或以現場讀取方式傳送。來源：Boston Scientific 官方更新頁（2026-08-28，逐字）。
9. **公司規模（用來換算衝擊量級）**：Boston Scientific 生產支架、導管、心律調節器與去顫器等微創手術裝置，依其網站資料**員工約 59,000 人、遍及 127 國**，每年治療約 **4,800 萬名病患**，**2025 年淨銷售額逾 200 億美元**。來源：Help Net Security（2026-08-27，引述公司網站）。
10. **尚無人宣稱犯案，且此為一連串事件之一**：截至報導時點，**沒有任何組織宣稱對此次攻擊負責**，細節仍有限。Boston Scientific 加入今年一連串遭攻擊的醫療科技公司之列，其中包括 **Stryker、iRhythm Holdings、Novo Nordisk 與 Xsolis**。來源：Help Net Security（2026-08-27）。

### 查證與限制
- **兩份一手文件已直接開啟核對**：SEC 的 Form 8-K（報告事件日 2026 年 8 月 25 日、申報日 8 月 26 日）與 Boston Scientific 官方更新頁（含 8/27 23:38、8/28 19:34、8/29 16:55 三則帶時戳的更新）皆已取得全文。論點 1 至 8 的所有引述均逐字比對自這兩份文件。
- **公司規模數字為媒體引述公司網站**：59,000 名員工、127 國、4,800 萬名病患、2025 年逾 200 億美元淨銷售額，取自 Help Net Security 對該公司網站的引述，本次未逐項回查公司網站或年報。此類數字僅用於換算衝擊量級，不影響事件本身的事實。
- **「重大性」的正確讀法**：8-K 明載公司**尚未判定**該事件是否合理可能造成重大影響。這既不是「已確認重大」也不是「已確認不重大」，而是**尚未認定**。撰稿時若簡化成任一邊，都會誤導讀者，也會誤導把 8-K 當風險訊號在讀的投資或供應鏈對口。
- **攻擊手法、行為者與資料外洩情形均未公開**：公司未說明初始入侵途徑，未提及勒索軟體或勒索要求，亦未確認是否有資料遭竊；截至報導時點無組織宣稱犯案。本則因此**不推測**攻擊類型，也不將其歸類為勒索軟體事件。
- **狀態會持續變動**：這是一起進行中的事件，公司明言完全回復時程未知，且該更新頁將持續作為官方資訊來源。本則所述為**截至 2026 年 8 月 29 日 16:55（美東）** 的狀態，引用時應標明時點。
- **產品安全的陳述須完整轉述，不可只取一半**：公司同時說了「已植入裝置與既有遠端監測沒有已知影響」與「**新裝置的遠端監測啟用受到影響**」。只引用前半會低估影響，只引用後半會造成不必要的恐慌。本則已將兩者並列，撰稿時請維持。
- **與本期其他選題無重疊**：本則為單一企業的營運中斷事件，與選題 01（AI 代理在競賽中的表現數據）與選題 02（開源供應鏈攻擊集團遭起訴）在主題、成因與對策上均不相同，未共用任何事實或來源。

### 原始來源網址
- 🏛 Boston Scientific 官方更新頁（8/27、8/28、8/29 三則更新）  
  https://news.bostonscientific.com/update-on-recent-cybersecurity-incident
- 🏛 SEC Form 8-K（事件日 8/25、申報日 8/26）  
  https://www.sec.gov/Archives/edgar/data/885725/000088572526000056/bsx-20260826.htm
- 📰 Help Net Security 8/27  
  https://www.helpnetsecurity.com/2026/08/27/boston-scientific-cyberattack-network-outage/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
多數資安事件公告只寫「IT 系統受到影響」。這一份寫了別的。

Boston Scientific 在官方更新中寫道：事件影響到某些作業系統與商業應用的存取，「包括製造產品的能力，以及處理與出貨客戶訂單的能力」。

一家員工約 59,000 人、遍及 127 國、2025 年淨銷售額逾 200 億美元的醫材製造商，把 IT 事件與產線停擺之間那條線，直接畫了出來。

時序：8 月 25 日識別到事件，8 月 26 日向 SEC 提交 8-K。8-K 的用語值得逐字讀——事件「已經造成、且預期將持續造成」對支援營運之資訊系統與商業應用存取的中斷與限制，而「完全回復的時程尚未可知」。

有三件事我覺得製造業同業可以直接拿去對照自己的營運持續計畫。

一、雲端與地端的分界被明講了。 8 月 29 日的更新說：調查顯示雲端系統與應用沒有影響，未授權活動僅限於某些地端系統。那麼反過來問自己：你哪些關鍵營運能力還綁在地端？如果地端整片不可用，你還剩下什麼？

二、他們把接單與履行解耦了。 訂單沒有停收——仍可透過 EDI 與在地應用電子化接單，排入佇列等待日後履行，包含經由 GHX 進來的訂單，先保留到系統回復。業務連續性不是全有全無，這是很實際的一種樣貌。

三、產品安全與企業 IT 安全必須分開溝通。 因為產品是植入式醫材，他們額外說明：未連接到公司網路的裝置沒有已知影響、已植入 CRM 裝置的功能與既有遠端監測不受影響——但新植入裝置的遠端監測啟用受到影響，新的通訊器無法啟用、新的 ICM 無法與病患手機配對。

這兩半必須一起講。只講前半會低估影響，只講後半會製造恐慌。任何有連網產品的製造商，遲早都會面對這個溝通難題。

還有一個容易被寫錯的細節：8-K 明載公司「尚未判定」事件是否合理可能造成重大影響。那不是「確認重大」，也不是「確認不重大」，是尚未認定。

目前攻擊手法、行為者與是否有資料外洩都未公開，也沒有組織宣稱犯案。以上為截至 8 月 29 日 16:55（美東）的狀態。

#Manufacturing #OTSecurity #BusinessContinuity #IncidentResponse #MedTech

#### LinkedIn 草稿（English）
Most incident disclosures say "IT systems were affected." This one said something else.

Boston Scientific's own update states that the incident is affecting access to certain operating systems and business applications, "including the ability to manufacture products, as well as process and ship customer orders."

A medical device manufacturer with roughly 59,000 employees across 127 countries and over $20 billion in 2025 net sales drew the line between an IT incident and a stopped production line explicitly.

Timeline: the incident was identified on 25 August and an 8-K was filed with the SEC on 26 August. The filing's language is worth reading verbatim — the incident "has caused, and is expected to continue to cause" disruptions and limitations of access to information systems and business applications supporting operations, and "the timeline for a full restoration is not yet known."

Three things manufacturers can take straight to their own continuity plans.

1. The cloud / on-premise boundary was stated plainly. The 29 August update says the investigation indicates no impact to cloud-based systems and applications, and that unauthorised activity is limited to certain on-premise systems. So ask the inverse: which of your critical operating capabilities are still tied to on-premise systems, and what is left if that whole layer is unavailable?

2. They decoupled order intake from fulfilment. Ordering did not stop — orders can still be taken electronically through EDI and local applications and placed in a queue for future fulfilment, including orders through the Global Health Exchange, which are held until systems are back online. Business continuity is not all-or-nothing, and this is a very practical shape for it.

3. Product safety and enterprise IT security have to be communicated separately. Because the products are implantable devices, the company added that there is no known impact to devices not connected to its network, and none to implanted CRM device function or to remote monitoring established before the disruption — but that new remote monitoring activations are affected, with new communicators unable to be activated and newly implanted ICMs unable to pair with a patient's monitoring phone.

Both halves have to travel together. The first half alone understates the impact; the second alone creates unnecessary alarm. Any manufacturer with connected products will face this communication problem eventually.

One detail that is easy to get wrong: the 8-K states the company "has not yet determined" whether the incident is reasonably likely to have a material impact. That is neither confirmed material nor confirmed immaterial. It is undetermined.

The attack method, the actor and whether data was taken all remain undisclosed, and no group has claimed the attack. The above reflects the position as of 29 August, 4:55 p.m. ET.

#Manufacturing #OTSecurity #BusinessContinuity #IncidentResponse #MedTech

#### Twitter / X 推文串（中文版）
1/ 多數資安公告只寫「IT 系統受影響」。Boston Scientific 的官方更新寫的是：影響到某些作業系統與商業應用的存取，「包括製造產品的能力，以及處理與出貨客戶訂單的能力」。IT 事件與產線停擺之間那條線，被直接畫出來了。

2/ 時序：8/25 識別到事件，8/26 向 SEC 提交 8-K。申報書用語：事件「已經造成、且預期將持續造成」存取中斷與限制，「完全回復的時程尚未可知」。

3/ 雲端與地端的分界被明講：8/29 的更新說調查顯示雲端系統與應用沒有影響，未授權活動僅限於某些地端系統。公司持續與 CrowdStrike 及其他第三方專家合作。

4/ 反過來問自己：你哪些關鍵營運能力還綁在地端？如果地端整片不可用，你還剩下什麼？

5/ 值得抄的降級運作：訂單沒停收。仍可透過 EDI 與在地應用電子化接單、排入佇列待日後履行，含經由 GHX 進來的訂單，先保留到系統回復。接單與履行解耦。

6/ 產品面必須完整轉述：未連到公司網路的裝置沒有已知影響、已植入 CRM 裝置功能與既有遠端監測不受影響——但新裝置的遠端監測啟用受影響，新通訊器無法啟用、新 ICM 無法與病患手機配對。

7/ 只講前半會低估影響，只講後半會製造恐慌。有連網產品的製造商遲早要面對這個溝通難題。

8/ 一個易寫錯的細節：8-K 明載公司「尚未判定」事件是否合理可能造成重大影響。不是確認重大，也不是確認不重大，是尚未認定。

9/ 手法、行為者、是否有資料外洩皆未公開，無人宣稱犯案。以上為截至 8/29 16:55（美東）的狀態。公司規模：約 59,000 員工、127 國、2025 年淨銷售額逾 200 億美元。

#Manufacturing #OTSecurity #BusinessContinuity #MedTech

#### Twitter / X 推文串（English）
1/ Most incident disclosures say "IT systems were affected." Boston Scientific's own update says the incident is affecting access to certain operating systems and business applications, "including the ability to manufacture products, as well as process and ship customer orders." The line between an IT incident and a stopped line, drawn explicitly.

2/ Timeline: identified 25 Aug, 8-K filed with the SEC 26 Aug. The filing's words: the incident "has caused, and is expected to continue to cause" disruptions and limitations of access, and "the timeline for a full restoration is not yet known."

3/ The cloud / on-prem boundary was stated: the 29 Aug update says the investigation indicates no impact to cloud-based systems and applications, with unauthorised activity limited to certain on-premise systems. The company continues to work with CrowdStrike and other third-party experts.

4/ So ask the inverse: which of your critical operating capabilities are still tied to on-premise systems, and what is left if that entire layer is unavailable?

5/ The degraded-mode pattern worth copying: ordering did not stop. Orders are still taken electronically via EDI and local applications and queued for future fulfilment, including Global Health Exchange orders held until systems are back. Intake decoupled from fulfilment.

6/ The product side has to be quoted in full: no known impact to devices not connected to the company network, none to implanted CRM device function or to remote monitoring established before the disruption — but new remote monitoring activations are affected, new communicators cannot be activated and newly implanted ICMs cannot pair with a patient's phone.

7/ The first half alone understates the impact; the second alone creates alarm. Any manufacturer with connected products will hit this communication problem eventually.

8/ A detail easy to get wrong: the 8-K states the company "has not yet determined" whether the incident is reasonably likely to have a material impact. Not confirmed material, not confirmed immaterial — undetermined.

9/ Method, actor and whether data was taken are all undisclosed, and no group has claimed it. This reflects the position as of 29 Aug, 4:55 p.m. ET. Company scale: ~59,000 employees across 127 countries, over $20B in 2025 net sales.

#Manufacturing #OTSecurity #BusinessContinuity #MedTech

#### 部落格要點（中文版）
標題：當公告寫的是「影響了製造產品的能力」——一份可以拿來對照自家營運持續計畫的事件揭露

• 事件與時序：Boston Scientific 於 2026 年 8 月 25 日識別到影響部分資訊科技系統的資安事件，8 月 26 日向 SEC 提交 Form 8-K；偵測後即啟動事件應變程序並在第三方資安專家協助下展開調查
• 8-K 的用語：事件「已經造成、且預期將持續造成」對支援營運之資訊系統與商業應用存取的中斷與限制，包括處理與出貨客戶訂單的能力，且完全回復時程尚未可知
• 重大性：8-K 明載公司尚未判定該事件是否合理可能造成重大影響——既非確認重大，亦非確認不重大，轉述時不可簡化為任一邊
• 公司更新把製造寫進去了：8/27 23:38 與 8/29 16:55（美東）兩則更新均載明，事件影響某些作業系統與商業應用的存取，「包括製造產品的能力，以及處理與出貨客戶訂單的能力」
• 範圍：8/29 更新指調查顯示雲端系統與應用未受影響，未授權活動僅限於某些地端系統；公司持續與 CrowdStrike 及其他第三方資安專家合作
• 降級運作的具體樣貌：客戶仍可下單，訂單可經 EDI 與在地應用電子化接收並排入佇列待日後履行，含經 Global Health Exchange（GHX）進入者，保留至系統回復；客戶亦可循既有管道（業務代表、電子郵件、既有數位平台）繼續溝通
• 產品面的完整陳述（兩半須並列）：未連接至公司網路的裝置無已知影響、臨床人員使用該類裝置的能力無已知影響、無證據顯示對醫院網路造成額外資安風險；同時，新的遠端監測啟用受影響——新植入 CRM 裝置的新通訊器無法啟用，新植入 ICM 須以 Clinic Assistant 應用程式啟用且無法與病患遠端監測手機配對，資料須待配對或現場讀取才能傳送
• 規模參照：員工約 59,000 人、遍及 127 國、每年治療約 4,800 萬名病患、2025 年淨銷售額逾 200 億美元（媒體引自公司網站）
• 尚未公開者：初始入侵途徑、行為者、是否有資料遭竊；截至報導時點無組織宣稱犯案，本則不推測攻擊類型，亦不將其歸類為勒索軟體事件
• 產業脈絡：Boston Scientific 加入今年一連串遭攻擊的醫療科技公司之列，包括 Stryker、iRhythm Holdings、Novo Nordisk 與 Xsolis
• 對製造業的三個對照題：（一）哪些關鍵營運能力仍綁在地端，地端整片不可用時還剩什麼；（二）接單與履行是否已解耦，是否有可在系統中斷期間持續收單並排隊的替代路徑；（三）產品安全與企業 IT 安全的對外溝通是否已分軌準備，能否在同一份公告中同時說清楚「裝置本身安全」與「哪些新功能啟用受影響」
• 時點聲明：本則所述為截至 2026 年 8 月 29 日 16:55（美東）的狀態，事件仍在進行中

#Manufacturing #OTSecurity #BusinessContinuity #MedTech

#### 部落格要點（English）
Title: When the disclosure says "the ability to manufacture products" — an incident write-up you can hold against your own continuity plan

• Event and timeline: Boston Scientific identified a cybersecurity incident affecting certain information technology systems on 25 August 2026 and filed a Form 8-K with the SEC on 26 August, having activated incident response protocols on detection and begun an investigation with third-party cybersecurity experts
• The 8-K's language: the incident "has caused, and is expected to continue to cause" disruptions and limitations of access to information systems and business applications supporting operations, including the ability to process and ship customer orders, with the timeline for full restoration not yet known
• Materiality: the 8-K states the company has not yet determined whether the incident is reasonably likely to have a material impact — neither confirmed material nor confirmed immaterial, and it should not be simplified to either
• The company's updates put manufacturing in writing: the 27 August 11:38 p.m. and 29 August 4:55 p.m. ET updates both state that the incident is affecting access to certain operating systems and business applications, "including the ability to manufacture products, as well as process and ship customer orders"
• Scope: the 29 August update says the investigation indicates no impact to cloud-based systems and applications and that unauthorised activity is limited to certain on-premise systems, with the company continuing to work with CrowdStrike and other third-party experts
• What degraded mode actually looked like: customers can still place orders, which are taken electronically through EDI and local applications and queued for future fulfilment, including Global Health Exchange orders held until systems return, while customers continue communicating through normal channels including sales representatives, email and established digital platforms
• The product statements, which must travel as a pair: no known impact to devices not connected to a Boston Scientific network, none to clinicians' ability to use such devices, and no evidence the affected network environment created increased risk to hospital networks — while new remote monitoring activations are affected, with new communicators unable to be activated for newly implanted CRM devices, and newly implanted ICMs requiring the Clinic Assistant app and unable to pair with a patient's remote monitoring phone until systems are restored
• Scale for calibration: roughly 59,000 employees across 127 countries, an estimated 48 million patients treated a year, and more than $20 billion in 2025 net sales (media citing the company's website)
• Still undisclosed: the initial access vector, the actor, and whether data was taken; no group had claimed the attack at the time of reporting, so this write-up does not speculate on attack type or classify it as ransomware
• Sector context: Boston Scientific joins a run of medtech companies hit this year, among them Stryker, iRhythm Holdings, Novo Nordisk and Xsolis
• Three questions for manufacturers: which critical operating capabilities remain tied to on-premise systems and what survives if that layer is wholly unavailable; whether order intake is decoupled from fulfilment with a path to keep accepting and queueing during an outage; and whether product safety and enterprise IT security communications are prepared on separate tracks so a single disclosure can say both "the devices are safe" and "these new activations are affected"
• Timestamp: this reflects the position as of 29 August 2026, 4:55 p.m. ET, with the incident ongoing

#Manufacturing #OTSecurity #BusinessContinuity #MedTech

#### 新聞簡報 / 簡訊（中文版）
Boston Scientific 於 2026 年 8 月 25 日識別到一起影響其部分資訊科技系統的資安事件，並於 8 月 26 日向美國證券交易委員會提交 Form 8-K。申報書載明該事件已經造成、且預期將持續造成對支援公司營運之資訊系統與商業應用存取的中斷與限制，包括處理與出貨客戶訂單的能力，完全回復時程尚未可知，且公司尚未判定該事件是否合理可能造成重大影響。公司官方更新頁在 8 月 27 日與 8 月 29 日的更新中進一步寫明，受影響的範圍「包括製造產品的能力」；8 月 29 日的更新並表示調查顯示雲端系統與應用未受影響、未授權活動僅限於某些地端系統，公司持續與 CrowdStrike 及其他第三方資安專家合作。營運上採取的降級方式為接單與履行解耦：客戶仍可下單，訂單經 EDI 與在地應用電子化接收後排入佇列待日後履行，包含經 Global Health Exchange 進入者。產品面公司作出雙向陳述——未連接至其網路的裝置與已植入心律管理裝置的功能、既有遠端監測均無已知影響，但新植入裝置的遠端監測啟用受到影響，新通訊器無法啟用、新植入的植入式心律監測器無法與病患遠端監測手機配對。初始入侵途徑、行為者與是否有資料遭竊均未公開，截至報導時點無組織宣稱犯案。以上為截至 8 月 29 日 16:55（美東）的狀態。建議製造業以此對照自身營運持續計畫：盤點仍綁在地端的關鍵營運能力、確認接單與履行是否已解耦、並將產品安全與企業 IT 安全的對外溝通分軌準備。主要來源：Boston Scientific 官方更新頁、SEC Form 8-K（8/26）、Help Net Security（8/27）。

#Manufacturing #OTSecurity #BusinessContinuity #MedTech

#### 新聞簡報 / 簡訊（English）
Boston Scientific identified a cybersecurity incident affecting certain of its information technology systems on 25 August 2026 and filed a Form 8-K with the US Securities and Exchange Commission on 26 August. The filing states the incident has caused, and is expected to continue to cause, disruptions and limitations of access to information systems and business applications supporting the company's operations, including the ability to process and ship customer orders, that the timeline for full restoration is not yet known, and that the company has not yet determined whether the incident is reasonably likely to have a material impact. The company's own update page went further in its 27 and 29 August updates, stating that the affected scope includes "the ability to manufacture products"; the 29 August update adds that the investigation indicates no impact to cloud-based systems and applications and that unauthorised activity is limited to certain on-premise systems, with CrowdStrike and other third-party experts engaged. Operationally the company decoupled intake from fulfilment: customers can still place orders, which are taken electronically through EDI and local applications and queued for future fulfilment, including orders through the Global Health Exchange. On the product side the company made paired statements — no known impact to devices not connected to its network, to implanted cardiac rhythm management device function, or to remote monitoring established before the disruption, but new remote monitoring activations are affected, with new communicators unable to be activated and newly implanted insertable cardiac monitors unable to pair with a patient's remote monitoring phone. The initial access vector, the actor and whether data was taken remain undisclosed, and no group had claimed the attack at the time of reporting. This reflects the position as of 29 August, 4:55 p.m. ET. Manufacturers should hold this against their own continuity plans: inventory the critical operating capabilities still tied to on-premise systems, confirm whether order intake is decoupled from fulfilment, and prepare product safety and enterprise IT security communications on separate tracks. Sources: Boston Scientific incident update page, SEC Form 8-K (8/26), Help Net Security (8/27).

#Manufacturing #OTSecurity #BusinessContinuity #MedTech
