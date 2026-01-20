// NOVALAC INDUSTRIES - Ultra Vibrant Paint Website
// Interactive Room Visualizer & Paint Animations

// ========== LOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// ========== PARTICLES.JS CONFIG - ULTRA VIBRANT ==========
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#FF3366', '#00D4AA', '#FFD700', '#00BFFF', '#8B5CF6', '#FF69B4', '#FF6B35'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 5, random: true },
        line_linked: { enable: true, distance: 150, color: '#FF3366', opacity: 0.35, width: 1.5 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 160, line_linked: { opacity: 1 } }, push: { particles_nb: 5 } }
    },
    retina_detect: true
});

// ========== NAVIGATION ==========
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

hamburger?.addEventListener('click', () => navMenu.classList.toggle('active'));
navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
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
            } else counter.textContent = target + '+';
        };
        updateCounter();
    });
};

window.addEventListener('scroll', () => {
    if (!counterAnimated) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY + window.innerHeight > heroBottom - 200) {
                animateCounters();
                counterAnimated = true;
            }
        }
    }
});

// ========== ROOM VISUALIZER ==========
const roomButtons = document.querySelectorAll('.room-btn');
const roomViews = document.querySelectorAll('.room-view');
const colorPicker = document.getElementById('colorPicker');
const colorCode = document.getElementById('colorCode');
const presetItems = document.querySelectorAll('.preset-item');

let currentRoom = 'exterior';
let currentColor = '#FF6B6B';

// Room switching
roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        roomButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const room = btn.getAttribute('data-room');
        currentRoom = room;

        roomViews.forEach(view => view.classList.remove('active'));
        document.querySelector(`[data-room-view="${room}"]`).classList.add('active');

        applyColorToRoom(currentColor);
    });
});

// Color picker
colorPicker?.addEventListener('input', (e) => {
    currentColor = e.target.value;
    if (colorCode) colorCode.textContent = currentColor;
    applyColorToRoom(currentColor);
});

// Preset colors
presetItems.forEach(item => {
    item.addEventListener('click', () => {
        const color = item.getAttribute('data-color');
        currentColor = color;
        if (colorPicker) colorPicker.value = color;
        if (colorCode) colorCode.textContent = color;
        applyColorToRoom(color);
    });
});

// Apply color to current room
function applyColorToRoom(color) {
    const wallElements = {
        'exterior': document.getElementById('exteriorWall'),
        'living': document.getElementById('livingWall'),
        'bedroom': document.getElementById('bedroomWall'),
        'kitchen': document.getElementById('kitchenWall'),
        'bathroom': document.getElementById('bathroomWall')
    };

    const wallElement = wallElements[currentRoom];
    if (wallElement) {
        wallElement.style.background = `linear-gradient(to bottom, ${color} 0%, ${adjustBrightness(color, -10)} 100%)`;
        wallElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Interactive animation effect
        wallElement.style.transform = 'scale(1.03) translateZ(15px)';
        setTimeout(() => {
            wallElement.style.transform = 'scale(1) translateZ(0)';
        }, 400);

        // Add ripple effect
        createRipple(wallElement, event);
    }
}

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

// Create ripple effect on wall click
function createRipple(element, e) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.pointerEvents = 'none';

    if (e) {
        const rect = element.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 5) + 'px';
        ripple.style.top = (e.clientY - rect.top - 5) + 'px';
    } else {
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
    }

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Animate ripple
    ripple.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(20)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });

    setTimeout(() => ripple.remove(), 800);
}

