document.addEventListener('DOMContentLoaded', function() {
    // 1. Efectos para los marcadores del mapa
    const markers = document.querySelectorAll('.location-marker');
    
    markers.forEach(marker => {
        // Efecto hover para desktop
        marker.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                const dot = marker.querySelector('.marker-dot');
                const popup = marker.querySelector('.marker-popup');
                
                if (dot) dot.style.transform = 'scale(1.5)';
                if (popup) {
                    popup.style.transform = 'translateY(-50%) scale(1)';
                    popup.style.opacity = '1';
                }
            }
        });
        
        marker.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                const dot = marker.querySelector('.marker-dot');
                const popup = marker.querySelector('.marker-popup');
                
                if (dot) dot.style.transform = 'scale(1)';
                if (popup) {
                    popup.style.transform = 'translateY(-50%) scale(0)';
                    popup.style.opacity = '0';
                }
            }
        });
        
        // Click para móviles
        marker.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                const popup = this.querySelector('.marker-popup');
                const allPopups = document.querySelectorAll('.marker-popup');
                
                allPopups.forEach(p => {
                    if (p !== popup) {
                        p.classList.remove('active-mobile');
                    }
                });
                
                if (popup) popup.classList.toggle('active-mobile');
            }
        });
    });
    
    // Cerrar popups al hacer click fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.location-marker')) {
                document.querySelectorAll('.marker-popup').forEach(popup => {
                    popup.classList.remove('active-mobile');
                });
            }
        }
    });
    
    // 2. Contadores animados
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Activar contadores cuando son visibles
    function checkCountersInView() {
        const statsSection = document.querySelector('.coverage-stats');
        if (!statsSection) return;
        
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            animateCounters();
            window.removeEventListener('scroll', checkCountersInView);
        }
    }
    
    window.addEventListener('scroll', checkCountersInView);
    checkCountersInView(); // Verificar al cargar
    
    // 3. Pestañas de jurisdicciones
    const jurisdictionBtns = document.querySelectorAll('.jurisdiction-btn');
    const jurisdictionPanes = document.querySelectorAll('.jurisdiction-pane');
    
    jurisdictionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            jurisdictionBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Ocultar todos los paneles
            jurisdictionPanes.forEach(pane => pane.classList.remove('active'));
            // Mostrar el panel correspondiente
            const targetPane = document.getElementById(this.dataset.jurisdiction);
            if (targetPane) targetPane.classList.add('active');
        });
    });
    
    // 4. Efecto parallax para el mapa
    function updateParallax() {
        if (window.innerWidth > 992) {
            const map = document.querySelector('.coverage-map img');
            const scrollPosition = window.pageYOffset;
            map.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    }
    
    let isParallaxActive = false;
    window.addEventListener('scroll', function() {
        if (!isParallaxActive) {
            window.requestAnimationFrame(() => {
                updateParallax();
                isParallaxActive = false;
            });
            isParallaxActive = true;
        }
    });
    
    // 5. Cerrar popups al cambiar de tamaño de pantalla
    window.addEventListener('resize', function() {
        document.querySelectorAll('.marker-popup').forEach(popup => {
            popup.classList.remove('active-mobile');
        });
    });
});