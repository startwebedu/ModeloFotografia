/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 80; // Increased offset for mobile
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== PORTFOLIO FILTER =====*/
const portfolioFilters = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

function filterPortfolio() {
    // Remove active class from all filters
    portfolioFilters.forEach(filter => filter.classList.remove('active'));
    // Add active class to clicked filter
    this.classList.add('active');
    
    const filterValue = this.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
        if (filterValue === 'all') {
            item.classList.remove('hide');
            item.classList.add('show');
        } else {
            if (item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        }
    });
}

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', filterPortfolio);
});

/*===== PORTFOLIO MODAL =====*/
const portfolioButtons = document.querySelectorAll('.portfolio__button');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal__close');

// Open modal
portfolioButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('show-modal');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.classList.remove('show-modal');
        });
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('show-modal');
            document.body.style.overflow = 'auto';
        }
    });
});

/*===== TESTIMONIALS SLIDER =====*/
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial__card');
const totalTestimonials = testimonials.length;
const testimonialsPrev = document.getElementById('testimonials-prev');
const testimonialsNext = document.getElementById('testimonials-next');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Initialize testimonials
showTestimonial(currentTestimonial);

// Event listeners for navigation
if (testimonialsNext) {
    testimonialsNext.addEventListener('click', nextTestimonial);
}

if (testimonialsPrev) {
    testimonialsPrev.addEventListener('click', prevTestimonial);
}

// Auto-slide testimonials
setInterval(nextTestimonial, 5000);

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Olá João! Meu nome é ${name}.%0A%0A` +
                               `📧 Email: ${email}%0A` +
                               `📱 Telefone: ${phone}%0A` +
                               `📸 Tipo de ensaio: ${service}%0A%0A` +
                               `💬 Mensagem: ${message}%0A%0A` +
                               `Gostaria de saber mais sobre seus serviços!`;
        
        // Open WhatsApp
        const whatsappURL = `https://wa.me/5511999999999?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Show success message
        alert('Redirecionando para o WhatsApp! Em breve João Silva entrará em contato.');
        
        // Reset form
        this.reset();
    });
}

/*===== SMOOTH SCROLLING =====*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calculate offset based on screen size
            const isMobile = window.innerWidth <= 768;
            const headerHeight = isMobile ? 80 : 70;
            const offsetTop = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

/*===== LOADING ANIMATION =====*/
window.addEventListener('load', function() {
    // Add loaded class to body for any loading animations
    document.body.classList.add('loaded');
    
    // Initialize AOS or other animation libraries if needed
    // AOS.init();
});

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*===== HEADER SCROLL EFFECT =====*/
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only hide header on mobile when scrolling down significantly
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
});

/*===== COUNTER ANIMATION =====*/
function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

/*===== FORM VALIDATION =====*/
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .contact__input.error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
`;
document.head.appendChild(style);

/*===== SCROLL TO TOP BUTTON =====*/
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*===== PRELOADER =====*/
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/*===== DISABLE INSTAGRAM LINKS =====*/
// Make Instagram links decorative (non-functional)
document.addEventListener('DOMContentLoaded', function() {
    const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
    
    instagramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Optional: Show a message that this is decorative
            // console.log('Instagram link is decorative');
        });
        
        // Change cursor to default
        link.style.cursor = 'default';
        link.style.pointerEvents = 'none';
    });
});

/*===== SEO OPTIMIZATIONS =====*/
// Add structured data for better SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "João Silva Fotografia",
    "description": "Fotógrafo profissional especializado em casamentos, ensaios e eventos",
    "url": window.location.href,
    "telephone": "+5511999999999",
    "email": "contato@joaosilva.foto",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
    },
    "priceRange": "R$ 899 - R$ 2899",
    "serviceType": ["Fotografia de Casamento", "Ensaios Fotográficos", "Fotografia Corporativa"],
    "areaServed": "São Paulo, SP"
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

/*===== MOBILE NAVIGATION IMPROVEMENTS =====*/
// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link');
    const navMenu = document.getElementById('nav-menu');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
            }
        });
    });
    
    // Prevent body scroll when mobile menu is open
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
        });
    }
});

/*===== RESPONSIVE ADJUSTMENTS =====*/
// Adjust scroll behavior based on screen size
function adjustScrollBehavior() {
    const isMobile = window.innerWidth <= 768;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        if (isMobile) {
            section.style.scrollMarginTop = '6rem';
        } else {
            section.style.scrollMarginTop = '5rem';
        }
    });
}

// Run on load and resize
window.addEventListener('load', adjustScrollBehavior);
window.addEventListener('resize', adjustScrollBehavior);