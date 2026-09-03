# 本期內容創意 — 2026-09-03（涵蓋 8/31–9/2）

## 選題 3：1045 名開發者、425 張選票、8 個選項——Debian 投票決定了 LLM 政策，禁用案在 3:1 門檻前出局

### 標題 / 引子
**Debian 沒有禁用 LLM，也沒有要求揭露。但它畫了三條有拘束力的紅線——而且這是全世界第一份經過正式投票、有完整票數紀錄可查的大型開源專案 AI 政策。**

### 切入點 / 發布價值
市面上談 AI 使用政策的文章，多數是顧問公司的範本或某家企業的內規摘要。這一則不一樣：**它是一份可以逐字讀、逐票查的政策形成紀錄。**

Debian 專案秘書 Kurt Roeckx 於 **2026 年 8 月 30 日**在 debian-devel-announce 公布一般決議（General Resolution）2026/vote_002「LLM usage in Debian」的結果。這份紀錄公開了三件在企業內部通常看不到的東西：**完整的選項清單、完整的兩兩對決票數、以及每個選項為什麼出局的計算式**。

值得寫的角度有四個。

**第一，禁用案不是「輸了」，是「連門檻都沒摸到」。** 選項 1「Ban LLM contributions from Debian via Social Contract」因為要修改 Debian 社會契約，需要 **3:1 的絕對多數**。它拿到的比值是 **0.560（144/257）**——連 1:1 都不到。而選項 3「Reject LLMs as far as practical, update Code of Conduct」只需要簡單多數，它的比值是 **0.765（176/230）**，同樣沒過。**在一個 1045 名開發者的社群裡，兩個限制性最強的選項都沒有通過。**

**第二，勝出的不是最寬鬆的選項，而是最具體的那個。** 最後由選項 5「Responsible Use of Generative AI」以 Condorcet 方式勝出——Schwartz Set 中只有它一個。它在兩兩對決中擊敗選項 2（203 對 148）、選項 6（210 對 130）、選項 7（251 對 139）、選項 8（244 對 154），對「以上皆非」是 281 對 126。它勝出的理由不是最放任，而是它同時做了兩件事：**不設身分限制，但設具體行為紅線。**

**第三，三條紅線的內容，可以直接搬進企業內規。** 決議原文明確要求：（一）機密資訊、私人通訊、資安敏感資訊（明文舉例為「尚未公開的、被禁運的資安漏洞資訊」）、加密金鑰、憑證與其他非公開材料，**不得在未經明確授權下提供給第三方 AI 服務**；（二）大規模或自動化的專案行動——大量開 bug、大量送 patch、大規模程式碼修改——**須先經適當管道討論並取得共識**，且該自動化流程**須有一名對其行為與產出負責的人類監督**；（三）專案**不對 AI 產出的著作權歸屬表態**，既有的授權與著作權規則照常適用。

**第四，揭露是「鼓勵，不強制」——而這正是最值得跟企業對照的一點。** 決議原文是：「We enourage our contributors to disclose whether a contribution was made with AI assitance, but do not require them to do so.」（原文如此，含兩處拼字錯誤）。同時它把責任推回貢獻者身上，用詞相當重：「盲目接受或上傳 AI 生成的材料而未經適當的人類審查，與 Debian 既有的開發實踐不相容。」

也就是說，Debian 的判斷是：**與其管來源，不如管責任。** 這對正在寫 AI 使用規範的企業是一個直接可用的分歧點——你要花力氣去要求並驗證「這段是不是 AI 寫的」，還是把資源放在「不管誰寫的，送出的人要負全責」加上幾條不可跨越的資料紅線？

