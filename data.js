'use strict';

/* 29 Schengen countries. Image IDs are Unsplash photo IDs. */
const COUNTRIES = [
    { name: 'Austria', slug: 'austria', flag: 'at', city: 'Vienna', region: 'western', imgId: 'photo-1516550893923-42d28e5677af', alt: 'Hallstatt village on its lake, Austria' },
    { name: 'Belgium', slug: 'belgium', flag: 'be', city: 'Brussels', region: 'western', imgId: 'photo-1548092304-e0205cb0031b', alt: 'Guildhalls and rooftops in Brussels, Belgium' },
    { name: 'Bulgaria', slug: 'bulgaria', flag: 'bg', city: 'Sofia', region: 'central', imgId: 'photo-1594803294810-c860e5d29e07', alt: 'Alexander Nevsky Cathedral under a blue sky, Sofia, Bulgaria' },
    { name: 'Croatia', slug: 'croatia', flag: 'hr', city: 'Dubrovnik', region: 'southern', imgId: 'photo-1555990793-da11153b2473', alt: 'The stone bell tower and city walls of Dubrovnik, Croatia' },
    { name: 'Czech Republic', slug: 'czech-republic', flag: 'cz', city: 'Prague', region: 'central', imgId: 'photo-1592906209472-a36b1f3782ef', alt: 'Charles Bridge over the Vltava in Prague, Czech Republic' },
    { name: 'Denmark', slug: 'denmark', flag: 'dk', city: 'Copenhagen', region: 'northern', imgId: 'photo-1513622470522-26c3c8a854bc', alt: 'Nyhavn harbour houses in Copenhagen, Denmark' },
    { name: 'Estonia', slug: 'estonia', flag: 'ee', city: 'Tallinn', region: 'northern', imgId: 'photo-1575561003164-f36f2e28a524', alt: 'Red tile roofs of Tallinn, Estonia' },
    { name: 'Finland', slug: 'finland', flag: 'fi', city: 'Helsinki', region: 'northern', imgId: 'photo-1538332576228-eb5b4c4de6f5', alt: 'The harbour and islands of Helsinki, Finland' },
    { name: 'France', slug: 'france', flag: 'fr', city: 'Paris', region: 'western', imgId: 'photo-1502602898657-3e91760cbb34', alt: 'The Eiffel Tower lit up over Paris at dusk' },
    { name: 'Germany', slug: 'germany', flag: 'de', city: 'Berlin', region: 'western', imgId: 'photo-1599946347371-68eb71b16afc', alt: 'The Brandenburg Gate in Berlin, Germany' },
    { name: 'Greece', slug: 'greece', flag: 'gr', city: 'Athens', region: 'southern', imgId: 'photo-1613395877344-13d4a8e0d49e', alt: 'Whitewashed village above the Aegean, Greece' },
    { name: 'Hungary', slug: 'hungary', flag: 'hu', city: 'Budapest', region: 'central', imgId: 'photo-1616432902940-b7a1acbc60b3', alt: 'The Hungarian Parliament Building on the Danube, Budapest' },
    { name: 'Iceland', slug: 'iceland', flag: 'is', city: 'Reykjavik', region: 'northern', imgId: 'photo-1474690870753-1b92efa1f2d8', alt: 'Hallgrims church tower in Reykjavik, Iceland' },
    { name: 'Italy', slug: 'italy', flag: 'it', city: 'Rome', region: 'southern', imgId: 'photo-1552832230-c0197dd311b5', alt: 'The Colosseum and Roman Forum in Rome, Italy' },
    { name: 'Latvia', slug: 'latvia', flag: 'lv', city: 'Riga', region: 'northern', imgId: 'photo-1685470934582-3636319a3be9', alt: 'The spire of Riga Cathedral against the sky, Latvia' },
    { name: 'Liechtenstein', slug: 'liechtenstein', flag: 'li', city: 'Vaduz', region: 'western', imgId: 'photo-1512424113276-fa9f6a112384', alt: 'Vaduz Castle on its wooded rock, Liechtenstein' },
    { name: 'Lithuania', slug: 'lithuania', flag: 'lt', city: 'Vilnius', region: 'northern', imgId: 'photo-1747342866626-1fcd64772c08', alt: 'Gediminas Tower overlooking Vilnius, Lithuania' },
    { name: 'Luxembourg', slug: 'luxembourg', flag: 'lu', city: 'Luxembourg City', region: 'western', imgId: 'photo-1662239936406-522b4f82546a', alt: 'The Alzette valley through Luxembourg City' },
    { name: 'Malta', slug: 'malta', flag: 'mt', city: 'Valletta', region: 'southern', imgId: 'photo-1587974928552-4f4aac51b45d', alt: 'The harbour at Valletta, Malta' },
    { name: 'Netherlands', slug: 'netherlands', flag: 'nl', city: 'Amsterdam', region: 'western', imgId: 'photo-1534351590666-13e3e96b5017', alt: 'Canal houses reflected in the water, Amsterdam, Netherlands' },
    { name: 'Norway', slug: 'norway', flag: 'no', city: 'Oslo', region: 'northern', imgId: 'photo-1518124880777-cf8c82231ffb', alt: 'A fjord between snow-capped mountains, Norway' },
    { name: 'Poland', slug: 'poland', flag: 'pl', city: 'Krakow', region: 'central', imgId: 'photo-1670166819528-aadfddc48070', alt: 'Wawel Castle over the Vistula in Krakow, Poland' },
    { name: 'Portugal', slug: 'portugal', flag: 'pt', city: 'Lisbon', region: 'southern', imgId: 'photo-1702560030824-02cf6c4761ef', alt: 'The Belem Tower on the riverfront in Lisbon, Portugal' },
    { name: 'Romania', slug: 'romania', flag: 'ro', city: 'Bucharest', region: 'central', imgId: 'photo-1695314620864-b551fd6574ef', alt: 'A fountain and palace facade in Bucharest, Romania' },
    { name: 'Slovakia', slug: 'slovakia', flag: 'sk', city: 'Bratislava', region: 'central', imgId: 'photo-1568616388664-1e37d8376363', alt: 'Bratislava Castle above the old town, Slovakia' },
    { name: 'Slovenia', slug: 'slovenia', flag: 'si', city: 'Ljubljana', region: 'southern', imgId: 'photo-1602619025915-073b0594d662', alt: 'Ljubljana old town and its river, Slovenia' },
    { name: 'Spain', slug: 'spain', flag: 'es', city: 'Barcelona', region: 'southern', imgId: 'photo-1758471206484-0eaa2568320c', alt: 'The Sagrada Familia above Barcelona at sunset, Spain' },
    { name: 'Sweden', slug: 'sweden', flag: 'se', city: 'Stockholm', region: 'northern', imgId: 'photo-1509356843151-3e7d96241e11', alt: 'The old town and waterways of Stockholm, Sweden' },
    { name: 'Switzerland', slug: 'switzerland', flag: 'ch', city: 'Zurich', region: 'western', imgId: 'photo-1580405624815-5168a9f8bb63', alt: 'A mountain lake and the Alps near Zurich, Switzerland' }
];

