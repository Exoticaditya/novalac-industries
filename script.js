// ========================================
// NOVALAC INDUSTRIES - INTERACTIVE FEATURES
// ========================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Initialize all features
    initLoader();
    initNavbar();
    initProductFilter();
    initColorVisualizer();
    initBackToTop();
    initSmoothScroll();
    initFormValidation();
});

// ========== LOADER ==========
function initLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
}

// ========== NAVBAR ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offset = 80; // Navbar height
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== PRODUCT FILTER ==========
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========== COLOR VISUALIZER ==========
function initColorVisualizer() {
    const colorPicker = document.getElementById('colorPicker');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const roomWall = document.getElementById('roomWall');
    const roomType = document.getElementById('roomType');

    // Color picker change
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            updateWallColor(e.target.value);
        });
    }

    // Color swatches
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            updateWallColor(color);
            colorPicker.value = color;
            
            // Visual feedback
            colorSwatches.forEach(s => s.style.border = '3px solid #E9ECEF');
            swatch.style.border = '3px solid #FF6B35';
        });
    });

    // Room type selector
    if (roomType) {
        roomType.addEventListener('change', () => {
            // You can add different room layouts here
            console.log('Room type changed to:', roomType.value);
        });
    }

    function updateWallColor(color) {
        if (roomWall) {
            roomWall.style.background = color;
        }
    }
}

