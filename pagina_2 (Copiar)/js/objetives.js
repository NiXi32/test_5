document.addEventListener('DOMContentLoaded', function() {
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

    // Configuración del Intersection Observer para las tarjetas de valores y otros elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Usamos la animación fadeIn para los slides del carrusel
                if (entry.target.classList.contains('value-slide')) {
                    entry.target.style.display = 'block';
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                } else {
                    // Para otros elementos usamos la clase show
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 100);
                }
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase 'hidden' y los slides del carrusel
    const hiddenElements = document.querySelectorAll('.hidden, .value-slide');
    hiddenElements.forEach(el => observer.observe(el));

    // Efecto hover para las tarjetas (incluyendo objective-item y value-card)
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

    // Control del carrusel de valores
    let currentSlide = 0;
    const slides = document.querySelectorAll('.value-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Disparar la animación cuando se activa el slide
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