#!/usr/bin/env node
/**
 * Structural validation for the WeeklySocialMediaIdea archive site.
 *
 * Guards the invariants that a routine-generated issue can silently break:
 * shared assets, per-issue markup, source grading, and — most importantly —
 * the data-post-id keys that the user's "used / effect" records are stored
 * under. A duplicated or renamed post-id silently loses their tracking data.
 *
 * Usage: node scripts/validate-site.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => readFileSync(path.join(root, p), 'utf8');
const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };

const index = read('index.html');
const archive = read('archive.html');
const pages = { 'index.html': index, 'archive.html': archive };

/* ---------- 1. shared assets and protected elements ---------- */
for (const [name, html] of Object.entries(pages)) {
  check(/<link rel="stylesheet" href="assets\/site\.css">/.test(html),
    `${name}: must link the shared stylesheet assets/site.css`);
  check(!/<style[\s>]/.test(html),
    `${name}: must not reintroduce an inline <style> block`);
  check(/<script src="assets\/app\.js"><\/script>/.test(html),
    `${name}: must load the shared script assets/app.js`);
  check(/http-equiv="Content-Security-Policy"/.test(html),
    `${name}: CSP meta tag is missing`);
  check(/<meta name="referrer"/.test(html),
    `${name}: referrer policy meta tag is missing`);
  check(/id="sync-btn"/.test(html) && /id="sync-cfg"/.test(html),
    `${name}: sync controls (#sync-btn / #sync-cfg) are missing`);
  const avatars = [...html.matchAll(/class="avatar" data-char="([a-z]+)"/g)].map((m) => m[1]);
  check(avatars.length === 7,
    `${name}: expected 7 header avatars, found ${avatars.length}`);
  check(new Set(avatars).size === avatars.length,
    `${name}: duplicate data-char values in the avatar row`);
}
check(read('assets/site.css').length > 3000, 'assets/site.css looks truncated');
check(/id="fx-rollup"/.test(index), 'index.html: the #fx-rollup container is missing');
check(/id="fx-rollup"><\/div>/.test(index),
  'index.html: #fx-rollup must stay empty — app.js fills it in');

/* ---------- 2. current issue ---------- */
const cards = [...index.matchAll(/<article class="week-card">([\s\S]*?)<\/article>/g)];
check(cards.length === 1, `index.html: expected exactly 1 week-card, found ${cards.length}`);
const current = cards[0]?.[1] ?? '';

check((current.match(/class="week-label"/g) || []).length === 1,
  'index.html: the current issue needs exactly one 最新一期 label');

const dateText = current.match(/<div class="week-date">(\d{4}) 年 (\d{1,2}) 月 (\d{1,2}) 日/);
check(Boolean(dateText), 'index.html: week-date heading is missing or malformed');
const edition = dateText
  ? `${dateText[1]}-${String(dateText[2]).padStart(2, '0')}-${String(dateText[3]).padStart(2, '0')}`
  : null;
const editionKey = edition?.replaceAll('-', '');

// topics never nest, so splitting on the opening tag is unambiguous
const topics = current.split('<div class="topic">').slice(1);
check(topics.length >= 2 && topics.length <= 4,
  `index.html: expected 2-4 topics, found ${topics.length}`);

/* ---------- 3. channels and post-id integrity ---------- */
const channelRe = /<details class="channel" data-post-id="([^"]+)">([\s\S]*?)<\/details>/g;
const currentChannels = [...current.matchAll(channelRe)];
check(currentChannels.length === topics.length * 4,
  `index.html: expected ${topics.length * 4} channels (topics x 4), found ${currentChannels.length}`);

const seen = new Map();
const collectIds = (html, where) => {
  for (const [, id] of html.matchAll(/data-post-id="([^"]+)"/g)) {
    if (seen.has(id)) {
      errors.push(`duplicate data-post-id "${id}" (${seen.get(id)} and ${where}) — user records would collide`);
    }
    seen.set(id, where);
  }
};
collectIds(index, 'index.html');
collectIds(archive, 'archive.html');