const REVIEWS = [
    {
        name: 'Damon Ashbourne',
        initial: 'D',
        when: 'Sep 2026',
        country: 'Italy',
        flag: 'it',
        text: 'We wanted to plan a family vacation to Italy, and choosing Travelade was the best decision we made. Muhammad guided us step-by-step through the paperwork and documentation. The process was transparent, quick, and hassle-free. Thank you for making our dream trip a reality!'
    },
    {
        name: 'gina candido',
        initial: 'G',
        when: 'Jul 2026',
        country: '',
        flag: '',
        text: 'I had a great experience with this travel agency. Even though I was stressed and had a few moments of frustration because it was my first time and I wasn\u2019t familiar with the process, they handled everything with patience and professionalism. Special thanks to Mohammad for assisting me throughout the entire process. He remained calm, professional, and very helpful, making everything much easier for me. I truly appreciate the excellent customer service and highly recommend this agency!'
    },
    {
        name: 'Shirin Shafiee',
        initial: 'S',
        when: 'Aug 2026',
        country: '',
        flag: '',
        text: 'Happy with their service! Special thanks to Mohammad\u2026 he was very patient and answered all my questions. All my documents were completed and the whole process was very smooth! Thank you!'
    },
    {
        name: 'NegiN',
        initial: 'N',
        when: 'Aug 2026',
        country: 'Iceland',
        flag: 'is',
        text: 'I cannot thank Mohammad enough for all his help and support throughout my Iceland visa application. He was professional, knowledgeable, and always patient in answering my questions. Thanks to his guidance, the whole process was much less stressful, and I was delighted to receive my visa. I truly appreciate all the time and effort he put into helping me. I highly recommend Mohammad to anyone looking for reliable and professional visa assistance. Thank you again for everything!'
    }
];

