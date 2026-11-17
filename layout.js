'use strict';

const { BRAND, wa } = require('./config');

const FONTS =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Plus+Jakarta+Sans:wght@600;700&family=Inter:wght@400;500;600&display=swap';

const ICONS = {
    arrow: { p: '<path d="M4 12h15M13 6l6 6-6 6"/>' },
    external: { p: '<path d="M7 17 17 7M8 7h9v9"/>' },
    check: { p: '<path d="m4 12.5 5 5L20 6.5"/>' },
    plus: { p: '<path d="M12 5v14M5 12h14"/>' },
    minus: { p: '<path d="M5 12h14"/>' },
    search: { p: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>' },
    phone: { p: '<path d="M6.6 3h2.7l1.3 4-2 1.4a13 13 0 0 0 5 5l1.4-2 4 1.3v2.7A2.6 2.6 0 0 1 16.4 18 14.4 14.4 0 0 1 6 7.6 2.6 2.6 0 0 1 6.6 3Z"/>' },
    mail: { p: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
    pin: { p: '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>' },
    clock: { p: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
    calendar: { p: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>' },
    shield: { p: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/>' },
    file: { p: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>' },
    plane: { p: '<path d="m10.5 13.5-7.5-2.5 18-7-7 18-2.5-7.5-1-1Z"/>' },
    chat: { p: '<path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>' },
    globe: { p: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"/>' },
    menu: { p: '<path d="M4 7h16M4 12h16M4 17h16"/>' },
    close: { p: '<path d="m6 6 12 12M18 6 6 18"/>' },
    chevron: { p: '<path d="m6 9 6 6 6-6"/>' },
    users: { p: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7" r="3.5"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.8M16.5 3.6a3.5 3.5 0 0 1 0 6.8"/>' },
    card: { p: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h3"/>' },
    spark: { p: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>' },
    lock: { p: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>' },
    refresh: { p: '<path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 4v7h-7"/>' },
    star: { p: '<path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.3 6.2 20.4l1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z"/>', fill: true },
    whatsapp: {
        p: '<path d="M20.5 3.5A11 11 0 0 0 3.2 16.7L2 22l5.5-1.4A11 11 0 1 0 20.5 3.5ZM12 20.5a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.4 2.4 1 2.9.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z"/>',
        fill: true
    }
};

function icon(name, cls) {
    const item = ICONS[name] || ICONS.arrow;
    const fill = item.fill ? ' fill="currentColor" stroke="none"' : '';
    return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true"${fill}>${item.p}</svg>`;
}

function img(id, w, q) {
    const width = w || 900;
    const quality = q || 80;
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

function flag(code, cls) {
    if (!code) return '';
    return `<img class="flag${cls ? ' ' + cls : ''}" src="https://flagcdn.com/w40/${code}.png" alt="" width="20" height="15" loading="lazy">`;
}

function logo(cls) {
    return `<span class="brand${cls ? ' ' + cls : ''}">
        <span class="brand__mark" aria-hidden="true"><img src="assets/logo.png" alt="Visalade" width="80" height="80" loading="eager" decoding="async" style="object-fit:contain;"></span>
    </span>`;
}

function head(opts) {
    const title = opts.title;
    const description = opts.description;
    const canonical = `${BRAND.domain}/${opts.canonical || ''}`;
    const ogImage = opts.ogImage || BRAND.ogImage;
    const jsonLd = (opts.jsonLd || []).map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n');
    return `<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    ${opts.noindex ? '<meta name="robots" content="noindex">' : ''}

    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <link rel="apple-touch-icon" href="assets/favicon.svg">

    <meta property="og:site_name" content="${BRAND.name}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="${opts.type || 'website'}">
    <meta property="og:locale" content="en_GB">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="theme-color" content="#0b1b3f">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://images.unsplash.com">
    <link href="${FONTS}" rel="stylesheet">
    <link rel="stylesheet" href="assets/site.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { theme: { extend: { colors: { emeraldBrand: { DEFAULT: '#064E3B', dark: '#043927', soft: '#ECFDF5' }, goldBrand: { DEFAULT: '#C59B27', dark: '#A8821D', soft: '#FEF9EC' }, ivoryBg: '#FAF9F6', stoneBorder: '#E7E5E4', charcoalText: '#1E293B', slateMuted: '#475569' }, fontFamily: { serifEditorial: ['"Cormorant Garamond"','Georgia','serif'], heading: ['"Plus Jakarta Sans"','sans-serif'], sans: ['Inter','sans-serif'] } } } };
    </script>
    <script>document.documentElement.classList.add('js');try{if(localStorage.getItem('visalade-theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}</script>
    <noscript><style>.faq__a[hidden]{display:block!important;max-height:none!important}.reveal{opacity:1!important;transform:none!important}</style></noscript>
    ${jsonLd}
</head>`;
}

const NAV = [
    { href: 'visas.html', label: 'All visas', key: 'visas' },
    { href: 'schengen.html', label: 'Schengen visa', key: 'schengen' },
    { href: 'how-it-works.html', label: 'How it works', key: 'how' },
    { href: 'pricing.html', label: 'Pricing', key: 'pricing' },
    { href: 'reviews.html', label: 'Reviews', key: 'reviews' },
    { href: 'blog.html', label: 'Blog', key: 'blog' }
];

function header(active) {
    const links = NAV.map((n) => `<a href="${n.href}" class="text-sm font-medium text-slateMuted hover:text-emeraldBrand transition-colors">${n.label}</a>`).join('');
    return `<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stoneBorder">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        <a href="index.html" class="inline-flex items-center gap-3 shrink-0" aria-label="${BRAND.name} home">
            ${logo()}
        </a>
        <nav class="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            ${links}
            <a href="terms-and-conditions.html" class="text-sm font-medium text-slateMuted hover:text-emeraldBrand transition-colors">Terms &amp; Conditions</a>
        </nav>
        <div class="flex items-center gap-2.5 sm:gap-3">
            <a href="${wa()}" target="_blank" rel="noopener" class="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-charcoalText bg-white border border-stoneBorder rounded-xl hover:bg-stone-50 transition-all">
                <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> WhatsApp
            </a>
            <a href="apply.html" class="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-emeraldBrand hover:bg-emeraldBrand-dark rounded-xl shadow-sm transition-all">Start Application</a>
        </div>
    </div>
</header>`;
}

function footer() {
    return `<footer class="bg-emeraldBrand text-white pt-12 pb-8 mt-16">
    <div class="shell">
        <div class="footer__top">
            <div class="footer__brand">
                <a class="brand-link" href="index.html" aria-label="${BRAND.name} home">${logo('brand--light')}</a>
                <p>Schengen visa support for UK residents. Documents, appointments and filing handled by a small UK team you can message directly.</p>
                <a class="footer__review" href="${BRAND.googleReviewUrl}" target="_blank" rel="noopener">
                    <span class="stars" aria-hidden="true">${icon('star')}${icon('star')}${icon('star')}${icon('star')}${icon('star')}</span>
                    <span>${BRAND.rating}/5 from Google reviews</span>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/15">
            <div class="space-y-3">
                ${logo()}
                <p class="text-xs text-emerald-100/85 leading-relaxed">Visalade Limited is a private travel and visa assistance consultancy registered in England & Wales. Not affiliated with any government, embassy, consulate, VFS Global, or TLScontact.</p>
            </div>
            <div>
                <h4 class="font-heading font-bold text-xs uppercase tracking-widest text-goldBrand mb-3">Company & Legal</h4>
                <ul class="space-y-2 text-sm text-emerald-100/90">
                    <li><a href="about.html" class="hover:text-goldBrand transition-colors">About us</a></li>
                    <li><a href="contact.html" class="hover:text-goldBrand transition-colors">Contact</a></li>
                    <li><a href="blog.html" class="hover:text-goldBrand transition-colors">Blog</a></li>
                    <li><a href="refund-policy.html" class="hover:text-goldBrand transition-colors">Refund policy</a></li>
                    <li><a href="privacy-policy.html" class="hover:text-goldBrand transition-colors">Privacy policy</a></li>
                    <li><a href="terms-and-conditions.html" class="hover:text-goldBrand transition-colors">Terms of service</a></li>
                    <li><a href="cookie-policy.html" class="hover:text-goldBrand transition-colors">Cookie policy</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-heading font-bold text-xs uppercase tracking-widest text-goldBrand mb-3">Services</h4>
                <ul class="space-y-2 text-sm text-emerald-100/90">
                    <li><a href="pricing.html" class="hover:text-goldBrand transition-colors">Pricing</a></li>
                    <li><a href="how-it-works.html" class="hover:text-goldBrand transition-colors">How it works</a></li>
                    <li><a href="requirements.html" class="hover:text-goldBrand transition-colors">Document checklist</a></li>
                    <li><a href="apply.html" class="hover:text-goldBrand transition-colors">Start an application</a></li>
                    <li><a href="reviews.html" class="hover:text-goldBrand transition-colors">Reviews</a></li>
                    <li><a href="faq.html" class="hover:text-goldBrand transition-colors">FAQs</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-heading font-bold text-xs uppercase tracking-widest text-goldBrand mb-3">Talk to us</h4>
                <ul class="space-y-2 text-sm text-emerald-100/90">
                    <li><a href="tel:${BRAND.phoneHref}" class="hover:text-goldBrand transition-colors">${BRAND.phone}</a></li>
                    <li><a href="mailto:${BRAND.email}" class="hover:text-goldBrand transition-colors">${BRAND.email}</a></li>
                    <li><a href="${wa()}" target="_blank" rel="noopener" class="hover:text-goldBrand transition-colors">WhatsApp</a></li>
                    <li class="text-emerald-100/70 text-xs">${BRAND.address.line1}, ${BRAND.address.city}, ${BRAND.address.county}, ${BRAND.address.postcode}</li>
                    <li class="text-emerald-100/70 text-xs">${BRAND.hours}</li>
                </ul>
            </div>
        </div>

            <div class="flex items-center gap-5">
                <a href="terms-and-conditions.html" class="hover:text-white">Terms</a>
                <a href="refund-policy.html" class="hover:text-white">Refund Policy</a>
                <a href="privacy-policy.html" class="hover:text-white">Privacy</a>
            </div>
        </div>
    </div>
</footer>

<div class="cookie" id="cookieBar" role="region" aria-label="Cookie notice" hidden>
    <div>
        <strong>Essential storage only</strong>
        <p>This site stores one preference on your device so this notice does not appear on every visit. No analytics, advertising or cross-site tracking. <a href="cookie-policy.html">Read the policy</a>.</p>
    </div>
    <div class="cookie__actions">
        <button class="btn btn--primary btn--sm" type="button" data-cookie="essential">Got it</button>
    </div>
</div>

<a class="wa-float" href="${wa()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon('whatsapp')}</a>

<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js" defer></script>
<script src="assets/site.js" defer></script>`;
}

function page(opts) {
    return `${head(opts)}
<body class="${opts.bodyClass || ''}">
${header(opts.active)}
<main id="main-content">
${opts.content}
</main>
${footer()}
</body>
</html>`;
}

function breadcrumbs(items) {
    return `<nav class="crumbs" aria-label="Breadcrumb">
        ${items.map((item, i) => item.href
            ? `<a href="${item.href}">${item.label}</a>${i < items.length - 1 ? '<span aria-hidden="true">/</span>' : ''}`
            : `<span aria-current="page">${item.label}</span>`).join('')}
    </nav>`;
}

function stars(cls) {
    return `<span class="stars${cls ? ' ' + cls : ''}" role="img" aria-label="5 out of 5 stars">${'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.3 6.2 20.4l1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z"/></svg>'.repeat(5)}</span>`;
}

function countryCard(c) {
    return `<a class="dcard reveal" href="${c.slug}.html" data-region="${c.region}" data-name="${c.name.toLowerCase()}">
        <img src="${img(c.imgId, 700, 75)}" alt="${c.alt}" width="700" height="875" loading="lazy" decoding="async">
        <span class="dcard__chip">Schengen visa</span>
        <span class="dcard__body">
            <span class="dcard__country">${c.name}</span>
            <span class="dcard__meta">${c.city} &middot; from ${BRAND.currency}99</span>
        </span>
        <span class="dcard__arrow" aria-hidden="true">${icon('arrow')}</span>
    </a>`;
}

function reviewCard(r) {
    return `<article class="review reveal">
        <div class="review__top">
            <span class="review__avatar" aria-hidden="true">${r.initial}</span>
            <div>
                <strong>${r.name}</strong>
                <span>${r.when} &middot; Google</span>
            </div>
            ${stars()}
        </div>
        <blockquote>&ldquo;${r.text}&rdquo;</blockquote>
        ${r.country ? `<div class="review__tag">${flag(r.flag)} ${r.country} visa</div>` : ''}
    </article>`;
}

function faqBlock(items, idPrefix) {
    const prefix = idPrefix || 'faq';
    return `<div class="faq" data-faq>
        ${items.map((f, i) => `<div class="faq__item">
            <h3>
                <button class="faq__q" type="button" aria-expanded="false" aria-controls="${prefix}-${i}">
                    <span>${f.q}</span>${icon('plus', 'faq__ico')}
                </button>
            </h3>
            <div class="faq__a" id="${prefix}-${i}" hidden>
                <div><p>${f.a}</p></div>
            </div>
        </div>`).join('')}
    </div>`;
}

function sectionHead(opts) {
    return `<div class="section-head${opts.center ? ' section-head--center' : ''} reveal">
        <div>
            ${opts.eyebrow ? `<span class="eyebrow">${opts.eyebrow}</span>` : ''}
            <h2 class="section-title">${opts.title}</h2>
            ${opts.text ? `<p class="section-text">${opts.text}</p>` : ''}
        </div>
        ${opts.action || ''}
    </div>`;
}

function ctaBand(opts) {
    const o = opts || {};
    return `<section class="section">
    <div class="shell">
        <div class="cta reveal">
            <div class="cta__ring" aria-hidden="true"></div>
            <div class="cta__copy">
                <span class="eyebrow eyebrow--light">${o.eyebrow || 'Next step'}</span>
                <h2>${o.title || 'Not sure where to start?'}</h2>
                <p>${o.text || 'Send us your destination and travel dates on WhatsApp. A consultant will explain what your visa involves. The first conversation is free.'}</p>
            </div>
            <div class="cta__actions">
                <a class="btn btn--light" href="apply.html">Start application ${icon('arrow')}</a>
                <a class="btn btn--wa" href="${wa(o.waText)}" target="_blank" rel="noopener">${icon('whatsapp')} Chat on WhatsApp</a>
            </div>
        </div>
    </div>
</section>`;
}

function pageHero(opts) {
    return `<section class="page-hero${opts.plain ? ' page-hero--plain' : ''}">
    <div class="shell">
        ${opts.crumbs ? breadcrumbs(opts.crumbs) : ''}
        <div class="page-hero__inner${opts.compact ? ' page-hero__inner--compact' : ''}">
            <div class="page-hero__copy">
                ${opts.eyebrow ? `<span class="eyebrow">${opts.eyebrow}</span>` : ''}
                <h1>${opts.title}</h1>
                ${opts.text ? `<p class="page-hero__text">${opts.text}</p>` : ''}
                ${opts.actions ? `<div class="btn-row">${opts.actions}</div>` : ''}
                ${opts.stats ? `<ul class="mini-stats">${opts.stats.map((s) => `<li><b>${s.value}</b><span>${s.label}</span></li>`).join('')}</ul>` : ''}
            </div>
            ${opts.aside ? `<div class="page-hero__aside">${opts.aside}</div>` : ''}
        </div>
    </div>
</section>`;
}

function packageCard(p, opts) {
    const o = opts || {};
    return `<article class="price${p.popular ? ' price--featured' : ''} reveal">
        ${p.popular ? '<span class="price__badge">Most popular</span>' : ''}
        <h3>${p.name}</h3>
        <p class="price__tagline">${p.tagline}</p>
        <div class="price__amount">${BRAND.currency}${p.price}<span>${o.suffix || 'per traveller'}</span></div>
        ${p.id !== 'slot' ? `<p class="price__deposit">or start with a ${BRAND.currency}${BRAND.deposit} deposit</p>` : '<p class="price__deposit">payable in full when we book</p>'}
        <a class="btn ${p.popular ? 'btn--light' : 'btn--primary'} btn--block" href="apply.html?package=${p.id}">${p.cta} ${icon('arrow')}</a>
        <ul class="price__list">
            ${p.features.map((f) => `<li>${icon('check')}<span>${f}</span></li>`).join('')}
        </ul>
    </article>`;
}

module.exports = {
    BRAND,
    FONTS,
    icon,
    img,
    flag,
    logo,
    head,
    header,
    footer,
    page,
    breadcrumbs,
    stars,
    countryCard,
    reviewCard,
    faqBlock,
    sectionHead,
    ctaBand,
    pageHero,
    packageCard,
    wa
};
