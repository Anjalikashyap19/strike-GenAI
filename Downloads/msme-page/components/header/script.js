document.addEventListener('DOMContentLoaded', () => {
    // Wait for the DOM to be fully loaded, especially the header component
    setTimeout(() => {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavCloseBtn = document.querySelector('.mobile-nav-close');

        if (hamburger && mobileNav && mobileNavCloseBtn) {
            hamburger.addEventListener('click', () => {
                mobileNav.classList.add('is-open');
                document.body.classList.add('no-scroll');
            });

            mobileNavCloseBtn.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            });

            const mobileNavLinks = document.querySelectorAll('.mobile-nav-links > li > a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (link.nextElementSibling && link.nextElementSibling.classList.contains('submenu')) {
                        e.preventDefault();
                        const parentLi = link.parentElement;
                        const activeLi = document.querySelector('.mobile-nav-links > li.active');
                        if (activeLi && activeLi !== parentLi) {
                            activeLi.classList.remove('active');
                        }
                        parentLi.classList.toggle('active');
                    }
                });
            });
        }
    }, 500); // Delay to ensure components are loaded by the global script
});

