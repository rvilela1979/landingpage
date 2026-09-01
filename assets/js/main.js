document.addEventListener('DOMContentLoaded', () => {
    /* Header + hero initial reveal */
    setTimeout(() => document.querySelector('header').classList.add('loaded'), 100);
    setTimeout(() => {
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.classList.add('reveal-active');
    }, 400);

    /* Mobile menu toggle */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    /* Scroll reveal observer */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.querySelector('.text-reveal-wrapper')) {
                    entry.target.classList.add('reveal-active');
                }
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* Accordion (Funcionalidades / Últimas Dúvidas / FAQ) */
    document.querySelectorAll('[data-accordion-trigger]').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            const chevron = btn.querySelector('[data-chevron]');
            const group = btn.closest('[id$="-accordion"]');
            if (group) {
                group.querySelectorAll('[data-accordion-panel]').forEach(p => { if (p !== panel) p.classList.add('hidden'); });
                group.querySelectorAll('[data-chevron]').forEach(c => { if (c !== chevron) c.classList.remove('rotate-180'); });
            }
            panel.classList.toggle('hidden');
            if (chevron) chevron.classList.toggle('rotate-180');
        });
    });

    /* Proposta de Valor screenshot carousel */
    const carouselImg = document.getElementById('value-carousel-img');
    if (carouselImg) {
        const slides = [
            'assets/img/screenshots/dashboard-print-5.jpeg',
            'assets/img/screenshots/dashboard-print-1.jpeg',
            'assets/img/screenshots/dashboard-print-2.jpeg',
            'assets/img/screenshots/dashboard-print-3.jpeg',
            'assets/img/screenshots/dashboard-print-4.jpeg'
        ];
        let current = 0;
        const dots = document.querySelectorAll('[data-carousel-dot]');
        function goTo(index) {
            current = (index + slides.length) % slides.length;
            carouselImg.style.opacity = 0;
            setTimeout(() => {
                carouselImg.src = slides[current];
                carouselImg.style.opacity = 1;
            }, 250);
            dots.forEach(d => d.classList.toggle('bg-teal-600', +d.dataset.carouselDot === current));
            dots.forEach(d => d.classList.toggle('bg-stone-300', +d.dataset.carouselDot !== current));
        }
        document.querySelector('[data-carousel-prev]').addEventListener('click', () => goTo(current - 1));
        document.querySelector('[data-carousel-next]').addEventListener('click', () => goTo(current + 1));
        dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.carouselDot)));
    }

    /* Reforma Tributária photo carousel */
    const rtImg = document.querySelector('[data-rt-carousel-img]');
    if (rtImg) {
        const rtSlides = [
            { src: 'assets/img/photos/evento-reforma-tributaria.jpg', caption: 'RExperts no palco do <span class="font-semibold text-stone-900">CIMI 360</span>, mostrando como a reforma tributária muda a viabilidade dos empreendimentos imobiliários.' },
            { src: 'assets/img/photos/Photo-19-03-26-16-14-16-22.jpg', caption: 'Palestra no <span class="font-semibold text-stone-900">GRI Campinas</span>, destrinchando o efeito da reforma tributária na viabilidade econômico-financeira dos projetos.' },
            { src: 'assets/img/photos/WhatsApp-Image-2025-10-24-at-16.33.00-1.jpeg', caption: 'No <span class="font-semibold text-stone-900">Adit Invest</span>, em Balneário Camboriú/SC, debatendo como a reforma tributária redesenha a conta de cada empreendimento.' },
            { src: 'assets/img/photos/allrea.jpeg', caption: 'Painel no <span class="font-semibold text-stone-900">Allrea Wave</span>, em Campinas/SP, discutindo viabilidade de incorporações e loteamentos com outros players do mercado.' },
            { src: 'assets/img/photos/treinamento-in-loco-einstein.jpg', caption: 'Treinamento in loco com a equipe de patrimônio e Real Estate do <span class="font-semibold text-stone-900">Einstein</span>, aprofundando os efeitos da reforma tributária no setor imobiliário.' }
        ];
        let rtCurrent = 0;
        const rtCaption = document.querySelector('[data-rt-carousel-caption]');
        const rtDots = document.querySelectorAll('[data-rt-carousel-dot]');
        function rtGoTo(index) {
            rtCurrent = (index + rtSlides.length) % rtSlides.length;
            rtImg.style.opacity = 0;
            setTimeout(() => {
                rtImg.src = rtSlides[rtCurrent].src;
                rtCaption.innerHTML = rtSlides[rtCurrent].caption;
                rtImg.style.opacity = 1;
            }, 250);
            rtDots.forEach(d => d.classList.toggle('bg-teal-600', +d.dataset.rtCarouselDot === rtCurrent));
            rtDots.forEach(d => d.classList.toggle('bg-stone-300', +d.dataset.rtCarouselDot !== rtCurrent));
        }
        document.querySelector('[data-rt-carousel-prev]').addEventListener('click', () => rtGoTo(rtCurrent - 1));
        document.querySelector('[data-rt-carousel-next]').addEventListener('click', () => rtGoTo(rtCurrent + 1));
        rtDots.forEach(d => d.addEventListener('click', () => rtGoTo(+d.dataset.rtCarouselDot)));
    }
});
