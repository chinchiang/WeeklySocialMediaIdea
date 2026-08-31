# 本期內容創意 — 2026-08-31（涵蓋 8/27–8/30）

## 選題 2：兩個二十出頭的年輕人，一千家組織，五十萬組憑證——TeamPCP 被捕，但風險沒有跟著被捕

### 標題 / 引子
**澳洲聯邦警察與 FBI 逮捕 TeamPCP 兩名成員：他們「不特別高明」，但把公開的攻擊技術規模化的速度，是新的變數**

### 切入點 / 發布價值
這則對本站讀者有雙重意義。

第一，**它直接接上我們自己報導過的事件**。TeamPCP 被指涉的供應鏈攻擊清單裡，包含本站 2026-08-17 期選題 01 寫過的 **LiteLLM 與 Aqua 的 Trivy**。當時我們寫的是攻擊本身；現在有了執法端的結果與規模數字。這是「同一事件有重大新進展」的典型情況，值得回頭把線接起來。

第二，也是更值得深寫的——**研究者對這個團體的側寫，正好戳破了「厲害的攻擊者才可怕」的假設**。Aikido 研究員 Charlie Eriksen 的原話是：他們「**並不特別高明**」，真正讓他們危險的，是**把公開的漏洞利用、技術、研究與惡意程式構想快速操作化的能力**，而且「**LLM 看來幫忙縮短了『看到一個攻擊技術』到『大規模部署它』之間的距離**」。他的結論一句話：**更多能力，但沒有更多節制。**

對企業的意涵很直接：你的威脅模型如果還把「小團體」等同於「低能力」，這則就是反例。兩個二十出頭的人，一千多家組織，五十萬組憑證，三百 GB 資料，全球修復成本估計數億美元。

第三個可寫的角度是**歸因的紀律**。TeamPCP 長期被報導成 2025 年夏天 Shai-Hulud 蠕蟲的幕後，但 Eriksen 特別澄清：**沒有任何跡象顯示 TeamPCP 是原始 S1ngularity 與 Shai-Hulud 攻擊的發動者**——他們**複製**了那隻蠕蟲。原始攻擊是誰做的，至今未知，而且可能永遠不會知道。這種「媒體反覆報導的關聯其實不成立」的案例，本身就是很好的內容素材。

