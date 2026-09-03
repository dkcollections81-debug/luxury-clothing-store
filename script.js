// Form submission handler
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const phone = document.querySelector('input[placeholder="Your Phone"]').value;
    const message = document.querySelector('textarea[placeholder="Your Message"]').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Hi DK Collections! I have an inquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`;
    const whatsappURL = `https://wa.me/919447676989?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    setTimeout(() => {
        alert('Your inquiry has been sent! WhatsApp will open to continue the conversation.');
    }, 500);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        navbar.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.98), rgba(42, 42, 42, 0.98))';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), #2a2a2a)';
    }
});

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(feature);
});

// Product Card Hover Effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const productImage = this.querySelector('.product-image');
        if (productImage) {
            productImage.style.transform = 'scale(1.05)';
            productImage.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const productImage = this.querySelector('.product-image');
        if (productImage) {
            productImage.style.transform = 'scale(1)';
        }
    });
});

// WhatsApp button tracking and analytics
document.querySelectorAll('.order-btn, .whatsapp-btn, [href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const productName = this.closest('.product-card')?.querySelector('h3')?.textContent || 'General Inquiry';
        const price = this.closest('.product-card')?.querySelector('.price')?.textContent || 'N/A';
        
        // Track the click
        trackEvent('whatsapp_order', {
            'product': productName,
            'price': price,
            'timestamp': new Date().toISOString()
        });
        
        console.log(`📲 WhatsApp Order: ${productName} (${price})`);
        console.log('Redirecting to WhatsApp...');
    });
});

// Track page events
function trackEvent(eventName, eventData) {
    // Console logging for development
    console.log(`Event: ${eventName}`, eventData);
    
    // You can integrate with Google Analytics here
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
}

// Price formatter
function formatPrice(price) {
    return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate delivery date
function getDeliveryDate(days = 5) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

// Product search functionality
function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const results = [];
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-desc').textContent.toLowerCase();
        
        if (productName.includes(query.toLowerCase()) || productDesc.includes(query.toLowerCase())) {
            results.push(card);
        }
    });
    
    return results;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 DK Collections - Premium Luxury Clothing Store');
    console.log('📱 WhatsApp: +91 9447676989');
    console.log('🛍️ Buy directly through WhatsApp - No cart, no checkout!');
    console.log('🌐 Ready to serve you!');
    
    // Add delivery date to order messages
    const deliveryDate = getDeliveryDate();
    console.log(`📦 Estimated Delivery: ${deliveryDate}`);
    
    // Initialize product interactions
    initializeProductInteractions();
});

// Initialize product interactions
function initializeProductInteractions() {
    document.querySelectorAll('.product-card').forEach(card => {
        const orderBtn = card.querySelector('.order-btn');
        
        if (orderBtn) {
            orderBtn.addEventListener('mouseenter', function() {
                card.style.transform = 'translateY(-15px)';
            });
            
            orderBtn.addEventListener('mouseleave', function() {
                card.style.transform = 'translateY(-15px)';
            });
        }
    });
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes fadeInScale {
        from {
            transform: scale(0.9);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in console
window.dkCollections = {
    searchProducts: searchProducts,
    getDeliveryDate: getDeliveryDate,
    formatPrice: formatPrice,
    trackEvent: trackEvent
};

console.log('💡 Quick Actions:');
console.log('💡 - Click "Order on WhatsApp" on any product to start ordering');
console.log('💡 - Use window.dkCollections.searchProducts("keyword") to find products');