// Add interactive hover and click effects for better engagement
document.addEventListener('DOMContentLoaded', () => {
    // Make walls clickable to apply current color
    const walls = document.querySelectorAll('.wall-main, .room-back-wall');
    walls.forEach(wall => {
        wall.style.cursor = 'pointer';
        wall.addEventListener('click', (e) => {
            e.stopPropagation();
            applyColorToRoom(currentColor);

            // Visual feedback
            wall.style.boxShadow = '0 0 50px rgba(255,107,107,0.8), inset 0 0 50px rgba(255,107,107,0.2)';
            setTimeout(() => {
                wall.style.boxShadow = '';
            }, 600);
        });

        wall.addEventListener('mouseenter', () => {
            wall.style.filter = 'brightness(1.05)';
        });

        wall.addEventListener('mouseleave', () => {
            wall.style.filter = 'brightness(1)';
        });
    });

    // Enhanced furniture hover effects
    const furnitureElements = document.querySelectorAll('.sofa-3d, .bed-3d, .coffee-table, .tv-unit, .plant-pot, .nightstand-3d, .wardrobe, .kitchen-cabinets-upper, .kitchen-cabinets-lower, .refrigerator, .bathtub-3d, .sink-3d, .toilet-3d, .kitchen-sink, .kitchen-stove');

    furnitureElements.forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Add click-to-color instruction
    const roomPreview = document.querySelector('.room-preview');
    if (roomPreview) {
        const hint = document.createElement('div');
        hint.className = 'color-hint';
        hint.innerHTML = '<i class="fas fa-hand-pointer"></i> Click on walls to change color';
        hint.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255,107,107,0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 100;
            animation: bounceHint 2s infinite;
            pointer-events: none;
        `;
        roomPreview.appendChild(hint);

        // Add bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounceHint {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                50% { transform: translateX(-50%) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);

        // Hide hint after a few clicks
        let clickCount = 0;
        walls.forEach(wall => {
            wall.addEventListener('click', () => {
                clickCount++;
                if (clickCount >= 2) {
                    hint.style.opacity = '0';
                    hint.style.transition = 'opacity 0.5s';
                    setTimeout(() => hint.remove(), 500);
                }
            });
        });
    }
});

// ========== PRODUCT FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.product-card'); // Re-select in case of dynamic loading

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}
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
        setTimeout(() => card.style.display = 'none', 300);
    }
});
    });
});

// ========== DYNAMIC PRODUCTS - ULTRA VIBRANT ==========
const products = [
    // EMULSIONS
    {
        id: 1, name: 'Novacare Advance Acrylic Emulsion', category: 'emulsion', desc: 'Premium weather-resistant emulsion',
        image: 'images/products/novacare-advance-acrylic-emulsion.jpg', badge: 'BESTSELLER', color: '#FF3366', tags: ['Weather Resistant', 'Washable']
    },
    {
        id: 2, name: 'All Weather Advance Acrylic Emulsion', category: 'emulsion', desc: 'Advanced exterior emulsion with UV protection',
        image: 'images/products/all-weather-advance-acrylic-emulsion.jpg', badge: 'NEW', color: '#00D4AA', tags: ['UV Protection', 'Eco-Friendly']
    },
    {
        id: 3, name: 'Interior Royal Touch Emulsion', category: 'emulsion', desc: 'Luxury smooth finish emulsion',
        image: 'images/products/interior-royal-touch-emulsion.jpg', badge: 'PREMIUM', color: '#FFD700', tags: ['Smooth Finish', 'Washable']
    },
    {
        id: 4, name: 'Novalac Acrylic Luxury Emulsion', category: 'emulsion', desc: 'Ultimate luxury emulsion for premium finish',
        image: 'images/products/novalac-acrylic-luxury-emulsion.jpg', badge: 'LUXURY', color: '#8B5CF6', tags: ['Premium Finish', 'Long Lasting']
    },
    {
        id: 5, name: 'Acrylic Luxury Emulsion', category: 'emulsion', desc: 'High-end acrylic emulsion paint',
        image: 'images/products/acrylic-luxury-emulsion.jpg', badge: 'PREMIUM', color: '#FF69B4', tags: ['Luxury', 'Durable']
    },
    {
        id: 6, name: 'Novalac Classic Emulsion Paint', category: 'emulsion', desc: 'Interior & exterior versatile paint',
        image: 'images/products/novalac-classic-emulsion-paint(interior & exterior).jpeg', badge: 'VERSATILE', color: '#06B6D4', tags: ['Interior', 'Exterior']
    },
    {
        id: 7, name: 'Novapaints Platinum Exterior Emulsion', category: 'emulsion', desc: 'Premium exterior protection',
        image: 'images/products/novapiants-platinum exterior emulsion.jpeg', badge: 'PLATINUM', color: '#C0C0C0', tags: ['Weather Shield', 'Premium']
    },

    // WALL PUTTY
    {
        id: 8, name: 'Acrylic Wall Putty', category: 'putty', desc: 'High-performance acrylic putty',
        image: 'images/products/acrylic-wall-putty.jpg', badge: 'TOP RATED', color: '#00BFFF', tags: ['Durable', 'Easy Application']
    },
    {
        id: 9, name: '24 Carats Acrylic Putty', category: 'putty', desc: 'Premium putty with superior bonding',
        image: 'images/products/24-carats-acrylic-putty.jpg', badge: 'PREMIUM', color: '#FFD700', tags: ['Superior Bonding', 'White Finish']
    },
    {
        id: 10, name: 'White Cement Based Waterproof Wall Putty', category: 'putty', desc: 'Water-resistant putty',
        image: 'images/products/white-cement-based-waterproof-wall-putty.jpg', badge: 'SPECIAL', color: '#8B5CF6', tags: ['Waterproof', 'Moisture Resistant']
    },
    {
        id: 11, name: 'Polo Wall Putty', category: 'putty', desc: 'Professional grade wall putty',
        image: 'images/products/polo-wall-putty.jpg', badge: 'PRO CHOICE', color: '#10B981', tags: ['Professional', 'Smooth']
    },

    // WATERPROOFING
    {
        id: 12, name: 'Microfined Waterproof Cement Coating', category: 'waterproof', desc: 'Advanced waterproofing solution',
        image: 'images/products/microfined-water-proof-cement-coating.jpg', badge: 'ADVANCED', color: '#FF6B35', tags: ['Flexible', 'Heat Resistant']
    },
    {
        id: 13, name: 'Waterproof Cement Paint', category: 'waterproof', desc: 'Complete waterproofing paint',
        image: 'images/products/Water-proof-cement-painnt.jpg', badge: 'POPULAR', color: '#06B6D4', tags: ['UV Stable', 'Crack Bridging']
    },
    {
        id: 14, name: 'Novacare Waterproof Cement Coating', category: 'waterproof', desc: 'Elastomeric coating for roofs',
        image: 'images/products/novacare-waterproof-cement-coating.jpg', badge: 'PRO CHOICE', color: '#84CC16', tags: ['Elastomeric', 'Heat Reflective']
    },

    // DISTEMPER  
    {
        id: 15, name: 'Acrylic Washable Distemper', category: 'distemper', desc: 'Eco-friendly washable distemper',
        image: 'images/products/acrylic-washable-distemper.jpg', badge: 'ECO', color: '#10B981', tags: ['Washable', 'Anti-Bacterial']
    },
    {
        id: 16, name: 'Novacare Acrylic Washable Distemper', category: 'distemper', desc: 'Premium washable distemper',
        image: 'images/products/novacare-acryliv wahsable distemper.jpeg', badge: 'PREMIUM', color: '#00D4AA', tags: ['Washable', 'Smooth']
    },
    {
        id: 17, name: 'Novapaint All Weather Acrylic Washable Distemper', category: 'distemper', desc: 'Weather-resistant distemper',
        image: 'images/products/novapaint-all-weather-acrlic-washable-distemper.jpeg', badge: 'WEATHER PROOF', color: '#FF3366', tags: ['All Weather', 'Durable']
    },

    // PRIMERS & SPECIALTY PAINTS
    {
        id: 18, name: 'Novalac Paint Primer', category: 'primer', desc: 'Professional paint primer for perfect adhesion',
        image: 'images/products/novalac-paint-primer.jpg', badge: 'ESSENTIAL', color: '#FFC107', tags: ['Strong Adhesion', 'Base Coat']
    },
    {
        id: 19, name: 'Novapaints Interior & Exterior Wall Primer', category: 'primer', desc: 'Versatile primer for all surfaces',
        image: 'images/products/novapaints-interior & exterior wall primer.jpeg', badge: 'VERSATILE', color: '#8B5CF6', tags: ['Multi-Surface', 'Professional']
    },
    {
        id: 20, name: 'Novapaints Advance Acrylic Black Shield', category: 'specialty', desc: 'Advanced protective coating',
        image: 'images/products/novapaints-advance-acrylic-black-shield.jpeg', badge: 'ADVANCED', color: '#1a1a1a', tags: ['Protection', 'Premium']
    },
    {
        id: 21, name: 'Novapaints All Weather Advance Acrylic', category: 'specialty', desc: 'All-weather protection paint',
        image: 'images/products/novapaints-allweather-advance-acrylic.jpeg', badge: 'ALL WEATHER', color: '#00BFFF', tags: ['Weather Resistant', 'Durable']
    },
    {
        id: 22, name: 'Novapaints Shimmer Gloss', category: 'specialty', desc: 'Decorative shimmer finish paint',
        image: 'images/products/novapaints-shimmer gloss.jpeg', badge: 'DECORATIVE', color: '#FFD700', tags: ['Shimmer', 'Glossy']
    },
    {
        id: 23, name: 'Novapaints Booster', category: 'specialty', desc: 'Paint additive for enhanced performance',
        image: 'images/products/novapaints-booster.jpeg', badge: 'ENHANCER', color: '#FF6B35', tags: ['Additive', 'Performance']
    },

    // ADHESIVES & BONDING
    {
        id: 24, name: 'Novajod Synthetic Adhesive Emulsion', category: 'adhesive', desc: 'Professional-grade adhesive emulsion',
        image: 'images/products/Novajod-synthetic adhesive emulsion.jpeg', badge: 'PRO GRADE', color: '#EF4444', tags: ['Strong Bond', 'Multi-Purpose']
    },
    {
        id: 25, name: 'SBR Latex', category: 'adhesive', desc: 'Professional bonding agent',
        image: 'images/products/sbr-latex.jpg', badge: 'PRO GRADE', color: '#EF4444', tags: ['Professional', 'Multi-Purpose']
    },

    // CONSTRUCTION CHEMICALS (Mr. CRETE)
    {
        id: 26, name: 'Mr.Crete White Cement', category: 'construction', desc: 'Premium white cement for construction',
        image: 'images/products/mr.crete-white cemet.jpeg', badge: 'PREMIUM', color: '#F5F5F5', tags: ['White Cement', 'Construction']
    },
    {
        id: 27, name: 'Mr.Crete Damp-Lock Ultimate', category: 'construction', desc: 'Ultimate damp-proofing solution',
        image: 'images/products/mr.crete- damp-lock ultimate.jpeg', badge: 'ULTIMATE', color: '#06B6D4', tags: ['Damp Proof', 'Protection']
    },
    {
        id: 28, name: 'Mr.Crete Epoxy Grout', category: 'construction', desc: 'Professional epoxy grouting solution',
        image: 'images/products/mr.crete- epoxy grout.jpeg', badge: 'PROFESSIONAL', color: '#8B5CF6', tags: ['Epoxy', 'Strong']
    },
    {
        id: 29, name: 'Mr.Crete Polymer & White Cement Tile Fixer', category: 'construction', desc: 'Advanced tile adhesive',
        image: 'images/products/r.crete-polymer& white cement based tile fixer.jpeg', badge: 'ADVANCED', color: '#10B981', tags: ['Tile Adhesive', 'Strong Bond']
    },

    // SPECIALTY ADDITIVES
    {
        id: 30, name: 'Universal Stainer', category: 'specialty', desc: 'Color matching stainer for any paint',
        image: 'images/products/universal-stainer.jpg', badge: 'VERSATILE', color: '#FFC107', tags: ['Any Color', 'Fast Tinting']
    },
    {
        id: 31, name: 'Silicon Defoamer', category: 'specialty', desc: 'Professional defoaming agent',
        image: 'images/products/silicon-defoamer.jpg', badge: 'PRO ADDITIVE', color: '#FF69B4', tags: ['Defoamer', 'Professional']
    }
];

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${product.name}'">
                <span class="product-badge" style="background: ${product.color};">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <button class="btn-product" onclick="openQuoteModal('${product.name}')">Get Quote</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========== BACK TO TOP ==========
const btnTop = document.getElementById('btnTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btnTop.classList.add('visible');
    else btnTop.classList.remove('visible');
});
btnTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
const quoteForm = document.getElementById('quoteForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon.');
    contactForm.reset();
});

quoteForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Quote request submitted! We will send you pricing details shortly.');
    quoteForm.reset();
    closeQuoteModal();
});

// ========== MODAL ==========
function openQuoteModal(productName = '') {
    const modal = document.getElementById('quoteModal');
    const productInput = document.getElementById('quoteProduct');
    if (productInput && productName) productInput.value = productName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on background click
document.getElementById('quoteModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quoteModal') closeQuoteModal();
});

// ========== INTERSECTION OBSERVER ==========
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ========== INITIALIZE ==========
// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default color
    applyColorToRoom(currentColor);

    renderProducts();

    // Observe cards for animation
    const cards = document.querySelectorAll('.brand-card, .gallery-item, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

console.log('%c🎨 NOVALAC INDUSTRIES - Colorful Paint Website Loaded', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
console.log('%cRoom Visualizer Active ✓', 'color: #4ECDC4; font-size: 14px;');
console.log('%cProduct Catalog Loaded ✓', 'color: #4ECDC4; font-size: 14px;');
console.log('%cParticle System Initialized ✓', 'color: #4ECDC4; font-size: 14px;');

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