### 本期支撐論點（含來源與日期）
1. **逮捕與起訴**：澳洲聯邦警察（AFP）與西澳警察（WAPF）聯手、並與美國聯邦調查局（FBI）平行合作，於 **2026 年 8 月 26 日**在伯斯執行搜索票後起訴兩名西澳男子，**合計 14 項罪名**；兩人於 **8 月 27 日**在伯斯地方法院出庭。搜索地點為 **Cottesloe、Hamilton Hill 與 Mandurah** 三處。來源：AFP 媒體發布（2026-08-27 13:18）、Help Net Security（2026-08-27）。
2. **兩名被告與刑度**：**21 歲的 Cottesloe 男子被控 8 項罪名**，包括持有與提供供電腦犯罪使用的資料、未經授權修改資料、**未遵守《1914 年刑事法》第 3LA 條命令**（該項單獨最高刑期 10 年），以及處理 10 萬澳元以上的犯罪所得；**23 歲的 Mandurah 男子被控 6 項電腦相關罪名**，包括持有與提供供電腦犯罪使用的資料、未經授權修改資料，最高刑期至 5 年。來源：AFP 媒體發布（2026-08-27）、Help Net Security（2026-08-27）。
3. **規模（三個可引用的硬數字）**：AFP 估計該惡意程式碼**可能危害全球逾 1,000 家組織**、造成**逾 500,000 組憑證**遭竊、以及**至少 300 GB 資料**外流。媒體另引述全球修復成本估計達**數億美元**。來源：AFP 媒體發布（2026-08-27，前三項逐字）、Help Net Security（2026-08-27，修復成本）。
4. **攻擊怎麼擴散的**：AFP 表示調查始於 **2026 年 4 月**，起因是數家網路威脅評估公司通報有一個集團在**開源儲存庫上的軟體中植入惡意程式碼**。開發者把那段程式碼拉進自己的專案，於是無意間把它散布到**政府、學術界與私部門**的系統中；進入系統後，該程式碼即用於蒐集敏感資料，包括登入憑證與驗證權杖。來源：Help Net Security（2026-08-27，引述 AFP）、AFP 媒體發布（2026-08-27）。
5. **FBI 的定調**：FBI 網路犯罪部門助理主任 **Brett E. Leatherman** 表示：「這些人涉嫌為網路犯罪集團 TeamPCP 的成員，其惡意程式碼**可能已危害全球超過一千家組織**。」AFP 指揮官 **Graeme Marshall** 則說：「網路犯罪集團正變得愈來愈有組織，而且**經常像專業企業一樣運作**。」來源：Help Net Security（2026-08-27，逐字引用）。
6. **被點名的受害專案清單（與本站既有報導的接點）**：TeamPCP 據稱涉及對 **GitHub、Telnyx、LiteLLM、Aqua 的 Trivy、Checkmarx 的 KICS、TanStack、MistralAI 與 Red Hat** 的供應鏈攻擊，手法是使用其自我散布的 **Mini Shai-Hulud** 蠕蟲竊取憑證並感染更多套件。其中 **LiteLLM 與 Trivy 正是本站 2026-08-17 期選題 01 的主題**。來源：Help Net Security（2026-08-27）。
7. **歸因的重要澄清（不可略過）**：Aikido 研究員 **Charlie Eriksen** 寫道：「**絕對沒有任何跡象顯示 TeamPCP 是我們在 2025 年夏天看到的原始 S1ngularity 與 Shai-Hulud 攻擊的幕後**。不過，他們確實**複製**了那隻蠕蟲，於是就常被報導成 Shai-Hulud 攻擊的主使者。我要說清楚，**它們是不同的攻擊**。我們仍然不知道原始攻擊是誰做的，而且可能永遠不會知道。」原始 Shai-Hulud 蠕蟲在 2025 年 9 月危害逾 180 個 npm 套件，會竊取憑證並自動散布到新套件、把祕密外洩到公開的 GitHub 儲存庫，並把受害者的私有儲存庫轉為公開。來源：Aikido Security（2026-08-27，逐字引用）、Help Net Security（2026-08-27）。
8. **本則最值得寫的一段：他們並不高明**：Eriksen 對 TeamPCP 的側寫是——他們「從來不太符合一般的分類。不太算國家行為者，不太算組織型網路犯罪，也不是純意識形態的」，而是**混合了金錢、政治、破壞、自我與博取注意**，因而難以預測。更關鍵的是：「他們**也不特別高明**。讓他們危險的，是**把公開的漏洞利用、技術、研究與惡意程式構想快速操作化的能力**。**LLM 看來幫忙縮短了『看到一個攻擊技術』到『大規模部署它』之間的距離**。**更多能力，但沒有更多節制**，大概是描述 TeamPCP 為何構成問題最簡單的說法。」來源：Aikido Security（2026-08-27，逐字引用）。
9. **他自己的結論：這不會是最後一個**：Eriksen 寫道：「如果要說過去六個月我學到一件事，那就是**這不會是最後一個像 TeamPCP 的團體**。門檻正在降低，工具正在變好，小團隊正在取得幾年前需要遠更多專業與基礎設施才可能有的能力。」他並指出，隨著 LLM 加速學習、實驗、工具化與規模化，**相對不成熟的行為者能夠比以往更快地造成嚴重傷害**，這使得資安周邊的制度更形重要。來源：Aikido Security（2026-08-27，逐字引用）。
10. **調查未結束**：AFP 表示大量查扣的資料仍在檢視中，並**未排除後續還有逮捕**。來源：Help Net Security（2026-08-27，引述調查人員）。

