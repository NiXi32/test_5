document.addEventListener('DOMContentLoaded', function() {
    // 1. Efectos hover para las tarjetas
    const adminCards = document.querySelectorAll('.admin-card');
    
    adminCards.forEach(card => {
        // Efecto de iluminación al pasar el mouse
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
        });
        
        // Click para móviles (mostrar más información)
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    this.querySelector('.admin-text p').style.maxHeight = '500px';
                } else {
                    this.querySelector('.admin-text p').style.maxHeight = 'none';
                }
            }
        });
    });
    
    // 2. Animación de aparición al hacer scroll
    function checkAdminCards() {
        const section = document.querySelector('.administration');
        if (!section) return;
        
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (sectionPosition < screenPosition) {
            adminCards.forEach(card => {
                card.style.animationPlayState = 'running';
            });
            
            // Remover el event listener después de activar las animaciones
            window.removeEventListener('scroll', checkAdminCards);
        }
    }
    
    // Pausar las animaciones inicialmente
    adminCards.forEach(card => {
        card.style.animationPlayState = 'paused';
    });
    
    window.addEventListener('scroll', checkAdminCards);
    checkAdminCards(); // Verificar al cargar la página
    
    // 3. Efecto de cambio de color en los íconos
    const adminIcons = document.querySelectorAll('.admin-icon i');
    
    adminIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-color)';
            this.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.color = 'var(--secondary-color)';
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    // 4. Carga progresiva de elementos
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        adminCards.forEach(card => {
            observer.observe(card);
        });
    }
});