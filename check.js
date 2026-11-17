'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const problems = [];
const titles = new Map();

function walk(dir, out) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.vercel') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, out);
        else out.push(full);
    }
    return out;
}

const files = walk(ROOT, []).filter((f) => f.endsWith('.html'));

for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const html = fs.readFileSync(file, 'utf8');

    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];

    if (!title) problems.push(`${rel}: missing <title>`);
    if (!desc) problems.push(`${rel}: missing meta description`);
    if (!canonical) problems.push(`${rel}: missing canonical`);

    if (title) {
        if (titles.has(title)) problems.push(`${rel}: duplicate title with ${titles.get(title)}`);
        titles.set(title, rel);
    }

    if (html.includes('undefined') || html.includes('[object Object]') || /(^|\s)NaN(\s|$)/.test(html)) {
        problems.push(`${rel}: contains undefined / [object Object] / NaN`);
    }

    if (html.includes('&amp;amp;')) {
        problems.push(`${rel}: double-escaped ampersand`);
    }

    const attrPattern = /\b(?:href|src)="([^"]+)"/g;
    let match;
    while ((match = attrPattern.exec(html))) {
        const value = match[1];
        if (/^(https?:|mailto:|tel:|#|data:|\/\/)/.test(value)) continue;
        const clean = value.split('?')[0].split('#')[0];
        if (!clean) continue;
        const target = clean.startsWith('/')
            ? path.join(ROOT, clean)
            : path.resolve(path.dirname(file), clean);
        if (!fs.existsSync(target)) {
            problems.push(`${rel}: broken local link -> ${value}`);
        }
    }
}

console.log(`\nChecked ${files.length} HTML files.`);

if (problems.length) {
    console.log(`\n${problems.length} problem(s):\n`);
    problems.forEach((p) => console.log('  - ' + p));
    process.exitCode = 1;
} else {
    console.log('No broken links, missing metadata or template errors.\n');
}