### 查證與限制
- **一手來源已直接開啟核對**：AFP 的媒體發布（2026 年 8 月 27 日 13:18）與 Aikido Security 的分析文章皆已取得全文。逮捕日（8/26）、出庭日（8/27）、合計 14 項罪名、三處搜索地點（Cottesloe、Hamilton Hill、Mandurah）、逾 1,000 家組織／逾 500,000 組憑證／至少 300 GB、3LA 條罪名的 10 年最高刑期，以及 Eriksen 的四段引述，皆逐字比對自原文。
- **兩處媒體與官方的細節差異，本則採官方**：（一）媒體只提到 Cottesloe 與 Mandurah 兩處搜索地點，AFP 原文為**三處**（另有 Hamilton Hill），本則採 AFP。（二）媒體寫「各項罪名最高刑期介於 3 至 20 年」，AFP 原文則逐項列出、其中 3LA 條為 10 年；兩者不必然衝突（媒體為區間概括），但本則採 AFP 的逐項數字，不引用該區間。
- **「數億美元的全球修復成本」為估計值且僅見於媒體**：該數字未出現在本次取得的 AFP 原文段落中，屬媒體引述的估計。撰稿時應標明為估計並註明出處，不可寫成經查核的損失金額。
- **全部指控均為「涉嫌」**：兩人已被起訴但**尚未經法院審判**，AFP 與 FBI 的敘述均使用 allegedly。撰稿時必須全程保留「涉嫌／據稱」的表述，不可寫成已定罪或已證實。
- **歸因澄清是本則的重點之一，不可簡化**：TeamPCP **不是**原始 S1ngularity／Shai-Hulud 攻擊的行為者，他們是**複製**了該蠕蟲；原始攻擊的行為者至今未知。這一點長期被媒體混淆，若在轉述時省略，會延續錯誤。
- **Aikido 為利益相關方**：Aikido Security 是商業資安廠商，且長期追蹤並公開報導這一系列供應鏈攻擊。其側寫具有第一線觀察價值，但屬廠商觀點；「並不特別高明」「LLM 縮短了距離」等judgment 為該研究員的評估，非法院或執法機關的認定。
- **與本站既有選題的關係**：本則**不重複** 2026-08-17 期選題 01（LiteLLM／Trivy 供應鏈攻擊）與 2026-08-24 期選題 02（Rust crates 投毒）。前者寫的是攻擊本身，本則寫的是執法結果、規模量化與行為者側寫；Rust 那起則與 TeamPCP 無關聯證據，兩者不可混寫。
- **LLM 的角色是研究者的推論**：論點 8 中「LLM 縮短了從看到技術到大規模部署的距離」是 Eriksen 的評估用語（appear to have helped），**非經證實的技術鑑識結論**，也未見執法機關在起訴文件中作此主張。引用時應保留這層不確定性。

### 原始來源網址
- 🏛 澳洲聯邦警察（AFP）媒體發布 8/27  
  https://www.afp.gov.au/news-centre/media-release/two-wa-men-charged-following-afp-fbi-wapf-disruption-alleged-global
- 🏛 Aikido Security（Charlie Eriksen）分析 8/27  
  https://www.aikido.dev/blog/teampcp-arrested-supply-chain
- 📰 Help Net Security 8/27  
  https://www.helpnetsecurity.com/2026/08/27/alleged-teampcp-hackers-arrested-australia/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
兩個二十出頭的人。一千多家組織。五十萬組憑證。三百 GB 資料。

澳洲聯邦警察與西澳警察在 8 月 26 日執行搜索票，起訴兩名西澳男子——21 歲與 23 歲——合計 14 項罪名，指他們涉嫌是供應鏈攻擊集團 TeamPCP 的成員。FBI 平行參與了這項調查。

AFP 估計，這段惡意程式碼可能危害全球逾 1,000 家組織、造成逾 500,000 組憑證遭竊、至少 300 GB 資料外流。媒體引述的全球修復成本估計是數億美元。

