document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle (Hamburger)
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    let hamburger = document.querySelector('.hamburger-menu');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-label', 'Toggle Navigation');
        if (nav) {
            nav.prepend(hamburger);
        }
    }

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // 2. Smooth Scrolling for Internal Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                navUl.classList.remove('active');
            }
        });
    });

    // 3. Contact Form Validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            let errorMessage = '';

            if (!name.value.trim()) {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            if (!email.value.trim() || !email.value.includes('@')) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!message.value.trim()) {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
            }

            if (!isValid) {
                alert(errorMessage);
            } else {
                alert('Thank you! Your message has been successfully sent.');
                contactForm.reset();
            }
        });
    }
});