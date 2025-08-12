// security.js - Efectos interactivos para la página de Alcance

document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración inicial de seguridad
    'use strict';
    
    // 2. Efectos para los marcadores del mapa
    function setupMapMarkers() {
        const markers = document.querySelectorAll('.location-marker');
        if (!markers) return;

        markers.forEach(marker => {
            // Prevenir múltiples listeners
            if (marker.dataset.listenerAdded) return;
            marker.dataset.listenerAdded = 'true';

            const popup = marker.querySelector('.marker-popup');
            const dot = marker.querySelector('.marker-dot');

            // Efecto hover mejorado
            marker.addEventListener('mouseenter', () => {
                dot.style.transform = 'scale(1.5)';
                if (popup) {
                    popup.style.transform = 'translateY(-50%) scale(1)';
                    popup.style.opacity = '1';
                }
            });

            marker.addEventListener('mouseleave', () => {
                dot.style.transform = 'scale(1)';
                if (popup) {
                    popup.style.transform = 'translateY(-50%) scale(0)';
                    popup.style.opacity = '0';
                }
            });

            // Click para dispositivos táctiles
            marker.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    popup.classList.toggle('active-mobile');
                }
            });
        });
    }

    // 3. Carrusel automático seguro
    function setupCarousel() {
        const carousel = document.querySelector('.value-carousel');
        if (!carousel) return;

        let currentSlide = 0;
        const slides = document.querySelectorAll('.value-slide');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        let autoSlideInterval;

        function showSlide(index) {
            // Validar índice
            index = Math.max(0, Math.min(index, slides.length - 1));
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }

        // Iniciar carrusel
        showSlide(0);
        startAutoSlide();

        // Controles manuales
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoSlide(); // Reiniciar autoplay al interacción manual
            });
        });

        document.querySelector('.carousel-prev')?.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });

        document.querySelector('.carousel-next')?.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });

        // Pausar al interactuar
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
        carousel.addEventListener('touchstart', stopAutoSlide, {passive: true});
    }

    // 4. Contadores animados con validación
    function setupAnimatedCounters() {
        const statCards = document.querySelectorAll('.stat-card');
        if (!statCards.length) return;

        let countersAnimated = false;

        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        function checkCountersVisibility() {
            const statsSection = document.querySelector('.coverage-stats');
            if (!statsSection) return;

            const rect = statsSection.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight * 0.75) && 
                rect.bottom >= (window.innerHeight * 0.25)
            );

            if (isVisible && !countersAnimated) {
                countersAnimated = true;
                statCards.forEach(card => {
                    const numberElement = card.querySelector('h3');
                    const target = parseInt(numberElement.getAttribute('data-target')) || 0;
                    animateValue(numberElement, 0, target, 2000);
                });
                window.removeEventListener('scroll', checkCountersVisibility);
            }
        }

        window.addEventListener('scroll', checkCountersVisibility);
        checkCountersVisibility(); // Comprobar al cargar
    }

    // 5. Efecto parallax seguro (solo desktop)
    function setupParallax() {
        const mapImage = document.querySelector('.coverage-map img');
        if (!mapImage || window.innerWidth < 992) return;

        let ticking = false;
        const parallaxFactor = 0.2;

        function updateParallax() {
            const scrollPosition = window.pageYOffset;
            mapImage.style.transform = `translateY(${scrollPosition * parallaxFactor}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, {passive: true});
    }

    // 6. Carga progresiva de imágenes
    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (!lazyImages.length) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.style.transition = 'opacity 0.5s ease';
                    };
                    observer.unobserve(img);
                }
            });
        }, {threshold: 0.1});

        lazyImages.forEach(img => {
            img.style.opacity = '0';
            imageObserver.observe(img);
        });
    }

    // Inicializar todos los componentes
    function init() {
        setupMapMarkers();
        setupCarousel();
        setupAnimatedCounters();
        setupParallax();
        setupLazyLoading();

        // Manejar redimensionamiento
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                setupMapMarkers();
                setupParallax();
            }, 250);
        });
    }

    // Iniciar solo si hay elementos requeridos
    if (document.querySelector('.coverage-map') || document.querySelector('.value-carousel')) {
        init();
    }
});