擴散方式一點都不新奇：把惡意程式碼植入開源儲存庫上的軟體，開發者把它拉進自己的專案，於是它散進了政府、學術界與私部門的系統。進去之後，收憑證與驗證權杖。

但真正值得停下來讀的，是資安研究員 Charlie Eriksen 對這個團體的側寫。

他說他們「並不特別高明」。

讓他們危險的，是把公開的漏洞利用、技術、研究與惡意程式構想快速操作化的能力。而他的下一句是這則最該被引用的：

「LLM 看來幫忙縮短了『看到一個攻擊技術』到『大規模部署它』之間的距離。更多能力，但沒有更多節制。」

如果你的威脅模型還把「小團體」等同於「低能力」，這就是反例。

還有一件事值得說清楚，因為它被誤報很久了：TeamPCP 不是 2025 年夏天原始 S1ngularity 與 Shai-Hulud 攻擊的幕後。他們是複製了那隻蠕蟲。原始攻擊是誰做的，至今未知，Eriksen 說可能永遠不會知道。歸因這件事，值得多花三十秒查證再轉發。

最後，被點名的受害專案清單裡有 LiteLLM 和 Aqua 的 Trivy——那正是我們兩週前寫過的那起攻擊。線終於接起來了，但 Eriksen 的結尾提醒也很清楚：

「這不會是最後一個像 TeamPCP 的團體。門檻正在降低，工具正在變好，小團隊正在取得幾年前需要遠更多專業與基礎設施才可能有的能力。」

逮捕解決的是這兩個人，不是這個模式。

（全部指控目前均為涉嫌，尚未經法院審判。）

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps #AISecurity

#### LinkedIn 草稿（English）
Two men in their early twenties. More than a thousand organisations. Half a million credentials. Three hundred gigabytes of data.

On 26 August the Australian Federal Police and Western Australia Police executed search warrants and charged two WA men, aged 21 and 23, with 14 offences between them, alleging they were members of the supply chain attack group TeamPCP. The FBI worked the investigation in parallel.

The AFP estimates the malicious code potentially compromised more than 1,000 organisations globally, enabling the theft of more than 500,000 credentials and the exfiltration of at least 300 GB of data. Reported global remediation costs run into the hundreds of millions of dollars.

The spread mechanism was entirely unremarkable: plant malicious code in software hosted on an open-source repository, let developers pull it into their own projects, and it propagates into government, academic and private sector systems. Once inside, harvest credentials and authentication tokens.

But the part worth stopping on is security researcher Charlie Eriksen's characterisation of the group.

He says they were "not especially sophisticated."

What made them dangerous was their ability to take public exploits, techniques, research and malware ideas and operationalise them quickly. And his next line is the one worth quoting:

"LLMs appear to have helped close the gap between seeing an attack technique and deploying it at scale. More capability, without more restraint."

If your threat model still equates "small group" with "low capability," here is the counterexample.

One more thing worth stating clearly, because it has been misreported for a long time: TeamPCP was not behind the original S1ngularity and Shai-Hulud attacks of summer 2025. They cloned that worm. Who ran the original attacks remains unknown, and Eriksen says we may never know. Attribution deserves thirty seconds of checking before the repost.

Finally, the list of named victim projects includes LiteLLM and Aqua's Trivy — the same attack we wrote about two weeks ago. The thread finally connects, though Eriksen's closing note is just as clear:

"This will not be the last group like TeamPCP. The barriers are getting lower, the tooling is getting better, and small teams are gaining capabilities that would have required far more expertise and infrastructure only a few years ago."

The arrests resolve these two people. They do not resolve the pattern.

(All allegations remain untested in court.)

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps #AISecurity

