#!/usr/bin/env node
/**
 * Verify that every bilingual draft shown on the site is also archived verbatim
 * in the corresponding topic markdown file.
 *
 * The site card and the markdown file are written separately, so they can drift:
 * a markdown file can silently degrade into an outline, or a late edit to a draft
 * on the page can leave the archived copy stale. This check makes that visible.
 *
 * Usage: node scripts/sync-markdown.mjs --check
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const index = readFileSync(path.join(root, 'index.html'), 'utf8');

const card = index.match(/<article class="week-card">([\s\S]*?)<\/article>/)?.[1];
if (!card) {
  console.error('✗ index.html: no week-card found');
  process.exit(1);
}
const d = card.match(/<div class="week-date">(\d{4}) 年 (\d{1,2}) 月 (\d{1,2}) 日/);
if (!d) {
  console.error('✗ index.html: could not read the issue date');
  process.exit(1);
}
const edition = `${d[1]}-${String(d[2]).padStart(2, '0')}-${String(d[3]).padStart(2, '0')}`;

const decode = (s) => s
  .replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
// compare on content only: tags stripped, all whitespace collapsed
const normalize = (s) => decode(s).replace(/<[^>]+>/g, '').replace(/\s+/g, '').trim();

const files = readdirSync(root).filter((f) => f.startsWith(`${edition}-topic`) && f.endsWith('.md'));
const errors = [];
let compared = 0;

for (const [, id, body] of card.matchAll(
  /<details class="channel" data-post-id="([^"]+)">([\s\S]*?)<\/details>/g
)) {
  const topicNo = id.match(/-t(\d)-/)?.[1];
  const file = files.find((f) => f.startsWith(`${edition}-topic${topicNo}-`));
  if (!file) {
    errors.push(`${id}: no markdown file matching ${edition}-topic${topicNo}-*.md`);
    continue;
  }
  const markdown = normalize(readFileSync(path.join(root, file), 'utf8'));
  const drafts = [...body.matchAll(/<div class="draft-text">([\s\S]*?)<\/div>\s*<\/div>/g)];
  if (drafts.length !== 2) {
    errors.push(`${id}: expected 2 draft bodies on the page, found ${drafts.length}`);
    continue;
  }
  drafts.forEach(([, raw], i) => {
    const lang = i === 0 ? '中文版' : 'English';
    const text = normalize(raw);
    compared += 1;
    if (text.length < 40) {
      errors.push(`${id} (${lang}): draft on the page looks empty`);
    } else if (!markdown.includes(text)) {
      errors.push(`${id} (${lang}): draft on the page is missing from ${file} — site and archive have drifted`);
    }
  });
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${edition}: all ${compared} bilingual drafts match their markdown archive (${files.length} files).`);
