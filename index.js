// Navigation toggle functionality
const initNavigation = () => {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.nav-toggle');
    
    if (menuBtn && nav) {
        // Toggle menu when button is clicked
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Prevent menu close when clicking the button
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close menu after clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
};

// Update footer year automatically
const updateFooterYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
};

// Contact form handling
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                note.textContent = 'Please complete all fields.';
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            note.textContent = 'Thanks! Your message was received. We will contact you shortly.';
            form.reset();
        });
    }
};

// Smooth scrolling for navigation links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
};

// Projects animation on scroll
const initProjectsAnimation = () => {
    const projects = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'all 0.5s ease-out';
        observer.observe(project);
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    updateFooterYear();
    initContactForm();
    initSmoothScroll();
    initProjectsAnimation();
});
