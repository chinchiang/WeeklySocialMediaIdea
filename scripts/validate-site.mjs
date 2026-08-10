#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const index = readFileSync(path.join(root, "index.html"), "utf8");
const archive = readFileSync(path.join(root, "archive.html"), "utf8");
const app = readFileSync(path.join(root, "assets", "app.js"), "utf8");
const css = readFileSync(path.join(root, "assets", "style.css"), "utf8");
const currentMatch = index.match(/<article class="week-card" data-edition="(\d{4}-\d{2}-\d{2})">([\s\S]*?)<\/article>/);
const currentEdition = currentMatch?.[1];
const current = currentMatch?.[2];

assert.ok(current, "current edition should have a machine-readable data-edition");
for (const [name, html] of [["index", index], ["archive", archive]]) {
  assert.match(html, /<link rel="stylesheet" href="assets\/style\.css">/, `${name} should load the shared stylesheet`);
  assert.doesNotMatch(html, /<style[\s>]/, `${name} should not duplicate inline CSS`);
}
assert.ok(css.length > 5_000, "shared stylesheet should contain the complete site design");

const sourcePattern = /<a class="source-tag"([^>]*) href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
const sources = [...current.matchAll(sourcePattern)].map((match) => {
  const attributes = match[1];
  const attr = (name) => attributes.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";
  return {
    tier: attr("data-source-tier"),
    verification: attr("data-verification"),
    date: attr("data-date"),
    claim: attr("data-claim"),
    host: new URL(match[2]).hostname,
    text: match[3],
  };
});

assert.ok(sources.length >= 6, "current edition should have an explicit source inventory");
for (const source of sources) {
  assert.match(source.tier, /^(official|media|aggregator)$/, `${source.text}: invalid source tier`);
  assert.match(source.verification, /^(original|search)$/, `${source.text}: invalid verification level`);
  assert.match(source.date, /^\d{4}-\d{2}-\d{2}$/, `${source.text}: exact ISO publication date required`);
}
assert.doesNotMatch(current, /\d{1,2}\s*月(?:初|中|底)|\b(?:early|mid|late)\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i, "fuzzy dates are not allowed in the current edition");

const claimGroups = new Map();
for (const source of sources.filter((item) => item.claim)) {
  if (!claimGroups.has(source.claim)) claimGroups.set(source.claim, new Set());
  claimGroups.get(source.claim).add(source.host);
}
assert.ok(claimGroups.size >= 3, "each current topic should expose at least one cross-checked critical claim");
for (const [claim, hosts] of claimGroups) {
  assert.ok(hosts.size >= 2, `${claim} should have at least two independent source hosts`);
}
const crossCheckedTopics = [...current.matchAll(/<div class="topic" data-cross-checked="true">([\s\S]*?)(?=<div class="topic"|$)/g)].map((match) => match[1]);
assert.equal(crossCheckedTopics.length, 3);
for (const [index, topic] of crossCheckedTopics.entries()) {
  const topicClaims = new Map();
  for (const match of topic.matchAll(/data-claim="([^"]+)" href="([^"]+)"/g)) {
    if (!topicClaims.has(match[1])) topicClaims.set(match[1], new Set());
    topicClaims.get(match[1]).add(new URL(match[2]).hostname);
  }
  assert.ok([...topicClaims.values()].some((hosts) => hosts.size >= 2), `topic ${index + 1} should cross-check a critical claim with two independent hosts`);
}
assert.equal((current.match(/class="verification-note"/g) || []).length, 3);

const qualitySources = sources.filter((source) => /^(official|media)$/.test(source.tier));
const displayedQuality = Number(index.match(/id="quality-source-count">(\d+)</)?.[1]);
assert.equal(displayedQuality, qualitySources.length, "quality source metric should match structured source tiers");

assert.match(app, /function setOutcome\(/, "outcome state should be supported");
assert.match(app, /className = 'outcome-control'/, "outcome UI should be generated for every channel");
assert.match(app, /state\.version = 2/, "Gist/local state schema should be versioned");
assert.match(index, /id="effect-summary-text"/, "homepage should display accumulated outcome feedback");

const currentMarkdown = readdirSync(root).filter((name) => name.startsWith(`${currentEdition}-topic`) && name.endsWith(".md"));
assert.equal(currentMarkdown.length, 3, `${currentEdition} should have three topic Markdown files`);
for (const filename of currentMarkdown) {
  const markdown = readFileSync(path.join(root, filename), "utf8");
  assert.match(markdown, /## 完整中英雙語四管道草稿/);
  assert.equal((markdown.match(/^### .+$/gm) || []).filter((line) => /LinkedIn|Twitter|部落格|新聞簡報/.test(line)).length, 4);
  assert.equal((markdown.match(/^#### 中文版$/gm) || []).length, 4);
  assert.equal((markdown.match(/^#### English$/gm) || []).length, 4);
  assert.doesNotMatch(markdown, /\d{1,2}\s*月(?:初|中|底)|\b(?:early|mid|late)\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
  assert.ok(markdown.length > 6_000, `${filename} should retain the full drafts, not only an outline`);
}

console.log(`Validated shared CSS, ${sources.length} structured sources, ${claimGroups.size} cross-checked claims, outcome feedback, and full Markdown drafts.`);