### 本期支撐論點（含來源與日期）
1. **決議與時點**：Debian 專案秘書 Kurt Roeckx（secretary@debian.org）於 **2026 年 8 月 30 日 11:07:57 +0200** 在 debian-devel-announce 郵件列表公布「General resolution: LLM usage in Debian: Results」，勝出選項為 **Choice 5: Responsible Use of Generative AI**。來源：Debian 郵件列表公告（2026-08-30）。
2. **投票規模與門檻**：投票頁面載明當時具投票權的開發者數為 **1045 人**，Q = sqrt(1045)/2 = 16.1632…，K = min(5, Q) = 5，**法定門檻（3×Q）為 48.4897**。本站清點官方 tally sheet，實際投出的選票為 **425 張**（約 40.7% 的投票率）。八個實質選項全部達到法定門檻（最低的選項 1 為 144，最高的選項 5 為 281）。來源：Debian 官方投票頁與 tally sheet（2026）。
3. **八個實質選項（原文標題）**：Choice 1「No LLM contributions to Debian via Social Contract」、Choice 2「Allow AI-Assisted Contributions with conditions」、Choice 3「Reject LLMs as far as practical, update Code of Conduct」、Choice 4「Accept AI contributions for Debian specific work」、Choice 5「Responsible Use of Generative AI」、Choice 6「A cautious approach to generative AI」、Choice 7「Debian is created by humans」、Choice 8「Avoid the use of LLM: climate destruction is a deal breaker」，另有 Choice 9「None of the above」。來源：Debian 官方投票頁。
4. **兩個限制性選項如何出局**：投票頁的計算紀錄顯示，選項 1 的比值為「0.560 (144/257)」而其門檻為 3，選項 3 的比值為「0.765 (176/230)」而其門檻為 1，兩者均因未達多數要求而遭剔除（原文的兩行分別以 Dropping option 1 because of majority 與 Dropping option 3 because of majority 起首，本則為避免小於號在網頁上被誤判為標籤而改以文字敘述）。頁面另註明「Proposal A needs a 3:1 majority, the other proposals need a simple majority.」——選項 1 因涉及修改社會契約而適用 3:1 絕對多數門檻。來源：Debian 官方投票頁。
5. **勝出過程**：其餘選項均通過多數要求，最終依 Condorcet 方法比對兩兩對決。選項 5 擊敗選項 2（**203 對 148**，差 55 票）、擊敗選項 4（**232 對 115**，差 117 票）、擊敗選項 6（**210 對 130**，差 80 票）、擊敗選項 7（**251 對 139**，差 112 票）、擊敗選項 8（**244 對 154**，差 90 票）、擊敗「以上皆非」（**281 對 126**，差 155 票）。官方頁面載明「The Schwartz Set contains Option 5」，且贏家為選項 5。來源：Debian 官方投票頁。
6. **決議的法律定位**：決議開頭寫明係依據 Debian 憲章第 4.1(5) 條發出的「立場聲明」，描述專案在通過當下的位置，並明言「That position may evolve as time passes without the need to resort to future general resolutions.」——亦即後續調整不必再走一次 GR。來源：決議原文（2026-08-30）。
7. **核心立場（原文）**：「Debian neither endorses nor prohibits the use of generative AI tools in the development, maintenance, or documentation of software, packaging, documentation, and other media published within the Debian Project.」並認可這類工具在負責任使用下可顯著提升貢獻者的生產力。來源：決議原文。
8. **責任歸屬（原文，本則最重的一句）**：「The use of a generative AI tool does not diminish the contributor's responsibility for the work they submit. Contributors are expected to understand, review, test, and, where appropriate, modify AI-assisted output before incorporating it into Debian. Blindly accepting or uploading AI-generated material without appropriate human review is inconsistent with Debian's established development practices.」來源：決議原文。
9. **揭露條款（原文，含原始拼字錯誤）**：「We enourage our contributors to disclose whether a contribution was made with AI assitance, but do not require them to do so.」來源：決議原文。
10. **著作權立場（原文）**：專案承認 AI 產出的法律地位在許多司法管轄區仍在討論中，包括著作權、著作人身分、授權與訓練素材重製等問題，並明言「The Project does not seek to resolve these unsettled legal questions through this General Resolution, nor does it adopt a position on whether AI-generated output is, in whole or in part, copyrightable or derived from copyrighted works.」既有的授權、著作權、軟體自由與貢獻接受政策照常適用。來源：決議原文。
11. **紅線一：資料外流（原文）**：貢獻者須確保「confidential information, private communications, security-sensitive information (such as embargoed information about security bugs that is not yet public), cryptographic keys, credentials, and other non-public material relating to the Debian Project, its infrastructure, or its community are not disclosed to third-party AI services unless such disclosure has been explicitly authorized and is consistent with Debian's security and privacy requirements.」來源：決議原文。
12. **紅線二：大規模自動化（原文）**：「Contributors intending to perform actions with broad project impact, such as mass bug filing or patch submission, large-scale code modifications, or other automated changes or requests affecting many packages or contributors, should seek prior discussion and consensus through the appropriate project channels before proceeding. Any such automated process should be overseen by a human who remains accountable for its behavior and output.」來源：決議原文。
13. **總結句（原文）**：「This resolution therefore affirms that generative AI is neither exempt from nor subject to special rules beyond the standards already expected of Debian contributors.」來源：決議原文。

