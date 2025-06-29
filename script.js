document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to switch tabs
    function switchTab(targetTab) {
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const activeContent = document.getElementById(targetTab);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
            
            // Smooth scroll to top of content
            document.querySelector('.main-content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let newIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    newIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                    break;
                case 'ArrowRight':
                    newIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                    break;
                case 'Home':
                    newIndex = 0;
                    break;
                case 'End':
                    newIndex = tabButtons.length - 1;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            tabButtons[newIndex].focus();
            const targetTab = tabButtons[newIndex].getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Add floating paw animation
    function createFloatingPaw() {
        const pawContainer = document.querySelector('.paw-prints');
        if (!pawContainer) return;
        
        const paw = document.createElement('div');
        paw.innerHTML = '🐾';
        paw.style.position = 'absolute';
        paw.style.fontSize = Math.random() * 20 + 15 + 'px';
        paw.style.left = Math.random() * 100 + '%';
        paw.style.top = '100%';
        paw.style.opacity = '0.4';
        paw.style.pointerEvents = 'none';
        paw.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
        
        pawContainer.appendChild(paw);
        
        // Remove paw after animation
        setTimeout(() => {
            if (paw.parentNode) {
                paw.parentNode.removeChild(paw);
            }
        }, 7000);
    }
    
    // Add CSS animation for floating paws
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.4;
            }
            50% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create floating paws periodically
    setInterval(createFloatingPaw, 3000);
    
    // Add smooth scrolling for internal links
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
    
    // Add hover effect for info boxes
    const infoBoxes = document.querySelectorAll('.info-box, .responsibility-box, .value-box, .guideline-box, .prohibited-box, .method, .guideline, .report-option, .report-box');
    
    infoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add pet emoji rain effect on page load
    function createPetRain() {
        const emojis = ['🐕', '🐱', '🐾', '🦴', '🎾', '🐕‍🦺', '🐈', '🐩'];
        const rainContainer = document.createElement('div');
        rainContainer.style.position = 'fixed';
        rainContainer.style.top = '0';
        rainContainer.style.left = '0';
        rainContainer.style.width = '100%';
        rainContainer.style.height = '100%';
        rainContainer.style.pointerEvents = 'none';
        rainContainer.style.zIndex = '1001';
        
        document.body.appendChild(rainContainer);
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.position = 'absolute';
                emoji.style.fontSize = Math.random() * 20 + 20 + 'px';
                emoji.style.left = Math.random() * 100 + '%';
                emoji.style.top = '-50px';
                emoji.style.animation = `rainFall ${Math.random() * 2 + 3}s linear forwards`;
                
                rainContainer.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                    }
                }, 5000);
            }, i * 200);
        }
        
        // Remove rain container after animation
        setTimeout(() => {
            if (rainContainer.parentNode) {
                rainContainer.parentNode.removeChild(rainContainer);
            }
        }, 8000);
    }
    
    // Add rain animation CSS
    const rainStyle = document.createElement('style');
    rainStyle.textContent = `
        @keyframes rainFall {
            0% {
                transform: translateY(-50px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rainStyle);
    
    // Start pet rain after page loads
    setTimeout(createPetRain, 1000);
    
    // Add click effect to buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content sections for scroll animations
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add accessibility improvements
    tabButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
    });
    
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', `${content.id}-tab`);
    });
    
    // Update tabindex when tabs change
    const originalSwitchTab = switchTab;
    switchTab = function(targetTab) {
        originalSwitchTab(targetTab);
        
        tabButtons.forEach(btn => {
            btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');
        });
    };
    
    console.log('🐾 PawtnerUp Terms & Policies loaded successfully! 🐕🐱');
});
