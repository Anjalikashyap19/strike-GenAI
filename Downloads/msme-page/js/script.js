document.addEventListener('DOMContentLoaded', function () {

    /**
     * Loads an HTML component from a file into a specified container element.
     * @param {string} component - The name of the component (e.g., 'header').
     */
    const loadComponent = (component) => {
        const container = document.getElementById(`${component}-container`);
        if (container) {
            fetch(`components/${component}/index.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not load component: ${component}`);
                    }
                    return response.text();
                })
                .then(html => {
                    container.innerHTML = html;
                })
                .catch(error => console.error(error));
        }
    };

    // Array of all components to load
    const components = [
        'header', 'hero', 'client-logos', 'features', 
        'process', 'faq', 'testimonials', 'cta', 'footer',
        'utility', 'modals'
    ];

    // Load all components
    components.forEach(loadComponent);

    // --- Global Theme Switcher Logic ---
    const initThemeSwitcher = () => {
        const themeToggle = document.getElementById('theme-toggle-checkbox');
        
        // Set initial state based on localStorage or system preference
        if (localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark-mode');
            if (themeToggle) themeToggle.checked = true;
        } else {
            if (themeToggle) themeToggle.checked = false;
        }

        // Add event listener
        if(themeToggle){
            themeToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                }
            });
        }
    };

    // --- Global Scroll Animation Logic ---
    const initScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('is-visible');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                }
            });
        };

        // Initial check and add scroll listener
        handleScrollAnimation();
        window.addEventListener('scroll', handleScrollAnimation);
    };

    // Wait a brief moment for components to load before initializing scripts
    setTimeout(() => {
        initThemeSwitcher();
        initScrollAnimations();
    }, 500); // 500ms delay might need adjustment based on component complexity
});

