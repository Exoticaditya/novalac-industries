// NOVALAC INDUSTRIES - Colorful Paint Website
// Interactive Room Visualizer & Paint Animations

// ========== LOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// ========== PARTICLES.JS CONFIG ==========
particlesJS('particles-js', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#FF8B94'] },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#FF6B6B', opacity: 0.3, width: 1 },
        move: { enable: true, speed: 1.5, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
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
        wallElement.style.background = color;
        wallElement.style.transition = 'background 0.6s ease';
        
        // Add interactive effect
        wallElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            wallElement.style.transform = 'scale(1)';
        }, 300);
    }
}

// Add hover effects for better interactivity
document.addEventListener('DOMContentLoaded', () => {
    const furnitureElements = document.querySelectorAll('.sofa-3d, .bed-3d, .coffee-table, .tv-unit, .plant-pot, .nightstand-3d, .wardrobe, .kitchen-cabinets-upper, .kitchen-cabinets-lower, .refrigerator, .bathtub-3d, .sink-3d, .toilet-3d');
    
    furnitureElements.forEach(element => {
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05) translateY(-5px)';
            element.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
            element.style.boxShadow = '';
        });
    });
});

// ========== PRODUCT FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

// ========== DYNAMIC PRODUCTS ==========
const products = [
    { id: 1, name: 'Novacare Advance', category: 'emulsion', desc: 'Premium weather-resistant emulsion', 
      image: 'images/products/novacare-advance-acrylic-emulsion.jpg', badge: 'BESTSELLER', color: '#FF6B6B', tags: ['Weather Resistant', 'Washable'] },
    { id: 2, name: 'All Weather Advance', category: 'emulsion', desc: 'Advanced exterior emulsion with UV protection', 
      image: 'images/products/all-weather-advance-acrylic-emulsion.jpg', badge: 'NEW', color: '#4ECDC4', tags: ['UV Protection', 'Eco-Friendly'] },
    { id: 3, name: 'Interior Royal Touch', category: 'emulsion', desc: 'Luxury smooth finish emulsion', 
      image: 'images/products/interior-royal-touch-emulsion.jpg', badge: 'PREMIUM', color: '#FFE66D', tags: ['Smooth Finish', 'Washable'] },
    { id: 4, name: 'Acrylic Wall Putty', category: 'putty', desc: 'High-performance acrylic putty', 
      image: 'images/products/acrylic-wall-putty.jpg', badge: 'TOP RATED', color: '#95E1D3', tags: ['Durable', 'Easy Application'] },
    { id: 5, name: '24 Carats Wall Putty', category: 'putty', desc: 'Premium putty with superior bonding', 
      image: 'images/products/24-carats-acrylic-putty.jpg', badge: 'PREMIUM', color: '#FF8B94', tags: ['Superior Bonding', 'White Finish'] },
    { id: 6, name: 'Waterproof Putty', category: 'putty', desc: 'Water-resistant putty', 
      image: 'images/products/white-cement-based-waterproof-wall-putty.jpg', badge: 'SPECIAL', color: '#A8E6CF', tags: ['Waterproof', 'Moisture Resistant'] },
    { id: 7, name: 'Microfined Waterproofing', category: 'waterproof', desc: 'Advanced waterproofing solution', 
      image: 'images/products/microfined-water-proof-cement-coating.jpg', badge: 'ADVANCED', color: '#FFDAB9', tags: ['Flexible', 'Heat Resistant'] },
    { id: 8, name: 'Waterproof Paint', category: 'waterproof', desc: 'Complete waterproofing paint', 
      image: 'images/products/Water-proof-cement-painnt.jpg', badge: 'POPULAR', color: '#DDA0DD', tags: ['UV Stable', 'Crack Bridging'] },
    { id: 9, name: 'Novacare Coating', category: 'waterproof', desc: 'Elastomeric coating for roofs', 
      image: 'images/products/novacare-waterproof-cement-coating.jpg', badge: 'PRO CHOICE', color: '#87CEEB', tags: ['Elastomeric', 'Heat Reflective'] },
    { id: 10, name: 'Universal Stainer', category: 'specialty', desc: 'Color matching stainer', 
      image: 'images/products/universal-stainer.jpg', badge: 'VERSATILE', color: '#F0E68C', tags: ['Any Color', 'Fast Tinting'] },
    { id: 11, name: 'SBR Latex', category: 'specialty', desc: 'Professional bonding agent', 
      image: 'images/products/sbr-latex.jpg', badge: 'PRO GRADE', color: '#98D8C8', tags: ['Professional', 'Multi-Purpose'] },
    { id: 12, name: 'Washable Distemper', category: 'specialty', desc: 'Eco-friendly washable distemper', 
      image: 'images/products/acrylic-washable-distemper.jpg', badge: 'ECO', color: '#F7DC6F', tags: ['Washable', 'Anti-Bacterial'] }
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
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.brand-card, .gallery-item, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Initialize with default color
    applyColorToRoom(currentColor);
});

console.log('%c🎨 NOVALAC INDUSTRIES - Colorful Paint Website Loaded', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
console.log('%cRoom Visualizer Active ✓', 'color: #4ECDC4; font-size: 14px;');
console.log('%cProduct Catalog Loaded ✓', 'color: #4ECDC4; font-size: 14px;');
console.log('%cParticle System Initialized ✓', 'color: #4ECDC4; font-size: 14px;');
