// ===========================================
// NOVALAC INDUSTRIES - FUTURISTIC INTERACTIONS
// Particle Effects + Animations + Dynamic Content
// ===========================================

// ========== LOADER ==========
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// ========== PARTICLES.JS CONFIG ==========
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00f0ff' },
        shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000000' },
            polygon: { nb_sides: 6 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00f0ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

// ========== NAVIGATION SCROLL ==========
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ========== HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== ANIMATED COUNTERS ==========
const counters = document.querySelectorAll('[data-count]');
let counterAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

window.addEventListener('scroll', () => {
    if (!counterAnimated) {
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY + window.innerHeight > heroBottom - 200) {
            animateCounters();
            counterAnimated = true;
        }
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PRODUCT FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========== AI COLOR LAB ==========
const colorPicker = document.getElementById('colorPicker');
const wall = document.querySelector('.wall');
const presetColors = document.querySelectorAll('.preset-color');

colorPicker?.addEventListener('input', (e) => {
    wall.style.background = e.target.value;
});

presetColors.forEach(preset => {
    preset.addEventListener('click', () => {
        const color = preset.getAttribute('data-color');
        wall.style.background = color;
        colorPicker.value = color;
    });
});

// ========== MODAL SYSTEM ==========
const modal = document.getElementById('quoteModal');
const quoteButtons = document.querySelectorAll('[data-quote]');
const closeModal = document.querySelector('.modal-close');

quoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeModal?.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========== BACK TO TOP ==========
const btnTop = document.querySelector('.btn-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
});

btnTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
const quoteForm = document.getElementById('quoteForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Contact Form Data:', data);
    
    // Show success message
    alert('Thank you! We will contact you soon.');
    contactForm.reset();
});

quoteForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);
    
    console.log('Quote Form Data:', data);
    
    // Show success message
    alert('Quote request submitted! We will send you pricing details shortly.');
    quoteForm.reset();
    
    // Close modal
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ========== DYNAMIC PRODUCT LOADING ==========
const products = [
    {
        id: 1,
        name: 'Novacare Advance',
        category: 'emulsion',
        description: 'Premium weather-resistant emulsion with nano-coating technology',
        image: 'images/products/novacare-advance.jpg',
        badge: 'BESTSELLER',
        tags: ['Weather Resistant', 'Washable', 'Low VOC']
    },
    {
        id: 2,
        name: 'All Weather Advance',
        category: 'emulsion',
        description: 'Advanced exterior emulsion with UV protection and anti-fungal properties',
        image: 'images/products/all-weather-advance.jpg',
        badge: 'NEW',
        tags: ['UV Protection', 'Anti-Fungal', 'Eco-Friendly']
    },
    {
        id: 3,
        name: 'Interior Royal Touch',
        category: 'emulsion',
        description: 'Luxury smooth finish emulsion for premium interiors',
        image: 'images/products/interior-royal-touch.jpg',
        badge: 'PREMIUM',
        tags: ['Smooth Finish', 'Washable', 'Stain Resistant']
    },
    {
        id: 4,
        name: 'Acrylic Wall Putty',
        category: 'putty',
        description: 'High-performance acrylic putty for perfect wall finishing',
        image: 'images/products/acrylic-wall-putty.jpg',
        badge: 'TOP RATED',
        tags: ['Crack Resistant', 'Durable', 'Easy Application']
    },
    {
        id: 5,
        name: '24 Carats Wall Putty',
        category: 'putty',
        description: 'Premium wall putty with superior bonding strength',
        image: 'images/products/24-carats-wall-putty.jpg',
        badge: 'PREMIUM',
        tags: ['Superior Bonding', 'White Finish', 'Long Lasting']
    },
    {
        id: 6,
        name: 'White Cement Waterproof Putty',
        category: 'putty',
        description: 'Water-resistant putty for moisture-prone areas',
        image: 'images/products/white-cement-waterproof-putty.jpg',
        badge: 'SPECIAL',
        tags: ['Waterproof', 'White Cement', 'Moisture Resistant']
    },
    {
        id: 7,
        name: 'Microfined Waterproofing',
        category: 'waterproof',
        description: 'Nano-technology based waterproofing solution',
        image: 'images/products/microfined-waterproofing.jpg',
        badge: 'ADVANCED',
        tags: ['Nano Tech', 'Flexible', 'Heat Resistant']
    },
    {
        id: 8,
        name: 'Water Proof Paint',
        category: 'waterproof',
        description: 'Complete waterproofing paint for exterior walls',
        image: 'images/products/waterproof-paint.jpg',
        badge: 'POPULAR',
        tags: ['Complete Protection', 'UV Stable', 'Crack Bridging']
    },
    {
        id: 9,
        name: 'Novacare Coating',
        category: 'waterproof',
        description: 'Advanced elastomeric coating for roofs and terraces',
        image: 'images/products/novacare-coating.jpg',
        badge: 'PRO CHOICE',
        tags: ['Elastomeric', 'Roof Protection', 'Heat Reflective']
    },
    {
        id: 10,
        name: 'Universal Stainer',
        category: 'specialty',
        description: 'AI-powered color matching stainer for any shade',
        image: 'images/products/universal-stainer.jpg',
        badge: 'AI POWERED',
        tags: ['Any Color', 'Fast Tinting', 'Accurate Matching']
    },
    {
        id: 11,
        name: 'SBR Latex',
        category: 'specialty',
        description: 'Professional-grade bonding agent for superior adhesion',
        image: 'images/products/sbr-latex.jpg',
        badge: 'PRO GRADE',
        tags: ['Bonding Agent', 'Professional', 'Multi-Purpose']
    },
    {
        id: 12,
        name: 'Acrylic Washable Distemper',
        category: 'specialty',
        description: 'Eco-friendly washable distemper with anti-bacterial formula',
        image: 'images/products/acrylic-washable-distemper.jpg',
        badge: 'ECO',
        tags: ['Washable', 'Anti-Bacterial', 'Eco Formula']
    }
];

