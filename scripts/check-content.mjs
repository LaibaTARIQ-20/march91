// scripts/check-content.mjs
// Project guard-rails for March '91. Run with: npm run check:content
// Fails (exit 1) on anything that breaks the content, brand or code rules.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

// ---- Rules you edit on purpose -------------------------------------------

/** Every `author:` in src/content/articles.ts must be in this list. */
const ALLOWED_AUTHORS = [
  "Anusha Khan",
  "Sarah Rameen Qureshi",
  "Sarim Khan Lodhi",
  "Hadeed Bashir",
  "Ameed Irfan",
  "Faiza Majeed",
  "Ifrah",
  "Iraj Nowsherwan",
  "Muhammad Shameer Shaheedi",
];

/** Text that came from tools or mockups, not from Sarah. Case-insensitive. */
const BANNED_TEXT = [
  "style desk",
  "banana bread",
  "kharbuza",
  "sada jewel",
  "ice cream",
  "orientation week",
  "marcoms society",
  "campus athletics",
  "issue no. 2",
  "lorem ipsum",
  "est. 2026",
  "the independent student magazine",
  // placeholder items from the homepage mockup, not Sarah's content
  "weekly nust news",
  "campus scoop",
  "community service club",
  "ncsc",
  "ranking nust cafeterias",
  "s3h film circle",
  "letterboxd lore",
];

/** Colours are allowed only inside this file (the @theme tokens). */
const TOKEN_FILE = join("src", "app", "globals.css");

const MAX_COMPONENT_LINES = 250;

// ---- Helpers -------------------------------------------------------------

const errors = [];
const warnings = [];
const rel = (p) => relative(ROOT, p).split(sep).join("/");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function scan(file, text, regex, report) {
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(line)) !== null) {
      report(`${rel(file)}:${i + 1}`, m[0], m);
      if (m[0] === "") regex.lastIndex++;
    }
  });
}

const files = walk(SRC).filter((f) => /\.(ts|tsx|css)$/.test(f));
const codeFiles = files.filter((f) => /\.(ts|tsx)$/.test(f));

// ---- 1. Colours: tokens only ---------------------------------------------

const HEX = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;
const PALETTE =
  /\b(?:bg|text|border|from|to|via|ring|fill|stroke|divide|outline|decoration|accent|caret)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}\b/g;

for (const f of files) {
  const text = readFileSync(f, "utf8");
  if (rel(f) !== TOKEN_FILE.split(sep).join("/")) {
    scan(f, text, HEX, (at, hit) =>
      errors.push(`${at}  hard-coded colour ${hit} (use a token from globals.css)`)
    );
  }
  scan(f, text, PALETTE, (at, hit) =>
    errors.push(`${at}  Tailwind palette class "${hit}" (use navy, cream, gold, ink, muted, line)`)
  );
}

// ---- 2. Print look: square corners, no shadows ---------------------------

const ROUNDED =
  /(?<![\w-])rounded(?:-(?:[trbl]|tl|tr|bl|br|s|e))?(?:-(?:xs|sm|md|lg|xl|2xl|3xl|\[[^\]]+\]))?(?![\w-])/g;
const SHADOW = /(?<![\w-])shadow(?:-(?:xs|sm|md|lg|xl|2xl|inner))?(?![\w-])/g;

for (const f of codeFiles) {
  const text = readFileSync(f, "utf8");
  scan(f, text, ROUNDED, (at, hit) =>
    errors.push(`${at}  "${hit}" (design is square-cornered; only rounded-full on pill buttons)`)
  );
  scan(f, text, SHADOW, (at, hit) =>
    errors.push(`${at}  "${hit}" (no shadows; use hairline rules)`)
  );
}

// ---- 3. Invented text ----------------------------------------------------

for (const f of codeFiles) {
  const lines = readFileSync(f, "utf8").toLowerCase().split("\n");
  lines.forEach((line, i) => {
    for (const bad of BANNED_TEXT) {
      if (line.includes(bad)) {
        errors.push(`${rel(f)}:${i + 1}  banned text "${bad}" (not from Sarah's content)`);
      }
    }
  });
}

// ---- 4. Authors ----------------------------------------------------------

const articlesFile = join(SRC, "content", "articles.ts");
if (existsSync(articlesFile)) {
  const text = readFileSync(articlesFile, "utf8");
  scan(articlesFile, text, /author:\s*"([^"]+)"/g, (at, _hit, m) => {
    if (!ALLOWED_AUTHORS.includes(m[1])) {
      errors.push(`${at}  author "${m[1]}" is not in ALLOWED_AUTHORS (add it only if Sarah confirmed it)`);
    }
  });
}

