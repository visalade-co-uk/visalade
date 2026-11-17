# Visalade

A fast, static website for **Visalade**, a UK Schengen visa consultancy. Visalade is a trading name of **Travelade Limited** (company no. 17205750).

The site is a separate brand and design from Travelade, built around the same real service: appointment booking, document preparation and application filing for all 29 Schengen countries.

- **Tagline:** Schengen visas, without the guesswork.
- **Domain (placeholder):** `https://www.visalade.co.uk`
- **Phone / WhatsApp:** `+44 7575 378991`
- **Email:** `info@visalade.co.uk`
- **Address:** 14 Pheasant Rise, Chesham, Buckinghamshire, HP5 1NT

No frameworks, no dependencies, no build tools beyond Node. Every page is generated into plain HTML from the files in `build/`.

---

## Quick start

```powershell
# from this folder
node build/build.js      # generate all HTML, sitemap, robots.txt, vercel.json
node build/serve.js      # preview at http://localhost:4173
node build/check.js      # check local links, titles, descriptions, canonicals
```

`npm run build`, `npm run dev` and `npm run check` call the same scripts if npm works on your machine. If PowerShell blocks `npm.ps1`, use the `node ...` commands above directly.

Node 18 or newer is recommended (Node 24 was used to build it).

---

## What is included

| Area | Pages |
| --- | --- |
| Core | Home, visas, Schengen guide, how it works, pricing, about, reviews, FAQ, contact, apply, blog, document checklist |
| Destinations | 29 individual country pages (`france.html`, `italy.html`, …) with country-specific metadata and content |
| Blog | 3 full articles, index page and Article JSON-LD |
| Legal | Privacy policy, terms & conditions, cookie policy, refund policy |
| Utility | Thank-you page, custom 404, sitemap, robots.txt, `vercel.json` |

50 HTML pages in total. All internal links are root-relative (`/visas.html`), so the site must be deployed at a domain root, not a subfolder.

### Features

- Responsive layout from 360px to widescreen, with a mobile menu and sticky header.
- Destination search and region filters on the visas page.
- Three-step application form with per-step validation and query-string prefill (`?package=full`, `?destination=France`).
- FAQ accordion with `aria-expanded` and `aria-controls`.
- Scroll reveal animations that respect `prefers-reduced-motion`.
- Essential-only cookie notice stored in `localStorage`.
- No analytics, advertising pixels or third-party trackers.
- Canonical URLs, Open Graph/Twitter metadata, Organization, FAQ and Article JSON-LD.
- Lighthouse on the main templates: **100 SEO, 100 best practices, 100 accessibility**.

---

## Project structure

```
Visalade/
├─ build/
│  ├─ config.js        brand, contact details, pricing, regions, page list
│  ├─ data.js          29 countries, reviews, FAQs, blog posts
│  ├─ layout.js        head, header, footer, icons, cards, shared components
│  ├─ pages.js         every page template
│  ├─ legal.js         privacy, terms, cookies, refunds
│  ├─ build.js         writes the site, sitemap, robots.txt, vercel.json
│  ├─ serve.js         tiny local preview server
│  ├─ check.js         link and metadata checker
│  └─ check-images.js  optional: verifies every external image URL
├─ assets/
│  ├─ site.css         design system and responsive rules
│  ├─ site.js          menu, reveals, FAQ, filters, form, cookie notice
│  └─ favicon.svg
├─ index.html …        generated — do not edit by hand
├─ blog/
├─ sitemap.xml
├─ robots.txt
├─ vercel.json
└─ package.json
```

Generated HTML is committed so the folder can be dropped onto any static host as-is. Re-run the build after changing anything in `build/`.

---

## Editing the site

### Brand, contact and pricing

Everything lives in `build/config.js`:

- `BRAND.name`, `tagline`, `domain`, phone, WhatsApp, email, address, hours.
- `BRAND.rating`, `reviewCount`, `googleReviewUrl`.
- `BRAND.deposit`, `depositBalance`.
- `PACKAGES` — names, prices, feature lists and calls to action.
- `REGIONS` — the filter labels on the visas page.
- `CORE_PAGES` — which pages enter the sitemap.

Change once, run `node build/build.js`, and the whole site updates.

### Countries, reviews, FAQs and blog

`build/data.js` holds:

- `COUNTRIES` — name, slug, flag code, city, region, Unsplash image ID and alt text.
- `REVIEWS` — the four real Google reviews, names, dates and tags.
- `FAQS` — 12 questions and answers, also used for FAQ JSON-LD.
- `BLOG_POSTS` — title, description, date, ISO date, image and full article HTML.

