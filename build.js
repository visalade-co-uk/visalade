'use strict';

const fs = require('fs');
const path = require('path');

const { BRAND, CORE_PAGES } = require('./config');
const { COUNTRIES, BLOG_POSTS } = require('./data');
const { LEGAL } = require('./legal');
const P = require('./pages');
const L = require('./layout');

const ROOT = path.resolve(__dirname, '..');
const TODAY = '2026-11-03';

/* Relative URLs so the site also works when opened directly from disk
   (file://), while keeping blog pages (one folder down) correct. */
function blogify(html) {
    return html.replace(/\b(href|src)="(?!https?:|mailto:|tel:|#|\/|\.\.\/|data:)([^"]*)"/g, function (m, attr, url) {
        return attr + '="../' + url + '"';
    });
}

function write(rel, html) {
    const file = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    let output = html;
    if (rel.endsWith('.html')) {
        if (rel.startsWith('blog/')) output = blogify(html);
    }
    fs.writeFileSync(file, output, 'utf8');
    console.log('  ' + rel);
}

function legalPage(doc) {
    const content = `
${L.pageHero({
    crumbs: [{ label: 'Home', href: 'index.html' }, { label: doc.title.replace(/&amp;/g, '&') }],
    eyebrow: 'Legal',
    title: doc.title,
    text: doc.intro,
    compact: true,
    stats: undefined
})}

<section class="section section--tight">
    <div class="shell legal-wrap">
        <p class="legal-updated">Last updated: ${require('./legal').UPDATED}</p>
        <article class="prose">${doc.body}</article>
    </div>
</section>

${L.ctaBand({ eyebrow: 'Questions?', title: 'Ask before you commit.', text: 'If anything in this policy is unclear, email us and we will explain it in plain language.' })}
`;

    return L.page({
        title: `${doc.title.replace(/&amp;/g, '&')} | ${BRAND.name}`,
        description: doc.description,
        canonical: doc.canonical || '',
        content,
        noindex: false
    });
}

console.log('\nBuilding Visalade\n');

const pages = {
    'visas.html': P.visas(),
    'schengen.html': P.schengen(),
    'how-it-works.html': P.howItWorks(),
    'pricing.html': P.pricing(),
    'about.html': P.about(),
    'reviews.html': P.reviewsPage(),
    'faq.html': P.faqPage(),
    'contact.html': P.contact(),
    'apply.html': P.applyPage(),
    'blog.html': P.blogIndex(),
    'requirements.html': P.requirements(),
    'thank-you.html': P.thankYou(),
    '404.html': P.notFound()
};

for (const c of COUNTRIES) {
    pages[`${c.slug}.html`] = P.countryPage(c);
}

for (const post of BLOG_POSTS) {
    pages[`blog/${post.slug}.html`] = P.blogPost(post);
}

for (const [slug, doc] of Object.entries(LEGAL)) {
    // 'terms-and-conditions.html' is maintained as a standalone page.
    if (slug === 'terms-and-conditions') continue;
    doc.canonical = `${slug}.html`;
    pages[`${slug}.html`] = legalPage(doc);
}

for (const [rel, html] of Object.entries(pages)) {
    write(rel, html);
}

/* --------------------------------------------------------------- sitemap */

const urls = [
    ...CORE_PAGES,
    ...COUNTRIES.map((c) => `${c.slug}.html`),
    ...BLOG_POSTS.map((p) => `blog/${p.slug}.html`),
    ...Object.keys(LEGAL).map((s) => `${s}.html`)
];

const priority = (file) => {
    if (file === 'index.html') return '1.0';
    if (['visas.html', 'schengen.html', 'pricing.html'].includes(file)) return '0.9';
    if (file.startsWith('blog/')) return '0.6';
    if (Object.keys(LEGAL).some((s) => `${s}.html` === file)) return '0.3';
    return '0.8';
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u === 'index.html' ? BRAND.domain + '/' : BRAND.domain + '/' + u}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u === 'index.html' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(u)}</priority>
  </url>`).join('\n')}
</urlset>
`;

write('sitemap.xml', sitemap);

write('robots.txt', `User-agent: *
Allow: /
Disallow: /thank-you.html
Disallow: /404.html

Sitemap: ${BRAND.domain}/sitemap.xml
`);

/* vercel.json is maintained manually — do not overwrite it here. */

console.log(`\nDone: ${Object.keys(pages).length} pages, ${urls.length} sitemap URLs.\n`);
