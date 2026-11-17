'use strict';

/*
 * One place for every brand, contact and pricing decision.
 * Change a value here and re-run `node build/build.js` to update the whole site.
 */

const BRAND = {
    name: 'Visalade',
    legalName: 'Visalade Limited',
    companyNo: '00000000',
    tagline: 'Your Schengen & Turkey visa, prepared by specialists who answer the phone.',
    domain: 'https://www.visalade.co.uk',

    phone: '+44 7576 016131',
    phoneHref: '+447576016131',
    whatsapp: '447576016131',
    email: 'info@visalade.co.uk',

    address: {
        line1: 'Registered Office',
        city: 'London',
        county: 'United Kingdom',
        postcode: 'EC1A 1BB',
        country: 'United Kingdom'
    },

    hours: 'Mon&ndash;Sat, 9:00&ndash;18:00',
    founded: '2025',
    googleReviewUrl: 'https://g.page/r/CVdyj7CAiUSWEAI/review',
    rating: '5.0',
    reviewCount: 4,

    deposit: 49,
    depositBalance: 116,
    currency: '&pound;',

    /* Absolute URL used for social previews (og:image). */
    ogImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80'
};

const PACKAGES = [
    {
        id: 'slot',
        name: 'Appointment booking',
        short: 'Slot only',
        price: 99,
        tagline: 'We find and book your visa appointment.',
        description: 'For applicants who have their documents ready and only need a slot at the visa application centre.',
        features: [
            'Live appointment search across UK centres',
            'Slot booked in your name',
            'Personal checklist for your trip',
            'WhatsApp support until your appointment',
            'Free reschedule if a centre changes availability'
        ],
        cta: 'Book my appointment',
        popular: false
    },
    {
        id: 'full',
        name: 'Full application support',
        short: 'Full support',
        price: 165,
        tagline: 'We prepare, check and file the whole application.',
        description: 'Our most popular service. A named consultant takes your file from first question to appointment.',
        features: [
            'Everything in appointment booking',
            'Document review and gap check',
            'Application form completed for you',
            'Cover letter and itinerary review',
            'Travel insurance and flight reservation guidance',
            'Application filed and tracked',
            'Start with a &pound;49 deposit'
        ],
        cta: 'Start my application',
        popular: true
    },
    {
        id: 'premium',
        name: 'Premium support',
        short: 'Premium',
        price: 250,
        tagline: 'Priority handling and support after the decision.',
        description: 'For complex files, tight deadlines or anyone who wants a senior consultant on call throughout.',
        features: [
            'Everything in full application support',
            'Senior consultant and priority replies',
            'Complex-file review (refusals, gaps, overstays)',
            'Appointment interview preparation',
            'Passport collection and courier coordination',
            'Post-decision support and next-steps advice'
        ],
        cta: 'Choose Premium',
        popular: false
    }
];

const REGIONS = [
    { id: 'western', label: 'Western Europe' },
    { id: 'southern', label: 'Southern Europe' },
    { id: 'northern', label: 'Northern Europe' },
    { id: 'central', label: 'Central & Eastern Europe' }
];

/* Public pages that should appear in the sitemap, in priority order. */
const CORE_PAGES = [
    'index.html',
    'visas.html',
    'schengen.html',
    'how-it-works.html',
    'pricing.html',
    'about.html',
    'reviews.html',
    'faq.html',
    'contact.html',
    'apply.html',
    'blog.html',
    'requirements.html'
];

function wa(text) {
    const message = text || "Hi Visalade, I'd like help with my Schengen visa.";
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

module.exports = { BRAND, PACKAGES, REGIONS, CORE_PAGES, wa };
