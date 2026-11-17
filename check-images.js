'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walk(dir, out) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (['node_modules', '.git', '.vercel'].includes(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, out);
        else if (full.endsWith('.html')) out.push(full);
    }
    return out;
}

const urls = new Set();
for (const file of walk(ROOT, [])) {
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<img[^>]+src="(https?:[^"]+)"/g)) urls.add(m[1]);
    for (const m of html.matchAll(/<meta[^>]+content="(https?:[^"]+\.(?:jpe?g|png|webp))"/g)) urls.add(m[1]);
}

console.log(`Checking ${urls.size} unique image URLs...\n`);

(async () => {
    const results = await Promise.all([...urls].map(async (url) => {
        try {
            const res = await fetch(url, { method: 'GET' });
            return { url, status: res.status, type: res.headers.get('content-type') };
        } catch (e) {
            return { url, status: 0, type: String(e.message) };
        }
    }));

    results.sort((a, b) => a.status - b.status);
    for (const r of results) {
        console.log(String(r.status).padStart(3), r.url);
    }

    const bad = results.filter((r) => r.status >= 400 || r.status === 0);
    console.log(`\n${bad.length} failing.`);
})();
