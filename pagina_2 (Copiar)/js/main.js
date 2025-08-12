document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Menú hamburguesa y funcionalidades del header
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Cambiar header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // =============================================
    // Animaciones para el contenido
    // =============================================
    // Animaciones para el texto del héroe
    const animateTexts = document.querySelectorAll('.animate-text');
    animateTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('show');
        }, index * 300);
    });

    // Animaciones para las tarjetas de misión/visión y objetivos
    const animateCards = document.querySelectorAll('.animate-card');
    animateCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, 300 + (index % 3) * 200);
    });

    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('value-slide')) {
                    entry.target.style.display = 'block';
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                } else {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 100);
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const hiddenElements = document.querySelectorAll('.hidden, .value-slide');
    hiddenElements.forEach(el => observer.observe(el));

    // Efecto hover para las tarjetas
    const cards = document.querySelectorAll('.objective-item, .value-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // =============================================
    // Carrusel de valores
    // =============================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.value-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        slides[currentSlide].style.animation = 'fadeIn 0.8s ease';
    }

    // Event listeners para controles del carrusel
    document.querySelector('.carousel-prev')?.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    document.querySelector('.carousel-next')?.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Inicializar el carrusel
    if (slides.length > 0) {
        showSlide(0);
    }


      
        
    
});