for (const [, id, body] of currentChannels) {
  check(new RegExp(`^${editionKey}-t[1-4]-(li|x|blog|nl)$`).test(id),
    `bad post-id "${id}" — expected ${editionKey}-tN-{li|x|blog|nl}`);
  const langs = [...body.matchAll(/<div class="lang-block">([\s\S]*?)<\/div>\s*<\/div>/g)];
  check((body.match(/class="lang-block"/g) || []).length === 2,
    `${id}: expected 2 language blocks (中文版 / English)`);
  check((body.match(/class="copy-btn"/g) || []).length === 2,
    `${id}: each language block needs its own copy button`);
  check((body.match(/class="hashtags"/g) || []).length === 2,
    `${id}: both language versions must end with a hashtags block`);
  check(/class="used-flag"/.test(body), `${id}: used-flag badge is missing`);
  check(/class="used-btn"/.test(body), `${id}: used-btn is missing`);
  void langs;
}

/* ---------- 4. source grading ---------- */
const TIERS = { '🏛': 'official', '📰': 'media', '📡': 'aggregator' };
const tally = { official: 0, media: 0, aggregator: 0 };
topics.forEach((topic, i) => {
  const tags = [...topic.matchAll(/<a class="source-tag"([^>]*)>([^<]+)<\/a>/g)];
  check(tags.length >= 2, `topic ${i + 1}: needs at least 2 sources, found ${tags.length}`);
  let strong = 0;
  for (const [, attrs, text] of tags) {
    check(/target="_blank"/.test(attrs) && /rel="noopener"/.test(attrs),
      `topic ${i + 1}: source "${text.trim()}" must use target=_blank + rel=noopener`);
    const tier = TIERS[[...text][0]];
    check(Boolean(tier),
      `topic ${i + 1}: source "${text.trim()}" is missing a 🏛/📰/📡 grade prefix`);
    if (tier) {
      tally[tier] += 1;
      if (tier !== 'aggregator') strong += 1;
    }
  }
  check(strong >= 1, `topic ${i + 1}: needs at least one 🏛 or 📰 source`);
});

/* ---------- 5. summary panel must match reality ---------- */
const stat = (label) => {
  const m = index.match(new RegExp(`<div class="stat"><b>(\\d+)</b><span>${label}[^<]*</span></div>`));
  return m ? Number(m[1]) : null;
};
const declared = {
  topics: stat('本期選題'),
  official: stat('🏛 官方來源'),
  media: stat('📰 一線媒體'),
  aggregator: stat('📡 聚合/部落格'),
  drafts: stat('可複製雙語草稿'),
};
check(declared.topics === topics.length,
  `summary: declares ${declared.topics} topics but the page has ${topics.length}`);
for (const tier of ['official', 'media', 'aggregator']) {
  check(declared[tier] === tally[tier],
    `summary: declares ${declared[tier]} ${tier} sources but the page has ${tally[tier]}`);
}
check(declared.drafts === topics.length * 8,
  `summary: declares ${declared.drafts} drafts but topics x 4 channels x 2 languages = ${topics.length * 8}`);

/* ---------- 6. archive integrity ---------- */
check(!/class="week-label"/.test(archive),
  'archive.html: past issues must not keep the 最新一期 label');
check((archive.match(/<article class="week-card">/g) || []).length >= 1,
  'archive.html: should accumulate at least one past issue');

/* ---------- 7. markdown files carry the full drafts ---------- */
if (edition) {
  const md = readdirSync(root).filter((f) => f.startsWith(`${edition}-topic`) && f.endsWith('.md'));
  check(md.length === topics.length,
    `expected ${topics.length} markdown files for ${edition}, found ${md.length}`);
  for (const file of md) {
    const text = readFileSync(path.join(root, file), 'utf8');
    check(text.length > 4000, `${file}: looks like an outline, not the full drafts`);
    check((text.match(/^#### .*（中文版）$/gm) || []).length === 4,
      `${file}: expected 4 Chinese channel drafts`);
    check((text.match(/^#### .*（English）$/gm) || []).length === 4,
      `${file}: expected 4 English channel drafts`);
    check(/### 原始來源網址/.test(text), `${file}: source URL section is missing`);
  }
}

/* ---------- report ---------- */
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(
  `✓ ${edition}: ${topics.length} topics, ${currentChannels.length} channels, ` +
  `${seen.size} unique post-ids, sources ${tally.official}🏛/${tally.media}📰/${tally.aggregator}📡, ` +
  `shared assets and markdown drafts all intact.`
);
if (!existsSync(path.join(root, 'assets', 'app.js'))) process.exit(1);
