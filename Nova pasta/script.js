document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navList = document.querySelector('.nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('show');
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se aberto
                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                }
            }
        });
    });

    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Inicializar header
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // Carrossel de resultados (será implementado)
    // Botões de contato
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const message = encodeURIComponent("Olá, gostaria de saber mais sobre seus serviços de trading Forex.");
            
            if (platform === 'whatsapp') {
                window.open(`https://wa.me/SEUNUMERO?text=${message}`, '_blank');
            } else if (platform === 'telegram') {
                window.open(`https://t.me/SEUUSUARIO?text=${message}`, '_blank');
            }
        });
    });
});

// Carrossel de resultados
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-rotate (opcional)
    let autoSlide = setInterval(nextSlide, 5000);
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initCarousel);