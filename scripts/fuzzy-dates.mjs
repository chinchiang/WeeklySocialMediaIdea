// Shared approximate-date detection for the current-issue publication gate.
// This is intentionally a defence-in-depth list of known risky forms, not a
// natural-language parser.

const MONTH_TOKEN = '(?:[0-9０-９]{1,2}|[一二三四五六七八九十]{1,3})\\s*月(?:份\\s*)?';
const MONTH_NAME = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
const DASH_OR_SPACE = '[-\\s\\u2010-\\u2015\\u2212]';

const FUZZY = [
  new RegExp(`${MONTH_TOKEN}(?:初|底|末|上旬|中旬|下旬)`, 'g'),
  // Bare 月中 is ambiguous in Chinese. Match punctuation/spacing and common
  // date-following verbs, while keeping names such as 「8 月中華電信」 safe.
  new RegExp(`${MONTH_TOKEN}中(?=$|[\\s，。；、：,.!?！？）)\\]】]|(?:發布|開始|確認|推出|公告|揭露|發生|完成|上線|遭|進行|前|後))`, 'g'),
  new RegExp(`\\b(?:early|mid|late)${DASH_OR_SPACE}${MONTH_NAME}\\b`, 'gi'),
];

const stripIgnored = (text) => text
  .replace(/<!--[\\s\\S]*?-->/g, ' ')
  .replace(/<code[\\s>][\\s\\S]*?<\\/code>/gi, ' ')
  .replace(/```[\\s\\S]*?```/g, ' ')
  .replace(/`[^`\\n]*`/g, ' ')
  .replace(/https?:\\/\\/[^\\s<>"')\\]]+/gi, ' ');

export const fuzzyDates = (text) => {
  const searchable = stripIgnored(text);
  return [...new Set(FUZZY.flatMap((re) =>
    [...searchable.matchAll(re)].map((match) => match[0])
  ))];
};
