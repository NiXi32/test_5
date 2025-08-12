// Animaciones al hacer scroll y carrusel
document.addEventListener('DOMContentLoaded', function() {
    // Animaciones al hacer scroll
    const animateElements = document.querySelectorAll('.animate-text, .animate-card');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animationPlayState = 'running';
            }
        });
    };

    // Activar animaciones al cargar la página para elementos visibles
    animateOnScroll();
    
    // Activar animaciones al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Contadores animados
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        const startCounter = () => {
            const counterPosition = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (counterPosition < windowHeight - 100) {
                updateCount();
                window.removeEventListener('scroll', startCounter);
            }
        };
        
        window.addEventListener('scroll', startCounter);
        startCounter(); // Comprobar si ya está visible al cargar
    });

    // Carrusel de imágenes
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        // Crear indicadores
        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = carousel.querySelectorAll('.indicator');
        
        // Función para ir a un slide específico
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        // Actualizar carrusel
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Navegación anterior/siguiente
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });
        
        // Cambio automático cada 5 segundos
        let interval = setInterval(() => {
            currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000);
        
        // Pausar al hacer hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            }, 5000);
        });
    }

 // Alternar visibilidad del chat
  function toggleChat() {
    const chat = document.getElementById('chatbot');
    chat.style.display = chat.style.display === 'block' ? 'none' : 'block';
    if(chat.style.display === 'block') {
      document.getElementById('userInput').focus();
    }
  }

  // Enviar mensaje
  function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if(message !== '') {
      addMessage(message, 'user');
      input.value = '';
      
      // Simular "escribiendo..."
      setTimeout(() => {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing';
        typingIndicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        document.getElementById('chatMessages').appendChild(typingIndicator);
        document.querySelector('.chatbot-messages').scrollTop = document.querySelector('.chatbot-messages').scrollHeight;
        
        // Respuesta del bot después de un retraso
        setTimeout(() => {
          document.querySelector('.typing')?.remove();
          const response = getBotResponse(message);
          addMessage(response, 'bot');
        }, 1500);
      }, 500);
    }
  }

  // Añadir mensaje al chat
  function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const now = new Date();
    const timeString = now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
      <div class="message-content">${text}</div>
      <div class="message-time">${timeString}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Generar respuesta del bot
  function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    // Buscar respuesta por palabras clave
    for(const item of botResponses) {
      if(item.keywords.some(keyword => lowerMsg.includes(keyword))) {
        return item.response;
      }
    }
    
    // Respuesta por defecto
    return "Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto para brindarte información más detallada.";
  }

  // Enviar mensaje al presionar Enter
  document.getElementById('userInput').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
      sendMessage();
    }
  });

  // Enviar con Enter
  document.getElementById("userMessage").addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
      sendMessage();
    }
  });



    // 6. Animación para el formulario de contacto
    const contactSection = document.querySelector('.contact-section');
    contactSection.style.opacity = '0';
    setTimeout(() => {
        contactSection.style.transition = 'opacity 1s ease';
        contactSection.style.opacity = '1';
    }, 1500);

    // Efecto de aparición secuencial para elementos
    const sequentialElements = document.querySelectorAll('.sequential-animate');
    sequentialElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Efecto de hover pulsante
    const pulseElements = document.querySelectorAll('.pulse-on-hover');
    pulseElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('pulse-animation');
        });
        el.addEventListener('mouseleave', () => {
            el.classList.remove('pulse-animation');
        });
    });

    // Animaciones de entrada alternadas
    const staggeredElements = document.querySelectorAll('.staggered-animate');
    staggeredElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        el.style.animationDelay = `${index * 0.15}s`;
    });
});

      