#### Twitter / X 推文串（中文版）
1/ 兩個二十出頭的人，一千多家組織，五十萬組憑證，三百 GB 資料。澳洲聯邦警察與西澳警察 8/26 執行搜索票，起訴兩名西澳男子（21 歲與 23 歲）合計 14 項罪名，指涉為供應鏈攻擊集團 TeamPCP 成員。FBI 平行參與。

2/ AFP 的估計：惡意程式碼可能危害全球逾 1,000 家組織、逾 500,000 組憑證遭竊、至少 300 GB 資料外流。媒體引述的全球修復成本估計為數億美元。

3/ 擴散方式毫不新奇：把惡意碼植入開源儲存庫上的軟體，開發者拉進自己專案，於是散進政府、學術與私部門。進去後收憑證與驗證權杖。調查始於 2026 年 4 月，起因是數家威脅評估公司的通報。

4/ 但最值得讀的是研究員 Charlie Eriksen 的側寫：他們「並不特別高明」。讓他們危險的是把公開的漏洞利用、技術與惡意程式構想快速操作化的能力。

5/ 他的下一句：「LLM 看來幫忙縮短了『看到一個攻擊技術』到『大規模部署它』之間的距離。更多能力，但沒有更多節制。」如果你的威脅模型把「小團體」等同「低能力」，這是反例。

6/ 一個被誤報很久的重點：TeamPCP 不是 2025 年夏天原始 S1ngularity／Shai-Hulud 攻擊的幕後。他們是複製了那隻蠕蟲。原始行為者至今未知，可能永遠不會知道。歸因值得多查三十秒。

7/ 被點名的受害專案包含 GitHub、Telnyx、LiteLLM、Aqua 的 Trivy、Checkmarx 的 KICS、TanStack、MistralAI 與 Red Hat——其中 LiteLLM 與 Trivy 正是本站兩週前寫過的那起。

8/ Eriksen 的結尾：「這不會是最後一個像 TeamPCP 的團體。門檻正在降低，工具正在變好，小團隊正在取得幾年前需要遠更多專業與基礎設施才可能有的能力。」逮捕解決的是這兩個人，不是這個模式。

（全部指控目前均為涉嫌，尚未經法院審判。AFP 表示查扣資料仍在檢視，未排除後續逮捕。）

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps

#### Twitter / X 推文串（English）
1/ Two men in their early twenties. 1,000+ organisations. 500,000+ credentials. 300+ GB of data. On 26 Aug the AFP and WA Police executed search warrants and charged two WA men (21 and 23) with 14 offences between them, alleging membership of the supply chain group TeamPCP. The FBI worked it in parallel.

2/ The AFP's estimate: the malicious code potentially compromised more than 1,000 organisations globally, enabling theft of more than 500,000 credentials and exfiltration of at least 300 GB. Reported global remediation costs run to hundreds of millions of dollars.

3/ The spread mechanism was unremarkable: plant code in software on an open-source repository, let developers pull it in, and it propagates into government, academia and the private sector. Once inside, harvest credentials and auth tokens. The investigation began in April 2026 on referrals from threat assessment firms.

4/ The part worth reading is researcher Charlie Eriksen's characterisation: they were "not especially sophisticated." What made them dangerous was operationalising public exploits, techniques and malware ideas quickly.

5/ His next line: "LLMs appear to have helped close the gap between seeing an attack technique and deploying it at scale. More capability, without more restraint." If your threat model equates "small group" with "low capability," this is the counterexample.

6/ A point long misreported: TeamPCP was not behind the original S1ngularity / Shai-Hulud attacks of summer 2025. They cloned that worm. The original actors remain unknown and may never be identified. Attribution deserves the extra thirty seconds.

7/ Named victim projects include GitHub, Telnyx, LiteLLM, Aqua's Trivy, Checkmarx's KICS, TanStack, MistralAI and Red Hat — LiteLLM and Trivy being the same attack we covered two weeks ago.

