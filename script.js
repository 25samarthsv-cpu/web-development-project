document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. Mobile menu (hamburger) ---------- */
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    if (nav && navUl) {
        const hamburger = document.createElement('button');
        hamburger.type = 'button';
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '&#9776;';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-menu');
        nav.insertBefore(hamburger, navUl);

        const setMenu = (open) => {
            navUl.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
            hamburger.innerHTML = open ? '&times;' : '&#9776;';
        };

        hamburger.addEventListener('click', () => {
            setMenu(!navUl.classList.contains('active'));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });

        // Close menu after choosing a link
        navUl.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenu(false));
        });
    }

    /* ---------- 2. Highlight the current section in the nav ---------- */
    const navLinks = document.querySelectorAll('nav ul a[href^="#"]');
    const sections = Array.from(navLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            'active-link',
                            link.getAttribute('href') === '#' + entry.target.id
                        );
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach((section) => observer.observe(section));
    }

    /* ---------- 3. Back-to-top button ---------- */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.hidden = window.scrollY < 400;
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- 4. Contact form validation ---------- */
    const form = document.querySelector('#contact form');
    if (!form) return;

    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('name-error'),
            check: (v) => (v.length < 2 ? 'Please enter your name (at least 2 characters).' : '')
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('email-error'),
            check: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                ? '' : 'Please enter a valid email, like name@example.com.')
        },
        message: {
            input: document.getElementById('message'),
            error: document.getElementById('message-error'),
            check: (v) => (v.length < 10 ? 'Please write a message of at least 10 characters.' : '')
        }
    };
    const status = document.getElementById('form-status');

    const validateField = (field) => {
        const msg = field.check(field.input.value.trim());
        field.error.textContent = msg;
        field.input.classList.toggle('invalid', Boolean(msg));
        field.input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        return !msg;
    };

    // Live feedback as the user leaves or edits a field
    Object.values(fields).forEach((field) => {
        field.input.addEventListener('blur', () => validateField(field));
        field.input.addEventListener('input', () => {
            if (field.input.classList.contains('invalid')) validateField(field);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = '';

        const results = Object.values(fields).map(validateField);
        const firstInvalid = Object.values(fields).find((f) => f.input.classList.contains('invalid'));

        if (results.every(Boolean)) {
            status.textContent = 'Thank you! Your message has been sent.';
            form.reset();
        } else if (firstInvalid) {
            firstInvalid.input.focus();
        }
    });
});
