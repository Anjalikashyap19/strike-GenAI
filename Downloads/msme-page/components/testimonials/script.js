document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const deckContainer = document.querySelector('.card-deck-container');
        if (deckContainer && window.innerWidth > 768) { // Only run slider on larger screens
            const cards = deckContainer.querySelectorAll('.testimonial-card');
            const nextBtn = deckContainer.querySelector('.deck-next-btn');
            const prevBtn = deckContainer.querySelector('.deck-prev-btn');
            
            if (cards.length < 2 || !nextBtn || !prevBtn) return;

            let currentIndex = 0;
            let autoPlayInterval;

            const updateCards = () => {
                cards.forEach((card, index) => {
                    card.classList.remove('active', 'next', 'prev');
                    const totalCards = cards.length;
                    if (index === currentIndex) {
                        card.classList.add('active');
                    } else if (index === (currentIndex + 1) % totalCards) {
                        card.classList.add('next');
                    } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
                        card.classList.add('prev');
                    }
                });
            };

            const startAutoPlay = () => {
                clearInterval(autoPlayInterval); // Clear existing interval
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % cards.length;
                    updateCards();
                }, 5000);
            };
            
            const resetAutoPlay = () => {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            };

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCards();
                resetAutoPlay();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCards();
                resetAutoPlay();
            });
            
            updateCards();
            startAutoPlay();
        }
    }, 500);
});