8/ Eriksen's closing: "This will not be the last group like TeamPCP. The barriers are getting lower, the tooling is getting better, and small teams are gaining capabilities that would have required far more expertise and infrastructure only a few years ago." The arrests resolve two people, not the pattern.

(All allegations remain untested in court. The AFP says seized data is still being examined and further arrests are not ruled out.)

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps

#### 部落格要點（中文版）
標題：能力上升，節制沒有——TeamPCP 被捕之後，供應鏈風險為什麼沒有跟著結案

• 事件：澳洲聯邦警察（AFP）與西澳警察（WAPF）於 2026 年 8 月 26 日在伯斯執行搜索票（Cottesloe、Hamilton Hill、Mandurah 三處），起訴兩名西澳男子合計 14 項罪名，指其涉嫌為供應鏈攻擊集團 TeamPCP 成員；FBI 平行參與；兩人於 8 月 27 日在伯斯地方法院出庭
• 被告與刑度：21 歲 Cottesloe 男子被控 8 項罪名，含持有與提供供電腦犯罪使用之資料、未經授權修改資料、未遵守《1914 年刑事法》第 3LA 條命令（該項最高 10 年）、處理 10 萬澳元以上犯罪所得；23 歲 Mandurah 男子被控 6 項電腦相關罪名，最高刑期 5 年
• 規模：AFP 估計可能危害全球逾 1,000 家組織、逾 500,000 組憑證遭竊、至少 300 GB 資料外流；媒體引述全球修復成本估計達數億美元（屬估計值，非查核金額）
• 擴散路徑：調查始於 2026 年 4 月，起於數家網路威脅評估公司的通報；集團在開源儲存庫託管的軟體中植入惡意程式碼，開發者拉入自身專案後擴散至政府、學術界與私部門系統，進入後蒐集登入憑證與驗證權杖
• 官方定調：FBI 網路犯罪部門助理主任 Brett E. Leatherman 指其惡意程式碼可能已危害全球超過一千家組織；AFP 指揮官 Graeme Marshall 指網路犯罪集團愈來愈有組織，且經常像專業企業一樣運作
• 被點名的受害專案：GitHub、Telnyx、LiteLLM、Aqua 的 Trivy、Checkmarx 的 KICS、TanStack、MistralAI 與 Red Hat，手法為使用自我散布的 Mini Shai-Hulud 蠕蟲竊取憑證並感染更多套件
• 歸因澄清（長期被誤報）：TeamPCP 並非 2025 年夏天原始 S1ngularity 與 Shai-Hulud 攻擊的行為者，他們是複製了該蠕蟲；原始攻擊者至今未知。原始 Shai-Hulud 於 2025 年 9 月危害逾 180 個 npm 套件，會自動散布、將祕密外洩至公開 GitHub 儲存庫並把私有儲存庫轉為公開
• 行為者側寫（本則核心）：Aikido 研究員 Charlie Eriksen 指 TeamPCP 難以歸類，介於國家行為者、組織型犯罪與意識形態之間，混合金錢、政治、破壞、自我與博取注意；且「並不特別高明」，危險之處在於把公開的漏洞利用、技術、研究與惡意程式構想快速操作化
• AI 的角色（研究者評估，非鑑識結論）：Eriksen 認為 LLM 看來幫忙縮短了「看到攻擊技術」到「大規模部署」之間的距離，其歸納為「更多能力，但沒有更多節制」；並指出隨 LLM 加速學習、實驗、工具化與規模化，相對不成熟的行為者能更快造成嚴重傷害
• 結構性判斷：Eriksen 認為這不會是最後一個像 TeamPCP 的團體，門檻正在降低、工具正在變好，小團隊正取得數年前需要遠更多專業與基礎設施才能有的能力
• 對企業的意涵：把威脅模型中「小團體＝低能力」的假設移除；供應鏈防護的重點從「辨識高階行為者」轉向「限制任何行為者能造成的擴散半徑」——依賴鎖定、建置環境的對外連線控制、憑證與權杖的最小權限與輪替
• 引用紀律：全部指控目前均為涉嫌、尚未經法院審判；AFP 表示查扣資料仍在檢視、未排除後續逮捕

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps

