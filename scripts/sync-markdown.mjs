#!/usr/bin/env node

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const html = readFileSync(path.join(root, "index.html"), "utf8");
const checkOnly = process.argv.includes("--check");
const edition = html.match(/<article class="week-card" data-edition="(\d{4}-\d{2}-\d{2})">/)?.[1];
if (!edition) throw new Error("index.html should identify its current edition with data-edition");
const editionKey = edition.replaceAll("-", "");
const files = {};
for (let topic = 1; topic <= 3; topic += 1) {
  const matches = readdirSync(root).filter((name) => name.startsWith(`${edition}-topic${topic}-`) && name.endsWith(".md"));
  if (matches.length !== 1) throw new Error(`expected one Markdown file for ${edition} topic ${topic}, found ${matches.length}`);
  files[topic] = matches[0];
}

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function toMarkdown(value) {
  return decode(value)
    .replace(/<strong>/g, "**")
    .replace(/<\/strong>/g, "**")
    .replace(/<div class="hashtags">/g, "\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function channelDrafts(topic) {
  const detailPattern = new RegExp(
    `<details class="channel" data-post-id="${editionKey}-t${topic}-(li|x|blog|nl)">([\\s\\S]*?)<\\/details>`,
    "g",
  );
  const channels = [];
  for (const match of html.matchAll(detailPattern)) {
    const block = match[2];
    const label = toMarkdown(block.match(/<summary>([\s\S]*?)<span/)[1]);
    const starts = [...block.matchAll(/<div class="lang-block">/g)].map((item) => item.index);
    const actionIndex = block.indexOf('<div class="post-actions">');
    const languages = starts.map((start, index) => {
      const end = starts[index + 1] ?? actionIndex;
      const segment = block.slice(start, end);
      const language = toMarkdown(segment.match(/<span class="lang-tag">([\s\S]*?)<\/span>/)[1]);
      const marker = '<div class="draft-text">';
      const body = segment.slice(segment.indexOf(marker) + marker.length);
      return { language, body: toMarkdown(body) };
    });
    if (languages.length !== 2) throw new Error(`${match[1]} should contain two language blocks`);
    channels.push({ label, languages });
  }
  if (channels.length !== 4) throw new Error(`topic ${topic} should contain four channels`);
  return channels;
}

function generatedSection(topic) {
  const parts = ["## 完整中英雙語四管道草稿"];
  for (const channel of channelDrafts(topic)) {
    parts.push(`### ${channel.label}`);
    for (const language of channel.languages) {
      parts.push(`#### ${language.language}\n\n${language.body}`);
    }
  }
  return `${parts.join("\n\n")}\n`;
}

let mismatches = 0;
for (const [topic, filename] of Object.entries(files)) {
  const filePath = path.join(root, filename);
  const current = readFileSync(filePath, "utf8");
  const base = current
    .split("\n## 完整中英雙語四管道草稿")[0]
    .replace(/\n*（完整中英雙語四管道草稿見 index\.html \/ archive\.html 網站卡片）\s*$/, "")
    .trimEnd();
  const expected = `${base}\n\n${generatedSection(Number(topic))}`;
  if (current !== expected) {
    if (checkOnly) {
      console.error(`${filename} is not synchronized with index.html`);
      mismatches += 1;
    } else {
      writeFileSync(filePath, expected, "utf8");
      console.log(`updated ${filename}`);
    }
  }
}

if (mismatches) process.exit(1);
if (checkOnly) console.log("Markdown drafts are synchronized with index.html.");
