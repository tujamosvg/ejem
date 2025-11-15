/* ============================================
   DELIZZIA PIZZA - JAVASCRIPT GLOBAL
   ============================================ */

/* ==================== FUNCIONES COMUNES (TODAS LAS PÁGINAS) ==================== */

// Navegación común - Scroll effect y menú móvil
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu') || document.getElementById('navMenu');
    const menuLinks = document.querySelectorAll('.menu a');
    let lastScroll = 0;

    if (!navbar) return;

    // Efecto de scroll en el navbar
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Toggle del menú móvil
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (menu) menu.classList.remove('active');
        });
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                if (menuToggle) menuToggle.classList.remove('active');
                if (menu) menu.classList.remove('active');
            }
        });
    });
}

// Inicializar navegación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

/* ============================================
   INI.HTML - PÁGINA DE INICIO
   ============================================ */

// Splash Screen (ini.html)
function initSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    if (!splashScreen) return;

    let progress = 0;
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingText = document.getElementById('loadingText');

    if (!loadingProgress || !loadingText) return;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingText.textContent = `Cargando... ${Math.floor(progress)}%`;
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }, 200);
}

// Hero Content Animation (ini.html)
function initHeroAnimation() {
    const heroContent = document.getElementById('heroContent');
    const heroTitle = document.getElementById('heroTitle');
    
    if (!heroContent || !heroTitle) return;

    let animationStarted = false;
    const titleText = "Delizzia Pizza ";

    function animateTitle() {
        heroTitle.innerHTML = '';
        titleText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            heroTitle.appendChild(span);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                setTimeout(() => {
                    heroContent.classList.add('visible');
                    animateTitle();
                    animationStarted = true;
                }, 500);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(heroContent);
}

// Scroll Indicator (ini.html)
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const bienvenida = document.querySelector('#bienvenida');
        if (bienvenida) {
            bienvenida.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Carousel de Promociones (ini.html) - Solo si existe el carousel antiguo
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Crear dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

// Inicializar funciones de ini.html
if (document.getElementById('splashScreen')) {
    initSplashScreen();
    initHeroAnimation();
    initScrollIndicator();
    initCarousel();
}

/* ============================================
   MENU.HTML - PÁGINA DE MENÚ
   ============================================ */

// Category Navigation (menu.html)
function initCategoryNav() {
    const categoryNav = document.getElementById('categoryNav');
    if (!categoryNav) return;

    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            categoryNav.classList.add('visible');
        } else {
            categoryNav.classList.remove('visible');
        }
    });
}

// Intersection Observer para animaciones (menu.html)
function initMenuAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observar secciones y categorías
    document.querySelectorAll('.section-header, .menu-category').forEach(el => {
        observer.observe(el);
    });
}

// Category Filter (menu.html)
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (categoryButtons.length === 0 || menuCategories.length === 0) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter categories
            menuCategories.forEach(cat => {
                if (category === 'all') {
                    cat.style.display = 'block';
                } else {
                    if (cat.getAttribute('data-category') === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                }
            });

            // Scroll to menu section
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const offset = 150;
                const targetPosition = menuSection.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect para Hero (menu.html)
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const ingredients = document.querySelectorAll('.floating-ingredient');
        
        ingredients.forEach((ingredient, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            ingredient.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Hover Effects para Cards (menu.html)
function initCardHoverEffects() {
    const productCards = document.querySelectorAll('.product-card, .product-featured');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// Inicializar funciones de menu.html
if (document.getElementById('categoryNav')) {
    initCategoryNav();
    initMenuAnimations();
    initCategoryFilter();
    initParallaxEffect();
    initCardHoverEffects();
    
    // Console welcome message
    console.log('%c🍕 ¡Bienvenido a Delizzia Pizza! 🍔', 'color: #FF8243; font-size: 24px; font-weight: bold;');
    console.log('%cMenú creado con 🧡', 'color: #6B6B6B; font-size: 14px;');
}

/* ============================================
   BUFFET.HTML - PÁGINA DE BUFFET
   ============================================ */
// No hay JavaScript específico para buffet.html, solo usa la navegación común

/* ============================================
   CONTACTO.HTML - PÁGINA DE CONTACTO
   ============================================ */
// No hay JavaScript específico para contacto.html, solo usa la navegación común