// Save color choice
function saveColorChoice() {
    const colorPicker = document.getElementById('colorPicker');
    const roomType = document.getElementById('roomType');
    const selectedColor = colorPicker.value;
    const selectedRoom = roomType.value;

    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #FF6B35 0%, #F7B731 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.16);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <strong><i class="fas fa-check-circle"></i> Color Saved!</strong><br>
        <small>Color: ${selectedColor} | Room: ${selectedRoom}</small>
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    // Store in localStorage
    localStorage.setItem('savedColor', JSON.stringify({
        color: selectedColor,
        room: selectedRoom,
        timestamp: new Date().toISOString()
    }));
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== QUICK VIEW (Product) ==========
const productData = [
    {
        name: "Novacare Advance Acrylic Emulsion",
        description: "Premium quality acrylic emulsion for superior finish and durability. Perfect for both interior and exterior applications.",
        features: ["Washable", "Eco-Friendly", "Long Lasting", "Superior Coverage", "Stain Resistant"],
        applications: "Ideal for residential and commercial buildings",
        coverage: "120-140 sq.ft per litre",
        colors: "Available in 500+ shades"
    },
    {
        name: "All Weather Advance Acrylic Emulsion",
        description: "All-weather protection with stunning aesthetic appeal. Designed to withstand extreme climatic conditions.",
        features: ["All Weather Protection", "UV Resistant", "Water Repellent", "Crack Resistance", "Fade Proof"],
        applications: "Perfect for exterior walls exposed to harsh weather",
        coverage: "110-130 sq.ft per litre",
        colors: "Available in wide range of colors"
    },
    {
        name: "Interior Royal Touch Emulsion",
        description: "Luxurious finish for elegant interior spaces. Creates a royal atmosphere with silky smooth finish.",
        features: ["Interior Specialist", "Silky Finish", "Easy to Clean", "Low Odor", "Quick Drying"],
        applications: "Living rooms, bedrooms, offices",
        coverage: "130-150 sq.ft per litre",
        colors: "Premium color palette available"
    },
    {
        name: "Acrylic Wall Putty",
        description: "Superior wall preparation for perfect painting surface. Fills cracks and provides smooth finish.",
        features: ["Smooth Finish", "Water Resistant", "Quick Dry", "Easy Application", "Strong Bond"],
        applications: "Interior and exterior wall preparation",
        coverage: "20-25 sq.ft per kg",
        colors: "White base"
    },
    {
        name: "24 Carats Acrylic Putty",
        description: "Premium quality putty for luxurious wall finishing. Gold standard in wall preparation.",
        features: ["Premium Quality", "High Coverage", "Superior Bond", "Crack Filling", "Moisture Resistant"],
        applications: "Premium residential and commercial projects",
        coverage: "22-28 sq.ft per kg",
        colors: "Pure white"
    },
    {
        name: "White Cement Based Waterproof Wall Putty",
        description: "White cement based putty with superior waterproofing properties.",
        features: ["Waterproof", "Smooth Application", "Certified Quality", "Durable", "Weather Resistant"],
        applications: "Both interior and exterior walls",
        coverage: "18-22 sq.ft per kg",
        colors: "White"
    },
    {
        name: "Microfined Water Proof Cement Coating",
        description: "Advanced microfined technology for superior waterproofing and protection.",
        features: ["Microfined Technology", "Complete Protection", "Exterior Use", "Long Life", "Breathable"],
        applications: "Exterior walls, terraces, basements",
        coverage: "100-120 sq.ft per litre",
        colors: "Multiple shades available"
    },
    {
        name: "Water Proof Cement Paint",
        description: "Robust cement paint for exterior walls and surfaces with excellent waterproofing.",
        features: ["Waterproof", "Heavy Duty", "Long Life", "Algae Resistant", "Economical"],
        applications: "Building exteriors, boundary walls",
        coverage: "90-110 sq.ft per litre",
        colors: "Standard and custom colors"
    },
    {
        name: "Novacare Waterproof Cement Coating",
        description: "Premium waterproof coating for all weather protection and beautiful finish.",
        features: ["Premium Quality", "Weather Proof", "Quality Assured", "UV Protection", "Durable"],
        applications: "Residential and commercial exteriors",
        coverage: "100-120 sq.ft per litre",
        colors: "Wide color range"
    },
    {
        name: "Universal Stainer",
        description: "Vibrant color stainers for custom paint shades. Create unlimited color combinations.",
        features: ["Multi-Color Options", "Concentrated Formula", "Universal Application", "Color Consistency", "High Tinting Strength"],
        applications: "All types of paints and coatings",
        coverage: "As per requirement",
        colors: "Full spectrum of colors"
    },
    {
        name: "SBR Latex",
        description: "Styrene Butadiene Rubber latex for construction applications. Industrial grade quality.",
        features: ["Industrial Grade", "Multi-Use Application", "High Bond Strength", "Flexible", "Water Resistant"],
        applications: "Concrete bonding, waterproofing, tile adhesives",
        coverage: "As per application",
        colors: "Milky white"
    },
    {
        name: "Acrylic Washable Distemper",
        description: "Affordable washable distemper for beautiful interiors. Economy with quality.",
        features: ["Washable", "Economical", "Interior Use", "Good Coverage", "Easy Maintenance"],
        applications: "Interior walls and ceilings",
        coverage: "140-160 sq.ft per litre",
        colors: "Popular shades available"
    }
];

function openQuickView(index) {
    const product = productData[index];
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
            <h2>${product.name}</h2>
            <p style="color: #6C757D; margin-bottom: 2rem;">${product.description}</p>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;"><i class="fas fa-star"></i> Key Features</h3>
                <div style="display: grid; gap: 0.5rem;">
                    ${product.features.map(feature => `
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-check-circle" style="color: #4ECDC4;"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="background: #F8F9FA; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                <div style="display: grid; gap: 1rem;">
                    <div>
                        <strong><i class="fas fa-tools"></i> Applications:</strong>
                        <p style="margin-top: 0.5rem; color: #6C757D;">${product.applications}</p>
                    </div>
                    <div>
                        <strong><i class="fas fa-layer-group"></i> Coverage:</strong>
                        <p style="margin-top: 0.5rem; color: #6C757D;">${product.coverage}</p>
                    </div>
                    <div>
                        <strong><i class="fas fa-palette"></i> Colors:</strong>
                        <p style="margin-top: 0.5rem; color: #6C757D;">${product.colors}</p>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="openQuote('${product.name}'); this.closest('.modal').remove();">
                <i class="fas fa-shopping-cart"></i> Get Quote
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ========== QUOTE MODAL ==========
function openQuote(productName) {
    const modal = document.getElementById('quoteModal');
    const productInput = document.getElementById('quoteProduct');
    const productDisplay = document.getElementById('quoteProductDisplay');
    
    productInput.value = productName;
    productDisplay.value = productName;
    modal.classList.add('active');
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
}

// Close modal on outside click
document.getElementById('quoteModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quoteModal') {
        closeQuoteModal();
    }
});

// ========== FORM HANDLING ==========
function initFormValidation() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }

    // Quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
}

function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Contact Form Data:', data);
    
    // Show success message
    showNotification('Thank you for contacting us! We will get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

function handleQuoteSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log('Quote Request Data:', data);
    
    // Show success message
    showNotification('Quote request submitted successfully! Our team will contact you shortly.', 'success');
    
    // Close modal and reset form
    closeQuoteModal();
    e.target.reset();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4ECDC4 0%, #44A3FF 100%)' : 'linear-gradient(135deg, #FF6B35 0%, #F7B731 100%)'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.16);
        z-index: 9999;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="font-size: 1.5rem;"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========== ANIMATIONS ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== STATISTICS COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200; // Animation speed

    counters.forEach(counter => {
        const animate = () => {
            const value = counter.innerText;
            const number = parseInt(value.replace(/\D/g, ''));
            const suffix = value.replace(/[0-9]/g, '');
            const increment = number / speed;

            let currentNumber = 0;
            const updateCounter = () => {
                currentNumber += increment;
                if (currentNumber < number) {
                    counter.innerText = Math.ceil(currentNumber) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = number + suffix;
                }
            };
            updateCounter();
        };

        // Trigger animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== IMAGE LAZY LOADING ==========
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

console.log('%c🎨 Novalac Industries Website Loaded Successfully! 🎨', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cVisit our website for premium quality paints and coatings!', 'color: #4ECDC4; font-size: 14px;');
