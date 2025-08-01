// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        // Add random colors to some particles
        const colors = [
            'linear-gradient(45deg, #0066ff, #00d4aa)',
            'linear-gradient(45deg, #ff6b35, #ffa726)',
            'linear-gradient(45deg, #00d4aa, #0066ff)',
            'linear-gradient(45deg, #ffa726, #ff6b35)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Animation
const typingText = document.getElementById('typingText');
const phrases = [
    'Security Engineer',
    'Security Analyst',
    'Incident Response',
    'SOC Analyst',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100; // Adjust speed by changing divisor
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            if (target >= 1000) {
                const displayValue = Math.floor((current / 1000) * 10) / 10;
                if (current >= target) {
                    counter.textContent = (target / 1000).toFixed(0) + 'K+';
                } else {
                    counter.textContent = displayValue.toFixed(displayValue < 1 ? 1 : 0) + 'K';
                }
            } else {
                const displayValue = Math.floor(current);
                if (current >= target) {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = displayValue.toString();
                }
            }
        }, 20); // Animation speed (lower = faster)
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Observe sections for counter animations
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => {
    statsObserver.observe(el);
});

document.querySelectorAll('.about').forEach(el => {
    observer.observe(el);
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3D Tilt Effect for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX / 3}deg) rotateY(${rotateY / 3}deg) translateZ(2px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Glitch Effect for Hero Title
function createGlitchEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        title.addEventListener('animationend', () => {
            title.style.animation = '';
        });
    }
}

// Matrix Rain Effect (Optional)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0066ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Skills Navigation System
function initializeSkillsNavigation() {
    const navItems = document.querySelectorAll('.skill-nav-item');
    const contentSections = document.querySelectorAll('.skill-category-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected content section
            const targetSection = document.getElementById(category);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 100);
            }
        });
    });
}

// Performance optimization
let ticking = false;

function updateOnScroll() {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Theme Toggle Functionality
class ThemeToggle {
    constructor() {
        this.currentTheme = 'dark';
        this.toggle = null;
        this.init();
    }

    init() {
        // Get saved theme from localStorage or default to dark
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupToggle();
            });
        } else {
            this.setupToggle();
        }
    }

    setupToggle() {
        this.toggle = document.getElementById('themeToggle');
        if (!this.toggle) {
            console.log('Theme toggle element not found - creating one');
            this.createThemeToggle();
            return;
        }

        // Set initial toggle state
        this.updateToggleState();

        // Add click event listener
        this.toggle.addEventListener('click', () => {
            this.switchTheme();
        });

        // Add keyboard support
        this.toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.switchTheme();
            }
        });

        // Add smooth transition class after initial setup
        setTimeout(() => {
            document.body.classList.add('theme-transitions');
        }, 100);
    }

    createThemeToggle() {
        // Create theme toggle button and add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        const themeToggleBtn = document.createElement('button');
        themeToggleBtn.id = 'themeToggle';
        themeToggleBtn.className = 'theme-toggle';
        themeToggleBtn.setAttribute('aria-label', 'Toggle theme');
        themeToggleBtn.innerHTML = `
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
        `;

        // Insert before hamburger menu
        const hamburger = document.getElementById('hamburger');
        navContainer.insertBefore(themeToggleBtn, hamburger);

        this.toggle = themeToggleBtn;
        this.setupToggle();
    }

    switchTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.currentTheme = newTheme;
        
        // Apply theme with animation
        this.applyTheme(newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update toggle state
        this.updateToggleState();
        
        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));

        // Add haptic feedback on supported devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    applyTheme(theme) {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', 
                theme === 'light' ? '#ffffff' : '#0a0a0f'
            );
        }

        // Smooth transition for particles
        this.updateParticleColors(theme);
    }

    updateToggleState() {
        if (!this.toggle) return;
        
        if (this.currentTheme === 'light') {
            this.toggle.classList.add('light');
            this.toggle.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            this.toggle.classList.remove('light');
            this.toggle.setAttribute('aria-label', 'Switch to light theme');
        }
    }

    updateParticleColors(theme) {
        // Update particle colors based on theme
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            if (theme === 'light') {
                // Slightly more visible particles in light theme
                particle.style.opacity = '0.6';
            } else {
                // Default opacity for dark theme
                particle.style.opacity = '0.8';
            }
        });
    }

    // Method to programmatically set theme
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.updateToggleState();
            localStorage.setItem('theme', theme);
        }
    }

    // Method to get current theme
    getTheme() {
        return this.currentTheme;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        createParticles();
        setTimeout(typeWriter, 1000);
        createGlitchEffect();
        initializeSkillsNavigation();
        
        // Initialize theme toggle
        const themeToggle = new ThemeToggle();
        window.themeToggle = themeToggle;
        
        preloadResources();
        
        // Add all CSS styles
        addAllStyles();
        
    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});