const FAQS = [
    {
        q: 'What does Visalade actually do?',
        a: 'We are a private visa consultancy, not a government body. We check which visa you need, build your document checklist, complete and review your application, book your appointment at the visa application centre, and tell you how to track the decision. The embassy or consulate still makes the decision.'
    },
    {
        q: 'Are you an official visa service?',
        a: 'No. Visalade is an independent UK consultancy. We are not affiliated with any embassy, consulate, VFS Global, TLScontact, BLS or the EU. You can apply directly yourself; our fee is for preparation, checking and hands-on support.'
    },
    {
        q: 'Do I need a Schengen visa with a UK passport?',
        a: 'For short tourism, business or family visits, a UK passport holder can travel to the Schengen area without a visa for up to 90 days in any 180-day period. You will still need to meet the entry rules, including passport validity and travel insurance where applicable. If you hold another passport, the visa requirement depends on your nationality.'
    },
    {
        q: 'I live in the UK on a non-UK passport. Can you help?',
        a: 'Yes. Most of our clients are UK residents travelling on a non-UK passport. We check your immigration status, your eVisa share code or legacy BRP, and the length of your leave to remain, because the consulate will want to see that you can legally return to the UK.'
    },
    {
        q: 'Which Schengen country should I apply to?',
        a: 'Apply to the country where you will spend the most nights. If you are spending an equal number of nights in more than one country, apply to the country you enter first. If you are only transiting, different rules apply. We confirm the correct consulate before you pay a visa fee.'
    },
    {
        q: 'How much does it cost?',
        a: 'Our service fees start at &pound;99 for appointment booking, &pound;165 for full application support and &pound;250 for premium support. Government and visa-centre fees are separate and are paid directly to the official channels. We quote everything in writing before you pay.'
    },
    {
        q: 'Can I start with a deposit?',
        a: 'Yes. Full application support and premium support can be started with a &pound;49 deposit per traveller. The balance is due once your appointment is booked, or before we submit an application that does not need an appointment. There is no interest and no extra fee.'
    },
    {
        q: 'How long does a Schengen visa take?',
        a: 'Most applications are decided within 15 calendar days of the consulate receiving the file, and many are faster. Complex files can take up to 45 days. Appointment availability varies by country and season, so we recommend starting four to six weeks before travel.'
    },
    {
        q: 'Can you book my appointment?',
        a: 'Yes. We monitor appointment availability at the UK visa application centres for your destination and book a slot in your name. If you already have a slot, we can build the rest of the application around it.'
    },
    {
        q: 'What documents will I need?',
        a: 'Usually a passport, two recent photographs, the completed application form, travel insurance with at least &euro;30,000 cover, flight reservations, proof of accommodation, bank statements, proof of employment or study, and evidence of your immigration status in the UK. The exact list depends on your destination and purpose of travel; we build a personalised checklist.'
    },
    {
        q: 'Do you guarantee approval?',
        a: 'No one can. The decision is made solely by the embassy or consulate. What we can do is make sure your file is complete, consistent and presented in the way the decision-maker expects, and tell you honestly if something is likely to cause a problem.'
    },
    {
        q: 'What happens if my visa is refused?',
        a: 'We will explain the refusal reasons and set out your options: an appeal where one is available, a fresh application, or a change of plan. Premium clients get a full post-decision review. Government fees are not refundable, and our refund policy explains which service fees are.'
    }
];