// Render products (if you want to dynamically generate them)
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // Only render if grid is empty
    if (productsGrid.children.length === 0) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="product-badge">${product.badge}</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-tags">
                        ${product.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <button class="btn-brand" data-quote="${product.name}">Get Quote</button>
                </div>
            `;
            
            productsGrid.appendChild(card);
            
            // Animate in
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        });
        
        // Re-attach quote button listeners
        document.querySelectorAll('[data-quote]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = btn.getAttribute('data-quote');
                document.getElementById('quoteProduct').value = productName;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
}

// Call render on load
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment if you want to dynamically generate products
    // renderProducts();
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.orb');
    
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.05;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== CYBER GLITCH EFFECT ==========
function glitchText() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        setInterval(() => {
            const originalText = el.textContent;
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            
            // Random glitch
            if (Math.random() > 0.95) {
                el.textContent = originalText.split('').map(char => {
                    return Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : char;
                }).join('');
                
                // Reset after 50ms
                setTimeout(() => {
                    el.textContent = originalText;
                }, 50);
            }
        }, 100);
    });
}

glitchText();

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tech-card, .brand-card, .product-card, .gallery-item, .info-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// ========== CURSOR TRAIL EFFECT ==========
const cursor = document.createElement('div');
cursor.className = 'cursor-trail';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--cyber-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: 0.1s;
    mix-blend-mode: difference;
    display: none;
`;
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Only on desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    animateCursor();
}

console.log('%c🎨 NOVALAC INDUSTRIES - Futuristic Design Loaded', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
console.log('%cNano-Coating Technology Active ✓', 'color: #0f0; font-size: 14px;');
console.log('%cAI Color Matching System Online ✓', 'color: #0f0; font-size: 14px;');
console.log('%cParticle System Initialized ✓', 'color: #0f0; font-size: 14px;');