#### 部落格要點（English）
Title: Capability up, restraint flat — why the supply chain risk did not close with the TeamPCP arrests

• The event: on 26 August 2026 the Australian Federal Police and Western Australia Police executed search warrants in Perth (at Cottesloe, Hamilton Hill and Mandurah) and charged two WA men with 14 offences between them, alleging membership of the supply chain attack group TeamPCP; the FBI worked the investigation in parallel, and both men appeared in Perth Magistrates Court on 27 August
• The defendants and penalties: the 21-year-old from Cottesloe faces eight charges including possessing and supplying data for use in computer offences, unauthorised modification of data, failing to comply with a section 3LA order under the Crimes Act 1914 (maximum 10 years on that count), and dealing with proceeds of crime of $100,000 or more; the 23-year-old from Mandurah faces six computer-related charges carrying up to five years
• Scale: the AFP estimates the malicious code potentially compromised more than 1,000 organisations globally, enabling theft of more than 500,000 credentials and exfiltration of at least 300 GB of data, with reported global remediation costs in the hundreds of millions of dollars (an estimate, not an audited figure)
• The propagation path: the investigation began in April 2026 on referrals from several cyber threat assessment companies; the syndicate inserted malicious code into software hosted on an open-source repository, developers pulled it into their own projects and spread it into government, academic and private sector systems, and once inside the code harvested credentials and authentication tokens
• Official framing: FBI Cyber Division Assistant Director Brett E. Leatherman said the group's malicious code potentially compromised more than a thousand organisations worldwide, while AFP Commander Graeme Marshall noted that cybercrime syndicates are becoming increasingly organised and often operate like professional businesses
• Named victim projects: GitHub, Telnyx, LiteLLM, Aqua's Trivy, Checkmarx's KICS, TanStack, MistralAI and Red Hat, using the self-spreading Mini Shai-Hulud worm to steal credentials and infect further packages
• The attribution correction, long misreported: TeamPCP was not behind the original S1ngularity and Shai-Hulud attacks of summer 2025 — they cloned the worm, and the original actors remain unknown. The original Shai-Hulud compromised more than 180 npm packages in September 2025, spreading automatically, exfiltrating secrets to public GitHub repositories and turning victims' private repos public
• The actor profile, which is the core of this story: Aikido researcher Charlie Eriksen describes TeamPCP as hard to categorise, sitting between state actor, organised cybercrime and ideology while mixing money, politics, disruption, ego and attention-seeking — and as "not especially sophisticated," dangerous because of how quickly they operationalised public exploits, techniques, research and malware ideas
• The role of AI, as a researcher's assessment rather than a forensic conclusion: Eriksen holds that LLMs appear to have helped close the gap between seeing an attack technique and deploying it at scale, summarising it as "more capability, without more restraint," and notes that as LLMs accelerate learning, experimentation, tooling and scaling, relatively immature actors can cause serious harm far faster than before
• The structural read: Eriksen expects this will not be the last group like TeamPCP, as barriers fall, tooling improves, and small teams acquire capabilities that would have demanded far more expertise and infrastructure only a few years ago
• What it means for enterprises: drop the "small group equals low capability" assumption from the threat model, and shift supply chain defence from identifying sophisticated actors toward limiting the blast radius any actor can achieve — dependency pinning, egress control on build environments, and least privilege plus rotation for credentials and tokens
• Citation discipline: all allegations remain untested in court, and the AFP says seized data is still being examined with further arrests not ruled out

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps

