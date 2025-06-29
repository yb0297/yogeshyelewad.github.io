// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect with 3D
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing effect for hero section
const typingTexts = [
    'Vice Chairperson at Aakash Research Labs',
    'Ex-Research & Development Advisor at IEEE SRMIST SSIT',
    'Co-Founder of Weebs Hideout Community ',
    'Electronics & IoT Innovation Expert',
    'Published Research Author'
];

let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function typeWriter() {
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    if (isDeleting) {
        currentText = typingTexts[textIndex].substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = typingTexts[textIndex].substring(0, charIndex + 1);
        charIndex++;
    }
    
    typingElement.textContent = currentText;
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === typingTexts[textIndex].length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before starting new text
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Add animation class
        counter.classList.add('counter-animate');
        updateCounter();
    });
}

// Skill bar animation with 3D effects
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar[data-width]');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
            bar.style.transform = 'translateZ(5px)';
        }, 500);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer for 3D animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations based on section
            if (entry.target.classList.contains('hero')) {
                setTimeout(animateCounters, 1000);
            }
            
            if (entry.target.classList.contains('about')) {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.skill-item, .education-item, .project-card, .timeline-item, .publication-card');
    
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
    
    // Start typing effect
    setTimeout(typeWriter, 1000);
});

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Link copied to clipboard!');
    }).catch(() => {
        console.log('Failed to copy link');
    });
}

// Project filtering with 3D effects
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach((card, index) => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp3D 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Enhanced image loading with 3D effects
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial state
        if (!img.hasAttribute('loading') || img.getAttribute('loading') !== 'eager') {
            img.style.opacity = '0';
            img.style.transform = 'translateZ(-20px) rotateY(-15deg)';
        }
        
        // Handle successful load
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'translateZ(0px) rotateY(0deg)';
            img.style.transition = 'all 0.5s ease';
            img.classList.add('loaded');
        });
        
        // Handle load errors
        img.addEventListener('error', () => {
            console.warn(`Failed to load image: ${img.src}`);
            img.style.opacity = '0.5';
            img.style.transform = 'translateZ(-10px)';
        });
        
        // For images that might already be cached
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
            img.style.transform = 'translateZ(0px) rotateY(0deg)';
            img.classList.add('loaded');
        }
    });
});

// Enhanced parallax effect with 3D transformations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    const orbs = document.querySelectorAll('.orb');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) translateZ(${scrolled * 0.02}px) rotate(${scrolled * 0.05}deg)`;
    });
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px) translateX(${scrolled * speed * 0.5}px) translateZ(${scrolled * 0.03}px)`;
    });
});

// Add active state to navigation based on current section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top button with 3D effects
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced floating animations for hero icons with 3D
document.addEventListener('DOMContentLoaded', () => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random delay to make animations more natural
        const delay = Math.random() * 2;
        icon.style.animationDelay = `${delay}s`;
        
        // Add enhanced mouse interaction with 3D
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) translateZ(20px) rotateY(180deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) translateZ(0px) rotateY(0deg)';
        });
    });
});

// Add enhanced particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle3D ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            transform-style: preserve-3d;
        `;
        hero.appendChild(particle);
    }
}

// Add enhanced particle animation CSS with 3D
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle3D {
        0% {
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateZ(50px) rotateX(360deg) rotateY(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp3D {
        from {
            opacity: 0;
            transform: translateY(30px) translateZ(-20px) rotateX(-15deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) translateZ(0px) rotateX(0deg);
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add smooth reveal animations with stagger effect and 3D
function addStaggerAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    const educationItems = document.querySelectorAll('.education-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    const staggerGroups = [timelineItems, skillItems, educationItems, projectCards];
    
    staggerGroups.forEach(group => {
        group.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.transformStyle = 'preserve-3d';
        });
    });
}

// Enhanced mouse cursor effect with 3D
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
        transform-style: preserve-3d;
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.7';
        cursor.style.transform = 'translateZ(50px)';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Enhanced cursor scaling with 3D effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5) translateZ(100px) rotateZ(45deg)';
            cursor.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1) translateZ(50px) rotateZ(0deg)';
            cursor.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        });
    });
});

// Add smoother 3D tilt effect to cards (reduced sensitivity)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .skill-item, .education-item, .publication-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced sensitivity from /8 to /20 for smoother effect
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Add magnetic effect to buttons with 3D
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateZ(10px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
            button.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px) translateZ(0px) rotateX(0deg) rotateY(0deg)';
            button.style.transition = 'transform 0.3s ease';
        });
    });
});

// Initialize all animations with 3D enhancements
document.addEventListener('DOMContentLoaded', () => {
    addStaggerAnimation();
    
    // Add enhanced loading animation with 3D
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateZ(-100px) rotateX(-10deg)';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateZ(0px) rotateX(0deg)';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Existing scroll handlers here
}, 16)); // ~60fps

// Add 3D cube rotation effect for special elements
document.addEventListener('DOMContentLoaded', () => {
    const specialElements = document.querySelectorAll('.metric-item, .highlight-item');
    
    specialElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateZ(15px) rotateY(5deg) rotateX(5deg)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateZ(0px) rotateY(0deg) rotateX(0deg)';
        });
    });
});

// Add ripple effect to clickable elements
document.addEventListener('DOMContentLoaded', () => {
    const clickableElements = document.querySelectorAll('.btn, .project-link, .filter-btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple') || document.createElement('div');
            if (!this.querySelector('.btn-ripple')) {
                ripple.className = 'btn-ripple';
                this.appendChild(ripple);
            }
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translateZ(20px)';
            
            ripple.classList.add('ripple-animate');
            
            setTimeout(() => {
                ripple.classList.remove('ripple-animate');
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-animate {
        animation: ripple3D 0.6s linear;
    }
    
    @keyframes ripple3D {
        0% {
            transform: scale(0) translateZ(20px);
            opacity: 1;
        }
        100% {
            transform: scale(4) translateZ(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);