// NOVALAC INDUSTRIES - Ultra Vibrant Paint Website
// Interactive Room Visualizer & Paint Animations



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
// Filter logic moved to setupFilters() inside DOMContentLoaded


// ========== DYNAMIC PRODUCTS - ULTRA VIBRANT ==========
const products = [
    // 1. LUXURY METALLIC
    {
        id: 3, name: 'Premium Acrylic Luxury Emulsion', category: 'emulsion', desc: 'Hi-gloss premium acrylic emulsion for amazing color and flawless finish',
        image: 'images/products/Metallic-emulsion-paint.jpeg', badge: 'LUXURY', color: '#1E3A8A', tags: ['Hi-Gloss', 'Premium', 'Decorative'],
        colors: ['#C0C0C0', '#B87333', '#CD7F32', '#DAA520']
    },
    // 2. NOVACARE PLATINUM
    {
        id: 8, name: 'Novacare Platinum Exterior Emulsion', category: 'emulsion', desc: 'Premium platinum silver technology exterior emulsion with 5-year durability',
        image: 'images/products/product-6.jpeg', badge: 'PREMIUM', color: '#1A237E', tags: ['Platinum', 'Exterior', '5 Year Durability'],
        colors: ['#FDF5E6', '#FAF0E6', '#FAEBD7', '#F5DEB3']
    },
    // 3. BLACK SHIELD
    {
        id: 1, name: 'Novacare Black Shield Advance Acrylic', category: 'emulsion', desc: 'High-performance advance acrylic with black shield protection. Durable, long-lasting, eco-friendly finish.',
        image: 'images/products/product-1.jpeg', badge: 'BESTSELLER', color: '#4CAF50', tags: ['Advance Acrylic', 'Black Shield', 'Eco-Friendly'],
        colors: ['#E8D5B7', '#C4A77D', '#8B7355', '#F5E6D3']
    },
    // 4. ALL WEATHER MATT (Acrylic Matt Finish)
    {
        id: 24, name: 'Acrylic Matt Finish Emulsion', category: 'emulsion', desc: 'Premium matt finish emulsion for smooth, elegant interiors',
        image: 'images/products/acrylic-matt-finish-emulsion.jpeg', badge: 'MATT FINISH', color: '#FF3366', tags: ['Matt Finish', 'Washable', 'Interior'],
        colors: ['#E8D5B7', '#C4A77D', '#8B7355', '#F5E6D3']
    },
    // 5. CLASSIC 2-IN-1
    {
        id: 4, name: 'Classic 2-in-1 Acrylic Eco Emulsion', category: 'emulsion', desc: 'Versatile eco-friendly emulsion for both exterior and interior',
        image: 'images/products/CLASSIC 2 in 1 Acrylic Eco Emulsion ( For Exterior and Interior).jpeg', badge: 'ECO-FRIENDLY', color: '#10B981', tags: ['Eco-Friendly', 'Interior', 'Exterior'],
        colors: ['#FFFAF0', '#FFF5EE', '#FFFACD', '#F5FFFA']
    },
    // 6. PRIMER
    {
        id: 7, name: 'Novacare Wall Primer', category: 'primer', desc: 'High-performance interior and exterior wall primer for perfect paint adhesion',
        image: 'images/products/product-5.jpeg', badge: 'ESSENTIAL', color: '#2196F3', tags: ['Wall Primer', 'Interior', 'Exterior'],
        colors: ['#FFFFFF', '#F5F5F5', '#E8E8E8', '#D3D3D3']
    },
    // 7. UNIVERSAL STAINER
    {
        id: 17, name: 'Novalac Universal Stainer', category: 'emulsion', desc: 'Premium quality universal stainer with Hydrochroma technology for true color longevity',
        image: 'images/products/product-15.jpeg', badge: 'UNIVERSAL', color: '#E53935', tags: ['Stainer', 'Hydrochroma', 'Premium']
    },
    // 8. DISTEMPER NOVACARE
    {
        id: 13, name: 'Super Novacare Acrylic Washable Distemper', category: 'distemper', desc: 'Super quality acrylic washable distemper for smooth, elegant walls',
        image: 'images/products/product-11.jpeg', badge: 'PREMIUM', color: '#3F51B5', tags: ['Washable', 'Acrylic', 'Long Lasting']
    },
    {
        id: 20, name: 'Nova Care Microfined Water Proof Cement Coating', category: 'waterproof', desc: 'Microfined waterproof cement coating with 63 microns extenders for superior protection',
        image: 'images/products/product-18.jpeg', badge: 'WATERPROOF', color: '#FFC107', tags: ['Waterproof', 'Microfined', 'Cement Coating']
    },
    // 9. DISTEMPER ALL WEATHER
    {
        id: 2, name: 'All Weather Acrylic Washable Distemper', category: 'distemper', desc: 'All-weather acrylic washable distemper for brilliant, long-lasting interior finishes',
        image: 'images/products/product-2.jpeg', badge: 'ALL WEATHER', color: '#4CAF50', tags: ['Washable', 'All Weather', 'Interior'],
        colors: ['#FFFFFF', '#F0F0F0', '#E5D9C9', '#D4C4B0']
    },
    // 10. NOVAJOD
    {
        id: 12, name: 'Novajod Synthetic Adhesive Emulsion', category: 'adhesive', desc: 'High-quality synthetic adhesive emulsion for dry distemper and lime binder',
        image: 'images/products/product-10.jpeg', badge: 'ADHESIVE', color: '#D32F2F', tags: ['Synthetic Adhesive', 'Distemper Binder', 'Durable']
    },
    // 11. MR. CRETE PRODUCTS
    {
        id: 11, name: 'Mr. Crete Epoxy Grout', category: 'construction', desc: 'Premium epoxy grout for floor, wall, and mosaic - durable with long pot life',
        image: 'images/products/product-9.jpeg', badge: 'PRO CHOICE', color: '#E53935', tags: ['Epoxy Grout', 'Floor & Wall', 'Stain Resistant']
    },
    {
        id: 14, name: 'Mr. Crete Tile Fixer', category: 'adhesive', desc: 'Polymers and white cement based professional tile fixer for wall and floor',
        image: 'images/products/product-12.jpeg', badge: 'PRO GRADE', color: '#FFC107', tags: ['Tile Fixer', 'Cement Based', 'Professional']
    },
    {
        id: 15, name: 'Mr. Crete Super White Cement', category: 'construction', desc: 'Premium decorative polymer blended white cement for exterior and interior finishing',
        image: 'images/products/product-13.jpeg', badge: 'SUPER WHITE', color: '#03A9F4', tags: ['White Cement', 'Decorative', 'Polymer Blended']
    },
    {
        id: 18, name: 'Admix Plus Cement Grout Strengthener', category: 'construction', desc: 'Cement grout strengthener and hardener for enhanced durability',
        image: 'images/products/product-16.jpeg', badge: 'STRENGTHENER', color: '#2196F3', tags: ['Grout Strengthener', 'Hardener', 'Durable']
    },
    // OTHER PRODUCTS
    {
        id: 6, name: 'All Weather Advance Acrylic Emulsion', category: 'emulsion', desc: 'Advanced all-weather acrylic emulsion with Nanoskin technology for superior protection',
        image: 'images/products/product-4.jpeg', badge: 'TOP RATED', color: '#3F51B5', tags: ['All Weather', 'Nanoskin', 'Advance Acrylic'],
        colors: ['#FFE4E1', '#E6E6FA', '#F0FFF0', '#FFF8DC']
    },
    {
        id: 5, name: 'Rustic Texture Paint', category: 'texture', desc: 'Create stunning rustic wall textures with depth and character',
        image: 'images/products/Rustic texture.jpeg', badge: 'DESIGNER', color: '#8B4513', tags: ['Texture', 'Rustic', 'Decorative'],
        colors: ['#D2691E', '#8B4513', '#A0522D', '#CD853F']
    },
    {
        id: 9, name: 'Shimmer Gloss Premium Paint & Primer', category: 'emulsion', desc: 'Premium shimmer gloss for wood, metal, and walls - amazing color and flawless finish',
        image: 'images/products/product-7.jpeg', badge: 'ELEGANT', color: '#1976D2', tags: ['Shimmer Gloss', 'Wood', 'Metal'],
        colors: ['#FFE4E1', '#FFF0F5', '#FFF5EE', '#FFFAF0']
    },
    {
        id: 19, name: 'Novacare 24 Carats Acrylic Putty', category: 'putty', desc: 'Water-resistant white cement based acrylic putty - no curing required',
        image: 'images/products/product-17.jpeg', badge: 'PREMIUM', color: '#0288D1', tags: ['Acrylic Putty', 'Water Resistant', 'No Curing']
    },
    {
        id: 21, name: 'Novapaints Industrial Coatings', category: 'construction', desc: 'Professional industrial coatings for corrosion protection and professional applications',
        image: 'images/products/product-19.jpeg', badge: 'INDUSTRIAL', color: '#37474F', tags: ['Industrial', 'Corrosion Protection', 'Professional']
    },
    {
        id: 16, name: 'Novapaints Booster', category: 'adhesive', desc: 'Xtra power booster additive for putty, paints, distemper, and grout applications',
        image: 'images/products/booster.jpeg', badge: 'XTRA POWER', color: '#E53935', tags: ['Booster', 'Additive', 'Multi-Purpose']
    },
    // 12. PAINT REMOVER (END)
    {
        id: 25, name: 'Cycle Paint Remover', category: 'remover', desc: 'Fast-acting paint remover for removing old paint from metal and wood surfaces',
        image: 'images/products/cycle-paint-remover.jpeg', badge: 'FAST ACTING', color: '#FF5722', tags: ['Paint Remover', 'Metal & Wood', 'Fast Action']
    }
];

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);

        // Generate color swatches HTML if product has colors
        let colorSwatchesHTML = '';
        if (product.colors && product.colors.length > 0) {
            colorSwatchesHTML = `
                <div class="product-colors">
                    ${product.colors.map((clr, idx) => `
                        <div class="color-swatch ${idx === 0 ? 'active' : ''}" 
                             style="background: ${clr};" 
                             data-color="${clr}"
                             title="Color option ${idx + 1}">
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Apply scale transform for Damp-Proof Ultimate (ID 20) to zoom in the bucket
        const imgStyle = product.id === 20 ? 'transform: scale(1.35); transform-origin: center bottom;' : '';

        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" style="${imgStyle}" onerror="this.src='https://via.placeholder.com/400x300?text=${product.name}'">
                <span class="product-badge" style="background: ${product.color};">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                ${colorSwatchesHTML}
                <button class="btn-product" onclick="openQuoteModal('${product.name}')">Get Quote</button>
            </div>
        `;

        // Add color swatch hover functionality
        if (product.colors && product.colors.length > 0) {
            const swatches = card.querySelectorAll('.color-swatch');
            const productImg = card.querySelector('.product-img img');

            swatches.forEach(swatch => {
                swatch.addEventListener('mouseenter', () => {
                    const color = swatch.dataset.color;
                    // Apply subtle hue overlay effect
                    productImg.style.filter = `drop-shadow(0 5px 15px ${color}80)`;
                    productImg.style.transition = 'filter 0.3s ease';
                });

                swatch.addEventListener('mouseleave', () => {
                    productImg.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))';
                });

                swatch.addEventListener('click', () => {
                    swatches.forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                });
            });
        }

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
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with default color
    if (typeof applyColorToRoom === 'function') {
        applyColorToRoom(currentColor);
    }

    // Render Products
    renderProducts();

    // Setup Filter Logic (After products are rendered)
    setupFilters();

    // Observe cards for animation
    const cards = document.querySelectorAll('.brand-card, .gallery-item, .info-card');
    if (typeof observer !== 'undefined') {
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Additional animations check
    animateCounters();
});

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    // Note: productCards needs to be queried AFTER renderProducts

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                const cards = document.querySelectorAll('.product-card');

                cards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Small delay to allow display:block to apply before opacity transition
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
    }
}

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

