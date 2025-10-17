document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const adjustVideoHeight = () => {
            const timeline = document.querySelector('.process-timeline');
            const videoContainer = document.querySelector('.process-video');
            
            if (!timeline || !videoContainer) return;
            
            if (window.innerWidth > 992) {
                const timelineHeight = timeline.offsetHeight;
                videoContainer.style.height = `${timelineHeight}px`;
                videoContainer.style.paddingBottom = '0';
            } else {
                videoContainer.style.height = '0';
                videoContainer.style.paddingBottom = '56.25%';
            }
        };

        // Initial call and on resize
        adjustVideoHeight();
        window.addEventListener('resize', adjustVideoHeight);

        // Also call on load after a slight delay to ensure fonts/images are rendered
        window.addEventListener('load', adjustVideoHeight);
        
    }, 500);
});