### 查證與限制
- **一手來源已完整開啟並逐字比對**：Debian 專案秘書的結果公告全文、官方投票頁（含法定門檻計算、各選項得票、出局計算式、兩兩對決票數、Schwartz Set 與勝者），以及官方 tally sheet 原始檔，均已直接取得。本則所有票數、比值與引號內英文原文皆逐字比對自這三份文件，**未經任何媒體轉手**。
- **425 票為本站清點，非官方明列數字**：投票頁面未直接列出總投票數。本站下載官方 tally sheet 並清點以「V:」開頭的選票行，得 **425** 筆。投票率 40.7% 係以 425/1045 計算。撰稿時應標明此為依 tally sheet 清點所得，而非官方公布的統計值。
- **原文含兩處拼字錯誤，本則照錄**：決議原文的揭露條款寫作「We enourage our contributors to disclose whether a contribution was made with AI assitance」（正確拼法應為 encourage 與 assistance）。引用英文原文時保留原樣並可加註 sic；若翻成中文則不受影響。
- **一項容易誤植的歸因**：投票頁面上「LLM 的使用難以甚至不可能偵測」「這只是一份立場聲明」等說法，出自**落選的 Choice 6**「A cautious approach to generative AI」的提案文字，**不是勝出的 Choice 5**。這段話在網路上很容易被當成 Debian 的最終立場引用。撰稿時務必只引用 Choice 5 的原文。
- **媒體摘要與原文的差異，本則採原文**：Help Net Security（2026-08-31）的報導把政策整理為「三條有拘束力的條款」，這個歸納方向與原文相符，但原文並未以編號方式列出「三條」。本則採原文的段落原句，避免把媒體的整理結構寫成官方措辭。此外該報導稱投票「持續到 8 月 28 日」，本站可確認的是**結果公布日為 8 月 30 日**，投票截止日未在本站取得的文件中直接載明，因此本則只寫結果公布日。
- **選項標題有兩種寫法，兩者皆為官方頁面所用**：Choice 1 在選項區標題為「No LLM contributions to Debian via Social Contract」，在法定門檻與計算區則寫為「Ban LLM contributions from Debian via Social Contract」。兩者出自同一頁面，指同一選項，引用時擇一並保持前後一致即可。
- **這是 Debian 的內部治理決議，不是法律見解**：決議本身明言不處理著作權等未決法律問題。撰稿時不可把「Debian 不對 AI 產出的著作權表態」誤寫成「AI 產出沒有著作權問題」，兩者完全不同。
- **不宜過度外推**：Debian 是志願者專案，其治理結構（憲章、GR、Condorcet 投票）與企業的決策機制不同。本則的可移植部分是**政策內容**（責任歸屬、三條紅線、揭露的處理方式），不是**決策程序**。
- **與本站既有選題的關係**：本則**不重複**本期選題 1（前沿實驗室的能力分級與存取審查）——那則談的是模型供應商如何限制能力的流向，本則談的是使用端組織如何規範自己的貢獻者；也**不重複** 2026-08-03 與 2026-08-10 期關於 EU AI Act 的選題，那是法規強制義務，本則是社群自治規範。

### 原始來源網址
- 🏛 Debian 郵件列表：General resolution: LLM usage in Debian: Results（Kurt Roeckx，2026-08-30）
  https://lists.debian.org/debian-devel-announce/2026/08/msg00005.html
- 🏛 Debian 官方投票頁：2026 vote_002 — LLM usage in Debian（含選項全文、法定門檻、兩兩對決票數與勝者）
  https://www.debian.org/vote/2026/vote_002
- 🏛 Debian 官方 tally sheet（原始選票紀錄，本站據此清點 425 張選票）
  https://www.debian.org/vote/2026/vote_002_tally.txt
- 📰 Help Net Security：Debian developers rejected an LLM ban and left disclosure voluntary（2026-08-31）
  https://www.helpnetsecurity.com/2026/08/31/debian-linux-llm-policy/

### 各管道可直接使用草稿（中英雙語）

#### LinkedIn 草稿（中文版）
如果你正在寫公司的 AI 使用規範，這份文件值得你花二十分鐘讀原文。

Debian 專案秘書 Kurt Roeckx 在 8 月 30 日公布了一般決議 2026/vote_002「LLM usage in Debian」的結果。1045 名具投票權的開發者，實際投出 425 張選票，八個實質選項加上「以上皆非」。

結果是：沒有禁用，沒有強制揭露，但畫了三條有拘束力的紅線。

先講最容易被誤讀的部分——禁用案不是「以些微差距落敗」。

選項 1「透過社會契約禁止 LLM 貢獻」因為要修改 Debian 社會契約，需要 3:1 的絕對多數。官方計算式記下的比值是「0.560 (144/257)」，門檻是 3。它連 1:1 都沒到。

而選項 3「盡可能拒絕 LLM，並更新行為準則」只需要簡單多數，比值是「0.765 (176/230)」，門檻是 1，也沒過。

在一個一千多人的技術社群裡，兩個限制性最強的選項都沒有通過。

最後由選項 5「Responsible Use of Generative AI」以 Condorcet 勝出，Schwartz Set 裡只有它一個。它擊敗次名選項 2 是 203 對 148，對「以上皆非」是 281 對 126。

它勝出的原因不是最寬鬆，是最具體。