### Page copy

`build/pages.js` contains the page templates. Shared blocks are functions at the top of the file: `pageHero`, `sectionHead`, `countryCard`, `reviewCard`, `faqBlock`, `ctaBand`, `packageCard`. Reuse those rather than duplicating markup.

### Design

`assets/site.css` starts with the design tokens:

```css
--ink: #0b1b3f;      /* deep navy */
--blue: #1b4de4;     /* cobalt */
--cream: #fbf7ef;    /* warm section background */
--font-display: 'Bricolage Grotesque';
--font-body: 'Plus Jakarta Sans';
--font-accent: 'Caveat';
```

Fonts load from Google Fonts. Images hotlink Unsplash and flags from `flagcdn.com`.

---

## Forms and FormSubmit

Both forms post to:

```
https://formsubmit.co/info@visalade.co.uk
```

Before the first real submission, FormSubmit sends a one-time activation email to that address. Open it and confirm. Until then, submissions will not arrive.

Each form includes:

- `_subject` — a clear subject line.
- `_next` — `https://www.visalade.co.uk/thank-you.html`.
- `_template` — `table`.
- `_captcha` — `false`.

If the live domain differs, update `BRAND.domain` and rebuild, or change the `_next` values. You can also swap FormSubmit for Formspree, Basin or your own endpoint in `build/pages.js`.

The three-step form does **not** take payment. It collects an enquiry and sets expectations in the sidebar copy.

---

## Deploying

### Vercel (recommended)

1. Create a new Vercel project and upload/import this folder.
2. Framework preset: **Other**. No build command is required; the HTML is already generated.
3. Output directory: the project root.
4. Add the domain, point DNS, and enable HTTPS.
5. `vercel.json` sets long-lived caching for `/assets/*` and basic security headers. Vercel serves `404.html` automatically.

The site can also be hosted on Netlify, Cloudflare Pages, GitHub Pages (custom domain at root) or any static host. Root-relative links mean a subfolder deployment will need a base-path change.

### Before going live

- [ ] Confirm the final domain and update `BRAND.domain` if it is not `www.visalade.co.uk`.
- [ ] Activate the FormSubmit email and send a test enquiry.
- [ ] Send a test application through all three steps.
- [ ] Replace the placeholder OG image if you want a branded social card.
- [ ] Ask a solicitor to review `build/legal.js` and the pricing/refund wording.
- [ ] Confirm the Google review link and review count on the Google Business Profile.
- [ ] Decide whether to self-host the Unsplash images (see below).
- [ ] Check the site on a real phone, not only a resized browser.

---

## Images and licensing

Destination and editorial images are hotlinked from Unsplash using stable photo IDs. Flags come from `flagcdn.com`.

Hotlinking is fine for a quick launch, but for a production site you should:

1. Download the images you actually use.
2. Compress them to WebP/AVIF at the sizes used.
3. Store them in `assets/img/` and update `data.js`.
4. Keep the Unsplash photographer credit requirements in mind.

Unsplash images are free to use under the Unsplash License, but you should not imply that the photographer endorses the business. Replacing them with your own photography is the strongest option.

---

## Legal and content notes

The legal pages are a practical UK baseline, not legal advice. They refer to UK GDPR, the ICO, company details, refund tiers and the limits of a consultancy's role. Have them reviewed before launch, especially:

- the refund and cancellation wording;
- the statement that no visa outcome is guaranteed;
- data retention periods;
- international transfers to embassies and visa centres.

Reviews shown on the site are the real Google reviews supplied for Travelade Limited. The “5.0” rating and “4 reviews” count should be kept in sync with the live Google profile. Do not add approval-rate claims: the site deliberately avoids them because no consultancy can guarantee a visa.

The content is written for Visalade using Travelade's service details, the team's own review text and original copy. The layout takes structural inspiration from modern visa/travel sites; it is not a copy of another company's code or branding.

---

## Checks before each deploy

```powershell
node build/build.js
node build/check.js
node build/check-images.js   # optional, needs internet
```

`check.js` verifies that every local `href`/`src` resolves, every page has a title, meta description and canonical, no duplicate titles exist, and no template values leaked as `undefined`, `[object Object]` or `NaN`.

---

## Brand summary

**Visalade** - clear, calm, UK-based Schengen visa support. Deep navy and cobalt, warm cream sections, editorial display type, real reviews, and a £49 deposit that makes starting feel low-risk. The name is deliberately narrow: it says exactly what the business does.
