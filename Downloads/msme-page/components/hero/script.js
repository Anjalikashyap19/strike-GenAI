



document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // --- Select Elements ---
        const actionButtons = document.querySelectorAll('.app-action-btn');
        const modal = document.getElementById('notification-modal');
        const modalText = document.getElementById('notification-text');

       
        const docsPopupOverlay = document.getElementById('docs-popup-overlay');
        const backBtn = document.getElementById('back-to-main');
        const closeCross=document.querySelector('#close-docs-popup')
        
        const msmedocsPopupOverlay=document.querySelector('#msmedocs-popup-overlay')
        const msmeBackBtn=document.querySelector('#msmeback-to-main')
        const msmeCloseCross=document.querySelector('#msmeclose-docs-popup')

        // --- Action Buttons ---
        actionButtons.forEach(button => {

            // Payment redirect buttons
            if (button.id === 'open-udyam-reg-modal-btn' || button.id === 'open-udyam-aadhar-modal-btn') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = 'https://ease.buzz/25106H0jmM';
                });
                return;
            }

            // Docs popup button
            if (button.id === 'open-udyam-aadhar-docs-modal-btn') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    docsPopupOverlay.style.display = 'flex';
                });
                return;
            }
            //msme docs popup

            if(button.id==='open-msme-docs-modal-btn'){
                button.addEventListener('click',(e) =>{
                    e.preventDefault();
                    msmedocsPopupOverlay.style.display='flex'
                } );
                return
            }

            // Generic notification modal logic
            button.addEventListener('click', (e) => {
                const message = button.getAttribute('data-message');
                if (message && modal && modalText) {
                    modalText.textContent = message;
                    modal.classList.add('show');
                    setTimeout(() => modal.classList.remove('show'), 2000);
                }
            });
        });

        // --- Close Docs Popup ---
        if (backBtn && docsPopupOverlay) {
            backBtn.addEventListener('click', () => {
                docsPopupOverlay.style.display = 'none';
            });
        }
        closeCross.addEventListener('click',function(){
            docsPopupOverlay.style.display='none'
        })

       msmeBackBtn.addEventListener('click',()=>{
        msmedocsPopupOverlay.style.display='none'
       })
        msmeCloseCross.addEventListener('click',()=>{
        msmedocsPopupOverlay.style.display='none'
       })


        // --- Slidable Button Logic ---
        const slideContainer = document.getElementById('slide-container');
        if (slideContainer) {
            const sliderKnob = document.getElementById('slider-knob');
            const sliderText = document.getElementById('slider-text');

            let isDragging = false;
            let startX = 0;
            let currentTranslate = 0;

            const getEventX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

            const startDrag = (e) => {
                isDragging = true;
                startX = getEventX(e);
                slideContainer.style.cursor = 'grabbing';
                sliderKnob.style.transition = 'none';
                sliderText.style.transition = 'none';
            };

            const onDrag = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const moveX = getEventX(e) - startX;
                const maxSlide = slideContainer.offsetWidth - sliderKnob.offsetWidth - 8;
                currentTranslate = Math.max(0, Math.min(moveX, maxSlide));
                sliderKnob.style.transform = `translateX(${currentTranslate}px)`;
                sliderText.style.opacity = 1 - (currentTranslate / maxSlide) * 1.5;
            };

            const endDrag = () => {
                if (!isDragging) return;
                isDragging = false;
                slideContainer.style.cursor = 'grab';
                sliderKnob.style.transition = 'transform 0.3s ease-out';
                sliderText.style.transition = 'opacity 0.3s ease-out';

                const maxSlide = slideContainer.offsetWidth - sliderKnob.offsetWidth - 8;
                const threshold = maxSlide * 0.8;

                if (currentTranslate > threshold) {
                    sliderKnob.style.transform = `translateX(${maxSlide}px)`;
                    sliderText.textContent = "Done!";
                    sliderText.style.opacity = 1;
                    slideContainer.style.pointerEvents = 'none';
                    if (modal && modalText) {
                        modalText.textContent = "Showing eligibility criteria...";
                        modal.classList.add('show');
                        setTimeout(() => modal.classList.remove('show'), 2000);
                    }
                } else {
                    sliderKnob.style.transform = 'translateX(0)';
                    sliderText.style.opacity = 1;
                }
            };

            slideContainer.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', endDrag);

            slideContainer.addEventListener('touchstart', startDrag, { passive: true });
            document.addEventListener('touchmove', onDrag);
            document.addEventListener('touchend', endDrag);
        }

    }, 500);
});