政策的核心是一句話：不管來源，管責任。原文寫得比多數企業內規都重——

「使用生成式 AI 工具，不減損貢獻者對其所提交作品的責任。貢獻者被期待要理解、審查、測試，並在適當時修改 AI 輔助的產出，然後才將其納入 Debian。盲目接受或上傳 AI 生成的材料而未經適當的人類審查，與 Debian 既有的開發實踐不相容。」

揭露則是「鼓勵，不強制」。原文：「我們鼓勵貢獻者揭露一項貢獻是否是在 AI 輔助下完成的，但不要求他們這麼做。」

三條紅線是這份文件最可以直接搬進企業內規的部分：

一、機密資訊、私人通訊、資安敏感資訊（原文明文舉例為「尚未公開的、被禁運的資安漏洞資訊」）、加密金鑰、憑證與其他非公開材料，未經明確授權不得提供給第三方 AI 服務。

二、大規模或自動化的專案行動——大量開 bug、大量送 patch、大規模程式碼修改——須先經適當管道討論取得共識，且該自動化流程須有一名對其行為與產出負責的人類監督。

三、專案不對 AI 產出的著作權歸屬表態，既有的授權與著作權規則照常適用。（注意：這是「不表態」，不是「沒有問題」。）

我覺得對企業最有價值的，是它逼你面對一個資源分配的選擇：

你要花力氣去要求並驗證「這段是不是 AI 寫的」，還是把資源放在「不管誰寫的，送出的人負全責」再加上幾條不可跨越的資料紅線？

Debian 用一千多人的投票選了後者。你不一定要同意，但這是目前唯一一份可以逐字讀、逐票查的答案。

（票數與計算式均取自 Debian 官方投票頁與 tally sheet；425 張選票為本人依 tally sheet 清點所得。）

#AIGovernance #OpenSource #AIPolicy #Debian #EngineeringLeadership

#### LinkedIn 草稿（English）
If you are drafting your organisation's AI usage policy, this document is worth twenty minutes on the original.

On 30 August, Debian Project Secretary Kurt Roeckx published the result of General Resolution 2026/vote_002, "LLM usage in Debian." With 1,045 eligible developers, 425 ballots were cast across eight substantive options plus "none of the above."

The outcome: no ban, no mandatory disclosure, and three binding red lines.

Start with the part that gets misread. The ban did not narrowly lose.

Option 1, "Ban LLM contributions from Debian via Social Contract," required a 3:1 supermajority because it would amend the Social Contract. The official calculation records a ratio of "0.560 (144/257)" against a threshold of 3. It did not even reach 1:1.

Option 3, "Reject LLMs as far as practical, update Code of Conduct," needed only a simple majority. Its line records a ratio of "0.765 (176/230)" against a threshold of 1. Also failed.

In a technical community of over a thousand people, both of the most restrictive options fell.

Option 5, "Responsible Use of Generative AI," won by Condorcet, alone in the Schwartz Set. It beat the runner-up, Option 2, by 203 to 148, and beat "none of the above" 281 to 126.

It won not for being the most permissive, but for being the most specific.

The core of the policy is one idea: govern responsibility, not provenance. The wording is heavier than most corporate policies manage:

"The use of a generative AI tool does not diminish the contributor's responsibility for the work they submit. Contributors are expected to understand, review, test, and, where appropriate, modify AI-assisted output before incorporating it into Debian. Blindly accepting or uploading AI-generated material without appropriate human review is inconsistent with Debian's established development practices."

Disclosure is encouraged, not required: "We enourage our contributors to disclose whether a contribution was made with AI assitance, but do not require them to do so." (sic, twice, in the original.)

The three red lines are the part you can lift into an internal policy almost unchanged:

One. Confidential information, private communications, security-sensitive information — the text specifically names "embargoed information about security bugs that is not yet public" — cryptographic keys, credentials and other non-public material must not be disclosed to third-party AI services unless that disclosure has been explicitly authorised.

Two. Actions with broad project impact — mass bug filing or patch submission, large-scale code modifications, other automated changes affecting many packages or contributors — require prior discussion and consensus through the appropriate channels, and any such automated process "should be overseen by a human who remains accountable for its behavior and output."

Three. The project takes no position on whether AI-generated output is copyrightable or derived from copyrighted works, and existing licensing and copyright rules continue to apply. Note what that is: no position, not no problem.

The most useful thing here for a company is that it forces a resource-allocation choice:

Do you spend effort requiring and verifying whether a given passage was AI-written, or do you put that effort into "whoever submits it owns it entirely" plus a short list of data red lines that cannot be crossed?

Debian put a thousand-plus-person vote behind the second answer. You do not have to agree — but this is currently the only answer you can read line by line and check vote by vote.