// Function to add all CSS styles safely
function addAllStyles() {
    // Add glitch effect CSS
    const glitchCSS = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    `;
    addStyleSheet('glitch-styles', glitchCSS);

    // Add theme transition CSS
    const themeTransitionsCSS = `
    .theme-transitions,
    .theme-transitions *,
    .theme-transitions *:before,
    .theme-transitions *:after {
        transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .theme-transitions .particle {
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .theme-toggle {
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 1rem;
        position: relative;
        overflow: hidden;
    }

    .theme-toggle:hover {
        border-color: var(--primary-color);
        background: rgba(0, 102, 255, 0.1);
    }

    .theme-toggle i {
        position: absolute;
        font-size: 1rem;
        transition: all 0.3s ease;
        color: var(--text-primary);
    }

    .theme-toggle .fa-sun {
        opacity: 0;
        transform: rotate(180deg) scale(0.5);
    }

    .theme-toggle .fa-moon {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    .theme-toggle.light .fa-sun {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    .theme-toggle.light .fa-moon {
        opacity: 0;
        transform: rotate(-180deg) scale(0.5);
    }
    `;
    addStyleSheet('theme-styles', themeTransitionsCSS);

    // Add screen reader CSS
    const srOnlyCSS = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    `;
    addStyleSheet('sr-only-styles', srOnlyCSS);

    // Add light theme CSS variables
    const lightThemeCSS = `
    [data-theme="light"] {
        --primary-color: #0066ff;
        --primary-dark: #0052cc;
        --primary-light: #3385ff;
        --secondary-color: #00d4aa;
        --accent-color: #ff6b35;
        --warning-color: #ffa726;
        --dark-bg: #ffffff;
        --dark-secondary: #f8f9fa;
        --dark-tertiary: #e9ecef;
        --text-primary: #212529;
        --text-secondary: rgba(33, 37, 41, 0.8);
        --text-muted: rgba(33, 37, 41, 0.6);
    }

    [data-theme="light"] .navbar {
        background: rgba(255, 255, 255, 0.95);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    [data-theme="light"] .particle {
        opacity: 0.4 !important;
    }

    [data-theme="light"] .cyber-grid {
        background-image: 
            linear-gradient(rgba(0, 102, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 255, 0.05) 1px, transparent 1px);
    }
    `;
    addStyleSheet('light-theme-styles', lightThemeCSS);
}

// Helper function to safely add stylesheets
function addStyleSheet(id, css) {
    // Remove existing stylesheet with same ID
    const existing = document.getElementById(id);
    if (existing) {
        existing.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
}

// Listen for system theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a theme
        if (!localStorage.getItem('theme') && window.themeToggle) {
            window.themeToggle.setTheme(e.matches ? 'light' : 'dark');
        }
    });
}

// Optional: Add theme toggle to keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + T to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        if (window.themeToggle) {
            window.themeToggle.switchTheme();
        }
    }
});

// Add theme change announcement for screen readers
document.addEventListener('themeChanged', (e) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${e.detail.theme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
});