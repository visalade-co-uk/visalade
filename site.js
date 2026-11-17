(function () {
    'use strict';

    var doc = document;

    /* ------------------------------------------------------------ header */

    var header = doc.getElementById('siteHeader');

    function onScroll() {
        if (!header) return;
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ----------------------------------------------------------- dark mode */
    var themeToggle = doc.getElementById('themeToggle');
    function applyTheme(dark) {
        doc.documentElement.classList.toggle('dark', dark);
        if (themeToggle) themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
        try { localStorage.setItem('visalade-theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    }
    if (themeToggle) {
        var isDark = doc.documentElement.classList.contains('dark');
        themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        themeToggle.addEventListener('click', function () {
            applyTheme(!doc.documentElement.classList.contains('dark'));
        });
    }

    /* ----------------------------------------------------- smooth scroll (Lenis) */
    var lenis = null;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion && window.Lenis) {
        lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        lenis.on('scroll', onScroll);
    }

    /* ------------------------------------------------------- mobile menu */

    var menuBtn = doc.getElementById('menuBtn');
    var mobileNav = doc.getElementById('mobileNav');

    function setMenu(open) {
        if (!menuBtn || !mobileNav) return;
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menuBtn.innerHTML = open
            ? '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
            : '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
        mobileNav.hidden = !open;
        doc.body.style.overflow = open ? 'hidden' : '';
        if (lenis) { if (open) lenis.stop(); else lenis.start(); }
    }

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function () {
            setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
        });

        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });

        doc.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setMenu(false);
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 1040) setMenu(false);
    });

    /* ------------------------------------------------------------- reveal */

    // Enhanced scroll reveals: staggered delays and slide/scale variants.
    doc.querySelectorAll('.steps, .dgrid, .cards3, .price-grid, .post-grid, .reviews').forEach(function (group) {
        Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) {
            el.classList.add(i % 2 === 0 ? 'reveal--left' : 'reveal--right');
            el.style.transitionDelay = (i * 0.07) + 's';
        });
    });

    doc.querySelectorAll('.section-head.reveal').forEach(function (el) {
        el.classList.add('reveal--scale');
    });

    var revealItems = doc.querySelectorAll('.reveal');

    function showAll() {
        revealItems.forEach(function (el) { el.classList.add('is-in'); });
    }

    if ('IntersectionObserver' in window && revealItems.length) {
        var revealed = 0;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    revealed += 1;
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

        revealItems.forEach(function (el) { io.observe(el); });

        // Safety net: if the visitor scrolls but the observer has not revealed
        // anything (observer unavailable/blocked), show everything rather than
        // leaving content invisible.
        var fallbackTimer = null;
        function armFallback() {
            if (fallbackTimer) return;
            fallbackTimer = window.setTimeout(function () {
                if (revealed === 0) showAll();
            }, 1200);
        }
        window.addEventListener('scroll', armFallback, { passive: true });
        window.addEventListener('wheel', armFallback, { passive: true });
        window.addEventListener('touchmove', armFallback, { passive: true });
    } else {
        showAll();
    }

    /* ---------------------------------------------------------------- FAQ */

    doc.querySelectorAll('.faq__q').forEach(function (btn) {
        var panel = doc.getElementById(btn.getAttribute('aria-controls'));
        if (!panel) return;

        btn.addEventListener('click', function () {
            var isOpen = btn.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                btn.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = panel.scrollHeight + 'px';
                window.requestAnimationFrame(function () {
                    panel.style.maxHeight = '0px';
                });
                window.setTimeout(function () {
                    panel.hidden = true;
                    panel.style.maxHeight = '';
                }, 320);
                return;
            }

            btn.setAttribute('aria-expanded', 'true');
            panel.hidden = false;
            panel.style.maxHeight = '0px';
            window.requestAnimationFrame(function () {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            });
            window.setTimeout(function () {
                panel.style.maxHeight = 'none';
            }, 340);
        });
    });

    /* ---------------------------------------------------- destination grid */

    var grid = doc.getElementById('destGrid');

    if (grid) {
        var cards = Array.prototype.slice.call(grid.querySelectorAll('.dcard'));
        var chips = Array.prototype.slice.call(doc.querySelectorAll('[data-filter]'));
        var search = doc.getElementById('destSearch');
        var count = doc.getElementById('destCount');
        var empty = doc.getElementById('destEmpty');
        var region = 'all';

        function applyFilter() {
            var q = (search && search.value ? search.value : '').trim().toLowerCase();
            var shown = 0;

            cards.forEach(function (card) {
                var matchesRegion = region === 'all' || card.getAttribute('data-region') === region;
                var haystack = (card.getAttribute('data-name') || '') + ' ' + card.textContent.toLowerCase();
                var matchesSearch = !q || haystack.indexOf(q) !== -1;
                var show = matchesRegion && matchesSearch;
                card.classList.toggle('is-hidden', !show);
                if (show) shown += 1;
            });

            if (count) count.textContent = 'Showing ' + shown + (shown === 1 ? ' country' : ' countries');
            if (empty) empty.hidden = shown !== 0;
        }

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                chips.forEach(function (c) { c.classList.remove('is-active'); });
                chip.classList.add('is-active');
                region = chip.getAttribute('data-filter');
                applyFilter();
            });
        });

        if (search) {
            var params = new URLSearchParams(window.location.search);
            var initial = params.get('q');
            if (initial) search.value = initial;
            search.addEventListener('input', applyFilter);
        }

        applyFilter();
    }

    /* ------------------------------------------------------------- apply */

    var form = doc.getElementById('applyForm');

    if (form) {
        form.noValidate = true;

        var steps = Array.prototype.slice.call(form.querySelectorAll('.form-step'));
        var bar = doc.getElementById('formBar');
        var label = doc.getElementById('stepLabel');
        var current = 0;

        function scrollToForm() {
            var top = form.getBoundingClientRect().top + window.scrollY - 110;
            if (lenis) {
                lenis.scrollTo(Math.max(0, top), { duration: 1.1 });
            } else {
                window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
            }
        }

        function showStep(index, shouldScroll) {
            current = Math.max(0, Math.min(steps.length - 1, index));
            steps.forEach(function (step, i) {
                step.classList.toggle('is-active', i === current);
            });
            if (bar) bar.style.width = ((current + 1) / steps.length * 100) + '%';
            if (label) label.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + ' \u00b7 ' + (current === 0 ? 'Your trip' : current === 1 ? 'Who is travelling' : 'Anything else');

            if (!shouldScroll) return;
            var top = form.getBoundingClientRect().top + window.scrollY - 110;
            if (window.scrollY > top || window.scrollY < top - 400) scrollToForm();
        }

        function validateStep(index) {
            var fields = steps[index].querySelectorAll('input, select, textarea');
            var valid = true;

            fields.forEach(function (field) {
                if (!field.checkValidity()) {
                    field.reportValidity();
                    valid = false;
                }
            });

            return valid;
        }

        form.querySelectorAll('[data-next]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (validateStep(current)) showStep(current + 1, true);
            });
        });

        form.querySelectorAll('[data-prev]').forEach(function (btn) {
            btn.addEventListener('click', function () { showStep(current - 1, true); });
        });

        form.addEventListener('submit', function (event) {
            for (var i = 0; i < steps.length; i += 1) {
                if (!validateStep(i)) {
                    event.preventDefault();
                    showStep(i);
                    return;
                }
            }
        });

        var params = new URLSearchParams(window.location.search);
        var packageChoice = params.get('package');
        var destination = params.get('destination');
        var packageField = form.querySelector('[name="package"]');
        var destinationField = form.querySelector('[name="destination"]');

        if (packageChoice && packageField) packageField.value = packageChoice;
        if (destination && destinationField) destinationField.value = destination;

        showStep(0, false);
    }

    /* ------------------------------------------------------------- cookie */

    var cookieBar = doc.getElementById('cookieBar');
    var COOKIE_KEY = 'Visalade-cookie-choice';

    if (cookieBar) {
        var stored = null;
        try { stored = window.localStorage.getItem(COOKIE_KEY); } catch (e) { stored = null; }
        cookieBar.hidden = Boolean(stored);

        cookieBar.querySelectorAll('[data-cookie]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                try { window.localStorage.setItem(COOKIE_KEY, btn.getAttribute('data-cookie')); } catch (e) { /* ignore */ }
                cookieBar.hidden = true;
            });
        });
    }

    window.selectDestinationAndApply = function(countryName) {
        if (!countryName) return;
        var slug = countryName.toLowerCase().replace(/ /g, '-').replace(/[^a-z-]/g, '');
        window.location.href = 'country.html?dest=' + encodeURIComponent(slug);
    };
})();

window.toggleMobileMenu = function() {
    var m = document.getElementById("mobileMenu");
    if (m) m.classList.toggle("hidden");
};