// ---- 5. Images exist -----------------------------------------------------

for (const f of codeFiles) {
  scan(f, readFileSync(f, "utf8"), /["'`](\/(?:images|videos)\/[^"'`\s$]+)["'`]/g, (at, _hit, m) => {
    if (!existsSync(join(PUBLIC, m[1]))) {
      errors.push(`${at}  file ${m[1]} does not exist in /public`);
    }
  });
}

// ---- 5b. File weight (fast load, and GitHub rejects files over 100 MB) ----

const MB = 1024 * 1024;
for (const f of walk(PUBLIC)) {
  const size = statSync(f).size;
  if (size > 90 * MB) {
    errors.push(`${rel(f)}  ${(size / MB).toFixed(0)} MB is too big for the repo (compress it or host it outside git)`);
  } else if (/\.(mp4|webm|mov)$/i.test(f) && size > 60 * MB) {
    warnings.push(`${rel(f)}  video is ${(size / MB).toFixed(0)} MB (compress to 720p, aim for under 60 MB)`);
  } else if (/\.(jpe?g|png|webp)$/i.test(f) && size > 800 * 1024) {
    warnings.push(`${rel(f)}  image is ${(size / 1024).toFixed(0)} KB (resize or compress, aim for under 800 KB)`);
  }
}

// ---- 6. Internal links resolve to a real route ---------------------------

const appDir = join(SRC, "app");
const routePatterns = walk(appDir)
  .filter((f) => /page\.tsx$/.test(f))
  .map((f) => {
    const segs = rel(f)
      .replace(/^src\/app\/?/, "")
      .replace(/\/?page\.tsx$/, "")
      .split("/")
      .filter((s) => s && !/^\(.*\)$/.test(s))
      .map((s) => (/^\[.+\]$/.test(s) ? "[^/]+" : s.replace(/[.*+?^${}()|\\]/g, "\\$&")));
    return new RegExp("^/" + segs.join("/") + "$");
  });

for (const f of codeFiles) {
  scan(f, readFileSync(f, "utf8"), /href\s*[=:]\s*\{?\s*["'](\/[^"'#?]*)["']/g, (at, _hit, m) => {
    const path = m[1].length > 1 ? m[1].replace(/\/$/, "") : "/";
    if (path.startsWith("//")) return;
    if (!routePatterns.some((r) => r.test(path))) {
      errors.push(`${at}  link "${m[1]}" has no page in src/app (broken link)`);
    }
  });
}

// ---- 7. Code hygiene -----------------------------------------------------

const SMELLS = [
  [/\bconsole\.(?:log|debug)\b/, "console.log left in code"],
  [/@ts-(?:ignore|nocheck)/, "@ts-ignore / @ts-nocheck"],
  [/:\s*any\b|\bas any\b|<any>/, "type any (use a real type)"],
  [/dangerouslySetInnerHTML/, "dangerouslySetInnerHTML"],
  [/<img\b/, "<img> (use next/image)"],
];

for (const f of codeFiles) {
  const text = readFileSync(f, "utf8");
  for (const [re, msg] of SMELLS) {
    scan(f, text, new RegExp(re.source, "g"), (at) => errors.push(`${at}  ${msg}`));
  }
  scan(f, text, /\/\/\s*(?:TODO|FIXME|HACK)\b/g, (at, hit) =>
    warnings.push(`${at}  ${hit}`)
  );
  scan(f, text, /style=\{\{/g, (at) =>
    warnings.push(`${at}  inline style (prefer Tailwind classes)`)
  );
  if (/\.tsx$/.test(f) && text.split("\n").length > MAX_COMPONENT_LINES) {
    warnings.push(`${rel(f)}  longer than ${MAX_COMPONENT_LINES} lines (split it)`);
  }
  if (/(?:^|\/)(?:page|layout)\.tsx$/.test(rel(f)) && /^\s*["']use client["']/m.test(text)) {
    errors.push(`${rel(f)}  pages and layouts must be server components (move the client part into a component)`);
  }
}

// ---- Report --------------------------------------------------------------

for (const w of warnings) console.warn(`warn   ${w}`);
for (const e of errors) console.error(`error  ${e}`);

console.log(
  `\ncheck:content  ${errors.length} error(s), ${warnings.length} warning(s), ${files.length} files scanned`
);
process.exit(errors.length > 0 ? 1 : 0);