const BLOG_POSTS = [
    {
        slug: 'schengen-visa-documents-checklist',
        title: 'The Schengen visa documents that actually get checked',
        description: 'A practical checklist of the documents UK-based applicants should prepare for a Schengen visa, and the small mistakes that cause most delays.',
        category: 'Documents',
        date: '12 October 2026',
        iso: '2026-10-12',
        read: '7 min read',
        imgId: 'photo-1450101499163-c8848c66ca85',
        alt: 'Application paperwork and a passport on a desk',
        excerpt: 'Most refusals are not dramatic. They come from a missing bank statement, an inconsistent date or a hotel booking that does not match the itinerary. Here is what to prepare, in order.',
        body: `
<p>Every Schengen consulate publishes its own document list, but the core file is remarkably consistent. What changes is the evidence the decision-maker wants to see for your particular trip. The aim is simple: prove who you are, why you are travelling, that you can afford it, and that you will come back.</p>
<h2>1. Identity and status</h2>
<p>Start with your passport. It should be valid for at least three months beyond your planned return date and issued within the last ten years. Include your UK residence permit, eVisa share code or legacy BRP if you are not a British citizen. If your name has changed, add the marriage certificate or deed poll.</p>
<h2>2. The application form and photographs</h2>
<p>The form must match your passport exactly, including middle names and the order of your names. Two recent colour photographs, taken to the current Schengen specification, are normally required. Do not reuse a photo from an old application.</p>
<h2>3. Travel and accommodation</h2>
<p>Flight reservations should show your name and the dates you have declared. Hotel bookings should cover every night of the trip. If you are staying with friends or family, include an invitation letter, proof of their address and a copy of their residence permit or ID. A gap in accommodation is one of the most common reasons a file is sent back.</p>
<h2>4. Money</h2>
<p>Most consulates ask for three to six months of bank statements. They are looking for regular income, a balance that is consistent with the trip you have planned, and no unexplained large deposits made just before applying. If a relative is funding you, add their statements and a signed sponsorship letter.</p>
<h2>5. Employment, study or business</h2>
<p>Employees should provide a recent letter from their employer confirming role, salary and approved leave. Self-employed applicants should add business registration, recent invoices and tax returns. Students need a letter from their school or university. Retirees can provide pension statements.</p>
<h2>6. Insurance</h2>
<p>Travel insurance must cover the whole Schengen area for the full trip and include at least &euro;30,000 of medical emergency cover, including repatriation. A policy that starts a day late or covers only one country is a common and avoidable problem.</p>
<h2>7. The cover letter</h2>
<p>A short, factual cover letter ties the file together: who you are, where you are going, why, how you are paying, and when you are returning. It is not a place for long stories. One page, plain language, no contradictions with the rest of the evidence.</p>
<h2>What we check before anything is submitted</h2>
<p>We read the whole file as a decision-maker would. Dates, names, balances and bookings all have to agree. If something does not add up, we tell you before the appointment rather than after a refusal. That is the part most applicants cannot do for their own paperwork, because they know what they meant to write.</p>
<p>If you would like a second pair of eyes, send us your destination and travel dates on WhatsApp. We will tell you what your file needs.</p>`
    },
    {
        slug: 'which-schengen-country-to-apply-to',
        title: 'Which Schengen country should you apply to?',
        description: 'The main-destination rule explained, with examples for multi-country trips, transit and equal-length stays.',
        category: 'Planning',
        date: '28 September 2026',
        iso: '2026-09-28',
        read: '5 min read',
        imgId: 'photo-1488646953014-85cb44e25828',
        alt: 'A map and travel notes on a table',
        excerpt: 'Applying to the wrong consulate is one of the easiest ways to lose weeks. The rule is simpler than most people expect, but the exceptions matter.',
        body: `
<p>You cannot simply pick the Schengen country with the easiest appointment. The consulate that receives your application must have jurisdiction over your trip. Get this wrong and the file can be refused or returned without being assessed.</p>
<h2>The main-destination rule</h2>
<p>Apply to the country where you will spend the most nights. That is the main destination. The country you fly into is irrelevant if you move on the next day.</p>
<p><strong>Example:</strong> you fly to Paris, spend two nights there, take the train to Amsterdam for four nights, then fly home from Amsterdam. Your main destination is the Netherlands, so you apply to the Dutch consulate, even though you entered through France.</p>
<h2>When the nights are equal</h2>
<p>If you are spending the same number of nights in two or more countries, apply to the country you enter first. Keep the bookings and travel tickets that show the order of travel.</p>
<p><strong>Example:</strong> three nights in Portugal, three nights in Spain, entering through Lisbon. You apply to Portugal.</p>
<h2>Day trips and transits</h2>
<p>A day trip does not usually change the main destination, because you are not spending the night. Airport transit is different: some nationalities need an airport transit visa even if they never leave the terminal. Check this before booking a connecting flight.</p>
<h2>Cruises and multi-country tours</h2>
<p>For a cruise, the main destination is normally the port where the ship starts or ends, or the country with the most port calls, depending on the itinerary. Tour operators should provide a schedule you can submit. If the trip is packaged, ask the operator which consulate they expect you to use.</p>
<h2>What if I am visiting family?</h2>
<p>The same rule applies, but you will also need an invitation letter and evidence of the host's status. If you are staying with family in one country and touring others, count the nights, not the emotional centre of the trip.</p>
<h2>Why the appointment is not the deciding factor</h2>
<p>Appointment availability changes weekly. Choosing a consulate because it has a slot next Tuesday, when another country is clearly your main destination, creates a mismatch the decision-maker will notice. We check jurisdiction first, then build the timetable around the correct consulate.</p>
<p>Tell us your route and we will confirm which country should receive the application before you pay any government fee.</p>`
    },
    {
        slug: 'schengen-visa-refusal-next-steps',
        title: 'Refused a Schengen visa? Read this before you reapply',
        description: 'What a refusal letter actually means, when an appeal is worth it, and how to fix the file for a fresh application.',
        category: 'After the decision',
        date: '6 October 2026',
        iso: '2026-10-06',
        read: '6 min read',
        imgId: 'photo-1521791136064-7986c2920216',
        alt: 'Two people reviewing documents across a desk',
        excerpt: 'A refusal is not the end of the trip, but reapplying with the same file rarely works. Start with the reasons on the letter, not with a new booking.',
        body: `
<p>Schengen refusal letters use a standard form. The consulate ticks one or more reasons, and those reasons are the only useful starting point. Before you book another appointment, read them carefully and match each one to the evidence you submitted.</p>
<h2>The common reasons</h2>
<ul>
<li><strong>Purpose of travel not established.</strong> The itinerary, bookings and cover letter did not add up, or the stated reason was too vague.</li>
<li><strong>Insufficient means of subsistence.</strong> The bank balance did not support the length or style of the trip, or the money arrived too recently.</li>
<li><strong>No proof of accommodation.</strong> A night was uncovered, or the booking name did not match the applicant.</li>
<li><strong>No proof of return.</strong> Employment, study, family or property ties to the UK were thin.</li>
<li><strong>Insurance does not cover the trip.</strong> Wrong dates, wrong territory or insufficient cover.</li>
<li><strong>Information not reliable.</strong> Contradictions between documents, or altered evidence.</li>
</ul>
<h2>Should you appeal?</h2>
<p>An appeal is usually available where the refusal cites a procedural error or where you believe the decision was wrong on the evidence you actually supplied. It is not a way to add new documents. Deadlines are short and vary by country. If the refusal is about missing evidence, a fresh application is usually faster and stronger.</p>
<h2>Do not simply rebook everything</h2>
<p>New flight and hotel bookings do not fix a file that was refused for weak financial evidence. Work out which reason applies, then change the evidence. If the trip is no longer realistic, changing the dates or the length of stay can be the honest fix.</p>
<h2>What a stronger file looks like</h2>
<ul>
<li>A cover letter that addresses the refusal reason directly, without arguing with the consulate.</li>
<li>Bank statements covering a longer period, with a clear explanation of any large deposits.</li>
<li>Employment or study evidence that shows a reason to return to the UK.</li>
<li>Accommodation and travel bookings that match the new dates exactly.</li>
<li>Insurance that covers the full trip and all Schengen countries.</li>
</ul>
<h2>How we handle refusals</h2>
<p>Our premium service includes a post-decision review. We read the refusal letter, compare it with the file that was submitted, and tell you whether an appeal or a fresh application makes more sense. We will not promise an approval, but we will tell you what needs to change.</p>
<p>If you have a refusal letter and a trip still to plan, send us the reasons. The first conversation is free.</p>`
    }
];

module.exports = { COUNTRIES, REVIEWS, FAQS, BLOG_POSTS };