#### 新聞簡報 / 簡訊（中文版）
澳洲聯邦警察（AFP）與西澳警察（WAPF）於 2026 年 8 月 26 日在伯斯執行搜索票，起訴兩名西澳男子合計 14 項罪名，指其涉嫌為供應鏈攻擊集團 TeamPCP 成員，FBI 平行參與此案；21 歲 Cottesloe 男子被控 8 項罪名，含未遵守《1914 年刑事法》第 3LA 條命令（該項最高 10 年）與處理 10 萬澳元以上犯罪所得，23 歲 Mandurah 男子被控 6 項電腦相關罪名，最高刑期 5 年，兩人於 8 月 27 日出庭。AFP 估計該惡意程式碼可能危害全球逾 1,000 家組織、造成逾 500,000 組憑證遭竊、至少 300 GB 資料外流，媒體引述的全球修復成本估計達數億美元。擴散方式為在開源儲存庫託管的軟體中植入惡意程式碼，開發者拉入自身專案後散布至政府、學術界與私部門系統，進入後蒐集登入憑證與驗證權杖；被點名的受害專案包含 GitHub、Telnyx、LiteLLM、Aqua 的 Trivy、Checkmarx 的 KICS、TanStack、MistralAI 與 Red Hat。須特別澄清的是，TeamPCP 並非 2025 年夏天原始 S1ngularity 與 Shai-Hulud 攻擊的行為者，他們是複製了該蠕蟲，原始攻擊者至今未知。Aikido 研究員 Charlie Eriksen 指該集團「並不特別高明」，其危險之處在於快速把公開的漏洞利用與技術操作化，並認為 LLM 看來幫忙縮短了從看到技術到大規模部署的距離，歸納為「更多能力，但沒有更多節制」。全部指控目前均為涉嫌、尚未經法院審判，AFP 並表示未排除後續逮捕。建議企業將威脅模型中「小團體等於低能力」的假設移除，並把供應鏈防護重心放在限制擴散半徑：依賴鎖定、建置環境對外連線控制、憑證與權杖的最小權限與輪替。主要來源：AFP 媒體發布（8/27）、Aikido Security（8/27）、Help Net Security（8/27）。

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps

#### 新聞簡報 / 簡訊（English）
On 26 August 2026 the Australian Federal Police and Western Australia Police executed search warrants in Perth and charged two Western Australian men with 14 offences between them, alleging they were members of the supply chain attack group TeamPCP, with the FBI working the investigation in parallel; the 21-year-old from Cottesloe faces eight charges including failing to comply with a section 3LA order under the Crimes Act 1914 (maximum 10 years on that count) and dealing with proceeds of crime of $100,000 or more, while the 23-year-old from Mandurah faces six computer-related charges carrying up to five years, and both appeared in Perth Magistrates Court on 27 August. The AFP estimates the malicious code potentially compromised more than 1,000 organisations globally, enabling theft of more than 500,000 credentials and exfiltration of at least 300 GB of data, with reported global remediation costs in the hundreds of millions of dollars. The propagation path was to insert malicious code into software hosted on an open-source repository so that developers pulled it into their own projects, spreading it into government, academic and private sector systems where it harvested credentials and authentication tokens; named victim projects include GitHub, Telnyx, LiteLLM, Aqua's Trivy, Checkmarx's KICS, TanStack, MistralAI and Red Hat. One clarification matters: TeamPCP was not behind the original S1ngularity and Shai-Hulud attacks of summer 2025 — they cloned that worm, and the original actors remain unknown. Aikido researcher Charlie Eriksen describes the group as "not especially sophisticated," dangerous instead for how quickly it operationalised public exploits and techniques, and assesses that LLMs appear to have helped close the gap between seeing a technique and deploying it at scale, summarised as "more capability, without more restraint." All allegations remain untested in court and the AFP has not ruled out further arrests. Enterprises should drop the assumption that a small group means low capability, and focus supply chain defence on limiting blast radius: dependency pinning, egress control on build environments, and least privilege plus rotation for credentials and tokens. Sources: AFP media release (8/27), Aikido Security (8/27), Help Net Security (8/27).

#SupplyChainSecurity #ThreatIntel #OpenSource #DevSecOps
