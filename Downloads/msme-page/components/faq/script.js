document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    // Close all other items
                    faqItems.forEach(i => i.classList.remove('active'));
                    // Toggle the current item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        }
    }, 500);
});