(All vote counts and calculations come from Debian's official vote page and tally sheet; the 425-ballot figure is my own count from the tally sheet.)

#AIGovernance #OpenSource #AIPolicy #Debian #EngineeringLeadership

#### Twitter / X 推文串（中文版）
1/ Debian 用投票決定了自己的 LLM 政策。8/30 公布結果：沒有禁用，沒有強制揭露，但畫了三條有拘束力的紅線。1045 名具投票權的開發者，實際投出 425 張選票，八個實質選項加「以上皆非」。

2/ 禁用案不是「險敗」。選項 1「透過社會契約禁止 LLM 貢獻」因涉及修改社會契約，需要 3:1 絕對多數。官方計算式記下的比值：「0.560 (144/257)」，門檻是 3。連 1:1 都沒到。

3/ 選項 3「盡可能拒絕 LLM 並更新行為準則」只需簡單多數，也沒過：比值「0.765 (176/230)」，門檻是 1。在一千多人的技術社群裡，兩個限制性最強的選項都倒了。

4/ 勝出的是選項 5「Responsible Use of Generative AI」，以 Condorcet 方式取勝，Schwartz Set 中只有它。對次名選項 2 是 203：148，對「以上皆非」是 281：126。它勝出不是因為最寬鬆，是因為最具體。

5/ 核心原則：不管來源，管責任。原文——「使用生成式 AI 工具，不減損貢獻者對其所提交作品的責任……盲目接受或上傳 AI 生成的材料而未經適當的人類審查，與 Debian 既有的開發實踐不相容。」

6/ 揭露條款原文：「我們鼓勵貢獻者揭露一項貢獻是否是在 AI 輔助下完成的，但不要求他們這麼做。」（英文原文含兩處拼字錯誤，引用時照錄並加註 sic。）

7/ 紅線一：機密資訊、私人通訊、資安敏感資訊（原文舉例為「尚未公開的、被禁運的資安漏洞資訊」）、加密金鑰、憑證與其他非公開材料，未經明確授權不得提供給第三方 AI 服務。

8/ 紅線二：大量開 bug、大量送 patch、大規模程式碼修改等影響廣泛的自動化行動，須先經適當管道討論取得共識，且須有一名對其行為與產出負責的人類監督。

9/ 紅線三：專案不對 AI 產出的著作權歸屬表態，既有授權與著作權規則照常適用。請注意這是「不表態」，不是「沒有問題」——這兩件事常被混寫。

10/ 提醒一個容易誤植的地方：網路上流傳的「LLM 使用難以甚至不可能偵測」這句，出自落選的選項 6，不是勝出的選項 5。引用前請對照原文。

11/ 對企業的實務價值：它逼你做一個資源分配選擇——花力氣驗證「這段是不是 AI 寫的」，還是把資源放在「送出的人負全責」加上幾條資料紅線？Debian 用一千多人的投票選了後者。這是目前唯一可以逐票查的答案。

#AIGovernance #OpenSource #AIPolicy #Debian

#### Twitter / X 推文串（English）
1/ Debian voted on its own LLM policy. Result published 30 Aug: no ban, no mandatory disclosure, three binding red lines. 1,045 eligible developers, 425 ballots cast, eight substantive options plus "none of the above."

2/ The ban did not narrowly lose. Option 1, "Ban LLM contributions from Debian via Social Contract," needed a 3:1 supermajority because it amends the Social Contract. Official line records a ratio of "0.560 (144/257)" against a threshold of 3. Not even 1:1.

3/ Option 3, "Reject LLMs as far as practical, update Code of Conduct," needed only a simple majority and also failed, with a ratio of "0.765 (176/230)" against a threshold of 1. Both of the most restrictive options fell in a community of over a thousand.

4/ Option 5, "Responsible Use of Generative AI," won by Condorcet, alone in the Schwartz Set. It beat runner-up Option 2 by 203–148 and "none of the above" by 281–126. It won for being the most specific, not the most permissive.

5/ Core principle: govern responsibility, not provenance. Verbatim: "The use of a generative AI tool does not diminish the contributor's responsibility for the work they submit... Blindly accepting or uploading AI-generated material without appropriate human review is inconsistent with Debian's established development practices."

6/ On disclosure: "We enourage our contributors to disclose whether a contribution was made with AI assitance, but do not require them to do so." Two typos are in the original — quote it sic.

7/ Red line one: confidential information, private communications, security-sensitive information — the text names "embargoed information about security bugs that is not yet public" — cryptographic keys, credentials and other non-public material must not go to third-party AI services without explicit authorisation.

8/ Red line two: mass bug filing, mass patch submission, large-scale code modifications and other broadly impactful automation require prior discussion and consensus, and "should be overseen by a human who remains accountable for its behavior and output."

9/ Red line three: the project takes no position on whether AI output is copyrightable or derived from copyrighted works, and existing licensing rules still apply. That is no position, not no problem — the two get conflated constantly.

10/ One attribution trap: the line circulating as "LLM usage can be hard if not impossible to detect" comes from Option 6, which lost. It is not the winning Option 5. Check the original before quoting.

11/ Why it matters for companies: it forces a resource-allocation choice — verify whether a passage was AI-written, or invest in "whoever submits it owns it entirely" plus a short list of hard data red lines? Debian put a thousand-plus-person vote behind the second. It is the only answer you can audit vote by vote.

#AIGovernance #OpenSource #AIPolicy #Debian

#### 部落格要點（中文版）
標題：不管來源，管責任——Debian 用 425 張選票決定的 LLM 政策，以及它為什麼值得企業照抄

• 事件：Debian 專案秘書 Kurt Roeckx 於 2026 年 8 月 30 日 11:07:57 +0200 在 debian-devel-announce 公布一般決議 2026/vote_002「LLM usage in Debian」的結果，勝出選項為 Choice 5「Responsible Use of Generative AI」
• 投票規模：官方投票頁載明具投票權開發者為 1045 人，法定門檻（3×Q）為 48.4897；本站依官方 tally sheet 清點實際選票為 425 張，投票率約 40.7%；八個實質選項全數達到法定門檻，得票數自選項 1 的 144 至選項 5 的 281
• 八個實質選項：禁止（經社會契約）、有條件允許、盡可能拒絕並更新行為準則、僅接受 Debian 特定工作的 AI 貢獻、負責任使用生成式 AI、對生成式 AI 採謹慎立場、Debian 由人類創造、因氣候破壞而避免使用 LLM；另有「以上皆非」
• 兩個限制性選項如何出局：選項 1 因修改社會契約而適用 3:1 絕對多數，其比值為「0.560 (144/257)」而門檻為 3；選項 3 僅需簡單多數，其比值為「0.765 (176/230)」而門檻為 1，兩者皆未通過多數要求
• 勝出過程：其餘選項通過多數要求後依 Condorcet 方法兩兩對決，選項 5 擊敗選項 2（203:148）、選項 4（232:115）、選項 6（210:130）、選項 7（251:139）、選項 8（244:154）與「以上皆非」（281:126）；官方載明 Schwartz Set 僅含選項 5
• 法律定位：決議依 Debian 憲章第 4.1(5) 條發出，性質為立場聲明，並明言該立場可隨時間演進而不需再訴諸未來的一般決議
• 核心立場：Debian 對生成式 AI 工具在軟體開發、維護與文件上的使用「既不背書也不禁止」，並認可負責任使用可顯著提升志願貢獻者的生產力
• 責任條款（本則最重的一句）：使用生成式 AI 工具不減損貢獻者對其提交作品的責任；貢獻者被期待理解、審查、測試並在適當時修改 AI 輔助的產出，然後才納入 Debian；盲目接受或上傳未經適當人類審查的 AI 生成材料，與 Debian 既有開發實踐不相容
• 揭露條款：鼓勵但不要求貢獻者揭露一項貢獻是否在 AI 輔助下完成（英文原文含 enourage 與 assitance 兩處拼字錯誤，引用時照錄並註 sic）
• 紅線一（資料）：機密資訊、私人通訊、資安敏感資訊（原文舉例為尚未公開的禁運資安漏洞資訊）、加密金鑰、憑證及其他關於 Debian 專案、其基礎設施或社群的非公開材料，未經明確授權且不符合 Debian 安全與隱私要求者，不得揭露給第三方 AI 服務
• 紅線二（自動化）：大量開 bug 或送 patch、大規模程式碼修改，以及其他影響眾多套件或貢獻者的自動化變更或請求，須先經適當專案管道討論並取得共識；任何此類自動化流程須有一名對其行為與產出負責的人類監督
• 紅線三（著作權）：專案不透過本決議解決 AI 產出的著作權、著作人身分、授權與訓練素材重製等未決法律爭議，也不對 AI 產出是否可受著作權保護表態；既有的授權、著作權、軟體自由與貢獻接受政策照常適用
• 結論句：本決議確認生成式 AI 既不豁免於、也不額外受制於 Debian 貢獻者既有標準之外的特別規則
• 對企業的可移植部分：政策內容（責任歸屬、三條紅線、揭露的處理方式）可直接參考；治理程序（憲章、GR、Condorcet）屬 Debian 特有，不宜外推
• 引用紀律一：425 張選票為本站依官方 tally sheet 清點，非官方公布統計值；投票截止日未在本站取得文件中直接載明，故僅引用結果公布日 8 月 30 日
• 引用紀律二：「LLM 使用難以甚至不可能偵測」等說法出自落選的選項 6 提案文字，不是勝出的選項 5，切勿混用
• 引用紀律三：「不對著作權表態」不等於「沒有著作權問題」，兩者不可互換

#AIGovernance #OpenSource #AIPolicy #Debian

#### 部落格要點（English）
Title: Govern responsibility, not provenance — the LLM policy Debian decided with 425 ballots, and why companies should read it

• The event: on 30 August 2026 at 11:07:57 +0200, Debian Project Secretary Kurt Roeckx published the result of General Resolution 2026/vote_002, "LLM usage in Debian", on debian-devel-announce. The winning option was Choice 5, "Responsible Use of Generative AI"
• Scale of the vote: the official vote page records 1,045 eligible developers and a quorum (3×Q) of 48.4897. Counting the official tally sheet gives 425 ballots cast, a turnout of roughly 40.7%. All eight substantive options cleared quorum, from Option 1 at 144 votes to Option 5 at 281
• The eight substantive options: ban via the Social Contract; allow AI-assisted contributions with conditions; reject LLMs as far as practical and update the Code of Conduct; accept AI contributions for Debian-specific work; responsible use of generative AI; a cautious approach to generative AI; Debian is created by humans; avoid LLMs because climate destruction is a deal breaker — plus "none of the above"
• How the restrictive options fell: Option 1 required a 3:1 supermajority because it would amend the Social Contract, and the official calculation records a ratio of "0.560 (144/257)" against a threshold of 3. Option 3 needed only a simple majority and still failed with a ratio of "0.765 (176/230)" against a threshold of 1
• How the winner emerged: the remaining options passed their majority requirements and were then compared pairwise under Condorcet. Option 5 beat Option 2 (203–148), Option 4 (232–115), Option 6 (210–130), Option 7 (251–139), Option 8 (244–154) and "none of the above" (281–126). The page records that the Schwartz Set contains Option 5 alone
• Legal standing: the resolution is issued under Debian Constitution section 4.1(5) as a position statement, and says explicitly that the position "may evolve as time passes without the need to resort to future general resolutions"
• The core stance: Debian "neither endorses nor prohibits the use of generative AI tools in the development, maintenance, or documentation of software, packaging, documentation, and other media published within the Debian Project", recognising that responsible use can substantially improve volunteer productivity
• The responsibility clause, which is the heaviest sentence in the document: "The use of a generative AI tool does not diminish the contributor's responsibility for the work they submit. Contributors are expected to understand, review, test, and, where appropriate, modify AI-assisted output before incorporating it into Debian. Blindly accepting or uploading AI-generated material without appropriate human review is inconsistent with Debian's established development practices."
• The disclosure clause: "We enourage our contributors to disclose whether a contribution was made with AI assitance, but do not require them to do so." Both misspellings are in the original — quote it sic
• Red line one, data: confidential information, private communications, security-sensitive information such as "embargoed information about security bugs that is not yet public", cryptographic keys, credentials and other non-public material relating to the project, its infrastructure or its community must not be disclosed to third-party AI services "unless such disclosure has been explicitly authorized and is consistent with Debian's security and privacy requirements"
• Red line two, automation: mass bug filing or patch submission, large-scale code modifications and other automated changes or requests affecting many packages or contributors "should seek prior discussion and consensus through the appropriate project channels before proceeding", and "any such automated process should be overseen by a human who remains accountable for its behavior and output"
• Red line three, copyright: the project does not seek to resolve unsettled questions of copyright, authorship, licensing and reproduction of training material through this resolution, "nor does it adopt a position on whether AI-generated output is, in whole or in part, copyrightable or derived from copyrighted works", and existing licensing, copyright, software freedom and contribution policies continue to apply
• The closing affirmation: generative AI is "neither exempt from nor subject to special rules beyond the standards already expected of Debian contributors"
• What transfers to a company: the policy content — responsibility allocation, the three red lines, and the treatment of disclosure. The governance process — constitution, General Resolution, Condorcet voting — is specific to Debian and should not be extrapolated
• Citation discipline one: the 425-ballot figure is counted from the official tally sheet rather than published as an official statistic, and the voting deadline is not stated in the documents obtained, so only the 30 August result date is cited here
• Citation discipline two: lines circulating as Debian's position, such as "LLM usage can be hard if not impossible to detect", come from the losing Option 6 proposal text, not from the winning Option 5
• Citation discipline three: "takes no position on copyright" is not "there is no copyright problem" — the two are not interchangeable

#AIGovernance #OpenSource #AIPolicy #Debian

#### 新聞簡報 / 簡訊（中文版）
Debian 專案秘書 Kurt Roeckx 於 2026 年 8 月 30 日公布一般決議 2026/vote_002「LLM usage in Debian」的結果，勝出選項為 Choice 5「Responsible Use of Generative AI」。官方投票頁載明具投票權開發者 1045 人、法定門檻 48.4897，本站依官方 tally sheet 清點實際選票 425 張（投票率約 40.7%），八個實質選項全數達到法定門檻。兩個限制性最強的選項均未通過多數要求：選項 1「透過社會契約禁止 LLM 貢獻」因涉及修改社會契約而適用 3:1 絕對多數，其比值為「0.560 (144/257)」而門檻為 3；選項 3「盡可能拒絕 LLM 並更新行為準則」僅需簡單多數，其比值為「0.765 (176/230)」而門檻為 1。其餘選項依 Condorcet 方法兩兩對決，選項 5 擊敗次名選項 2（203:148）並對「以上皆非」取得 281:126，官方載明 Schwartz Set 僅含選項 5。決議依 Debian 憲章第 4.1(5) 條發出，性質為可隨時間演進的立場聲明。內容上，Debian 對生成式 AI「既不背書也不禁止」，但把責任完整留在貢獻者身上：使用 AI 工具不減損貢獻者對其提交作品的責任，貢獻者須理解、審查、測試並在適當時修改 AI 輔助產出，盲目接受或上傳未經人類審查的 AI 生成材料與 Debian 既有開發實踐不相容。揭露為「鼓勵但不要求」。三條有拘束力的紅線分別是：機密資訊、私人通訊、資安敏感資訊（原文舉例為尚未公開的禁運漏洞資訊）、加密金鑰與憑證等非公開材料，未經明確授權不得提供給第三方 AI 服務；大量開 bug、大量送 patch、大規模程式碼修改等影響廣泛的自動化行動須先取得共識並由一名負責的人類監督；專案不對 AI 產出的著作權歸屬表態，既有授權與著作權規則照常適用。三點引用紀律：425 票為本站清點而非官方統計值；網路流傳的「LLM 使用難以偵測」出自落選的選項 6 而非勝出選項 5；「不對著作權表態」不等於「沒有著作權問題」。對企業而言，可移植的是政策內容（責任歸屬、三條紅線、揭露處理），而非 Debian 特有的治理程序。主要來源：Debian 郵件列表公告（8/30）、Debian 官方投票頁與 tally sheet、Help Net Security（8/31）。

#AIGovernance #OpenSource #AIPolicy #Debian

#### 新聞簡報 / 簡訊（English）
On 30 August 2026, Debian Project Secretary Kurt Roeckx published the result of General Resolution 2026/vote_002, "LLM usage in Debian", with Choice 5, "Responsible Use of Generative AI", winning. The official vote page records 1,045 eligible developers and a quorum of 48.4897; counting the official tally sheet gives 425 ballots cast, a turnout of roughly 40.7%, and all eight substantive options cleared quorum. Both of the most restrictive options failed their majority requirements: Option 1, banning LLM contributions via the Social Contract, required a 3:1 supermajority as a Social Contract amendment and the official line records a ratio of "0.560 (144/257)" against a threshold of 3; Option 3, rejecting LLMs as far as practical and updating the Code of Conduct, needed only a simple majority and still failed with a ratio of "0.765 (176/230)" against a threshold of 1. The remaining options were compared pairwise under Condorcet, with Option 5 beating runner-up Option 2 by 203–148 and "none of the above" by 281–126, and the page recording that the Schwartz Set contains Option 5 alone. The resolution is issued under Constitution section 4.1(5) as a position statement that may evolve without a further General Resolution. Substantively, Debian "neither endorses nor prohibits" generative AI but places responsibility entirely on the contributor: using such a tool "does not diminish the contributor's responsibility for the work they submit", contributors must "understand, review, test, and, where appropriate, modify AI-assisted output", and blindly accepting or uploading unreviewed AI-generated material "is inconsistent with Debian's established development practices". Disclosure is encouraged but not required. The three binding red lines are: confidential information, private communications, security-sensitive information such as "embargoed information about security bugs that is not yet public", cryptographic keys, credentials and other non-public material must not go to third-party AI services without explicit authorisation; mass bug filing or patch submission, large-scale code modifications and similar broadly impactful automation require prior discussion and consensus and "should be overseen by a human who remains accountable for its behavior and output"; and the project takes no position on whether AI-generated output is copyrightable, with existing licensing and copyright rules continuing to apply. Three points of citation discipline: the 425-ballot figure is counted from the tally sheet rather than officially published; the line circulating as "LLM usage can be hard if not impossible to detect" belongs to the losing Option 6, not the winning Option 5; and "takes no position on copyright" is not "there is no copyright problem". For companies, what transfers is the policy content — responsibility allocation, the three red lines and the treatment of disclosure — not Debian's own governance machinery. Sources: Debian mailing list announcement (30 Aug), Debian official vote page and tally sheet, Help Net Security (31 Aug).

#AIGovernance #OpenSource #AIPolicy #Debian
