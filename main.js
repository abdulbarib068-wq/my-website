/* ============================================
   Mid Night Café — Main JavaScript
   GSAP + ScrollTrigger + Locomotive Scroll
   ============================================ */

(function () {
    'use strict';

    /* ---- DOM References ---- */
    const preloader = document.getElementById('preloader');
    const navbar = document.getElementById('navbar');
    const navHamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const heroParticles = document.getElementById('hero-particles');
    const menuGrid = document.getElementById('menu-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const contactForm = document.getElementById('contact-form');

    /* ============================================
       PRELOADER
       ============================================ */
    function hidePreloader() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Initialize everything after preloader
            initAnimations();
        }, 2500);
    }

    /* ============================================
       HERO PARTICLES
       ============================================ */
    function createParticles() {
        if (!heroParticles) return;
        const count = window.innerWidth < 768 ? 25 : 50;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (1 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            heroParticles.appendChild(particle);
        }
    }

    /* ============================================
       NAVIGATION
       ============================================ */

    // Scroll-based navbar styling
    function handleNavScroll() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile hamburger toggle
    function toggleMobileMenu() {
        navHamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Active link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll for nav links
    function smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;
        const offset = 80;
        const targetPosition = target.offsetTop - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    /* ============================================
       GSAP ANIMATIONS
       ============================================ */
    function initAnimations() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // ---- Hero Entrance ---- 
        const heroTl = gsap.timeline({ delay: 0.2 });

        heroTl
            .to('.hero-badge', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
            .to('.title-word', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power4.out'
            }, '-=0.4')
            .to('.hero-tagline', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.hero-cta-group', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-image-wrapper', {
                opacity: 0,
                scale: 0.8,
                rotation: -5,
                duration: 1.2,
                ease: 'power3.out'
            }, '-=0.8')
            .from('.scroll-indicator', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.3');

        // ---- Section Headers Reveal ----
        gsap.utils.toArray('.section-header').forEach(header => {
            const label = header.querySelector('.section-label');
            const titleLines = header.querySelectorAll('.title-reveal');
            const subtitle = header.querySelector('.section-subtitle');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    end: 'bottom 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            if (label) {
                tl.from(label, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            }

            if (titleLines.length) {
                tl.from(titleLines, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power4.out'
                }, '-=0.3');
            }

            if (subtitle) {
                tl.from(subtitle, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.4');
            }
        });

        // ---- About Section ----
        gsap.from('.about-image-wrapper', {
            scrollTrigger: {
                trigger: '.about-image-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -60,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.about-lead', {
            scrollTrigger: {
                trigger: '.about-lead',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.about-body', {
            scrollTrigger: {
                trigger: '.about-text-col',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Stats counter animation
        gsap.from('.about-stats', {
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                onEnter: () => animateCounters()
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                x: 0,
                duration: 0.7,
                delay: index * 0.15,
                ease: 'power3.out'
            });
        });

        // ---- Menu Cards ----
        gsap.utils.toArray('.menu-card').forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: (index % 3) * 0.15,
                ease: 'power3.out'
            });
        });

        // Menu filters
        gsap.from('.menu-filters', {
            scrollTrigger: {
                trigger: '.menu-filters',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        });

        // ---- Gallery Items ----
        gsap.utils.toArray('.gallery-item').forEach((item, index) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                scale: 1,
                duration: 0.9,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // ---- Gallery Parallax ----
        gsap.utils.toArray('.gallery-image').forEach(img => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img.closest('.gallery-item'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -40,
                ease: 'none'
            });
        });

        // ---- Contact Section ----
        gsap.from('.contact-form-wrapper', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.info-card', {
            scrollTrigger: {
                trigger: '.contact-info-cards',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: 40,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
        });

        gsap.from('.contact-map', {
            scrollTrigger: {
                trigger: '.contact-map',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.social-link', {
            scrollTrigger: {
                trigger: '.social-links',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });

        // ---- Footer ----
        gsap.from('.footer-top', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });

        // ---- Parallax on Hero ----
        gsap.to('.hero-floating-elements', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: 'none'
        });

        gsap.to('.hero-image-wrapper', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -60,
            rotation: 5,
            ease: 'none'
        });

        gsap.to('.hero-text-wrapper', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -40,
            opacity: 0.3,
            ease: 'none'
        });
    }

    /* ============================================
       COUNTER ANIMATION
       ============================================ */
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Easing: ease-out
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.round(easeProgress * target);

                counter.textContent = currentValue.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    /* ============================================
       MENU FILTER
       ============================================ */
    function initMenuFilter() {
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                const cards = document.querySelectorAll('.menu-card');

                cards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category.includes(filter)) {
                        gsap.to(card, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: 'power3.out',
                            onStart: () => { card.style.display = ''; }
                        });
                    } else {
                        gsap.to(card, {
                            opacity: 0,
                            scale: 0.9,
                            duration: 0.3,
                            ease: 'power3.in',
                            onComplete: () => { card.style.display = 'none'; }
                        });
                    }
                });
            });
        });
    }

    /* ============================================
       CONTACT FORM
       ============================================ */
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('form-submit');
            const originalText = submitBtn.querySelector('span').textContent;

            // Animate submit
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.style.pointerEvents = 'none';

            gsap.to(submitBtn, {
                scale: 0.96,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = 'Message Sent! ✦';
                        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';

                        gsap.from(submitBtn, {
                            scale: 0.95,
                            duration: 0.3,
                            ease: 'back.out(2)'
                        });

                        // Reset after delay
                        setTimeout(() => {
                            submitBtn.querySelector('span').textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.style.pointerEvents = '';
                            contactForm.reset();
                        }, 3000);
                    }, 1000);
                }
            });
        });
    }

    /* ============================================
       3D TILT EFFECT ON CARDS
       ============================================ */
    function initCardTilt() {
        const cards = document.querySelectorAll('.menu-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -4;
                const rotateY = (x - centerX) / centerX * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    /* ============================================
       MAGNETIC BUTTONS
       ============================================ */
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .nav-cta, .social-link');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    /* ============================================
       CUSTOM CURSOR GLOW (Desktop only)
       ============================================ */
    function initCursorGlow() {
        if (window.innerWidth < 1024) return;

        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    /* ============================================
       EVENT LISTENERS
       ============================================ */
    function bindEvents() {
        // Scroll events
        window.addEventListener('scroll', () => {
            handleNavScroll();
            updateActiveLink();
        }, { passive: true });

        // Hamburger
        if (navHamburger) {
            navHamburger.addEventListener('click', toggleMobileMenu);
        }

        // Nav links smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                smoothScrollTo(targetId);
            });
        });

        // Close mobile menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }

    /* ============================================
       INITIALIZE
       ============================================ */
    function init() {
        createParticles();
        bindEvents();
        initMenuFilter();
        initContactForm();
        initCardTilt();
        initMagneticButtons();
        initCursorGlow();
        hidePreloader();
    }

    // Start on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
