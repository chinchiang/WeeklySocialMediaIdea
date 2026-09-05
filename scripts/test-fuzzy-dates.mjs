#!/usr/bin/env node
import { fuzzyDates } from './fuzzy-dates.mjs';

const shouldReject = [
  '來源發布於 8 月底',
  '報告在 8月中發布',
  '公告時間為八月初',
  '更新發生於８月份下旬',
  'released in late August',
  'released in late–August',
  'released in Mid‑March',
];

const shouldAllow = [
  '發布日期為 2026 年 8 月 30 日',
  '8 月中華電信發布報告',
  'mid-market security products',
  'https://example.com/late-August-report',
  'Use `late August` only as an example of wording to avoid.',
];

const failures = [];
for (const text of shouldReject) {
  if (fuzzyDates(text).length === 0) failures.push(`expected rejection: ${text}`);
}
for (const text of shouldAllow) {
  const hits = fuzzyDates(text);
  if (hits.length > 0) failures.push(`unexpected rejection: ${text} -> ${hits.join(', ')}`);
}

if (failures.length > 0) {
  console.error(`✗ fuzzy-date regression failures:\n${failures.map((item) => `  - ${item}`).join('\n')}`);
  process.exit(1);
}
console.log(`✓ fuzzy-date regression cases: ${shouldReject.length} reject / ${shouldAllow.length} allow.`);
