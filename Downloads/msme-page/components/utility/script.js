document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // --- Back to Top Button Logic ---
        const backToTopBtn = document.getElementById('back-to-top-btn');
        if (backToTopBtn) {
            const handleBackToTop = () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            };
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            window.addEventListener('scroll', handleBackToTop);
            handleBackToTop(); // Initial check
        }
        
        // --- Chat Widget Logic ---
        const chatToggleBtn = document.getElementById('chat-toggle-btn');
        const chatWindow = document.getElementById('chat-window');
        const chatCloseBtn = document.getElementById('chat-close-btn');
        const chatInput = document.getElementById('chat-input');
        const chatSendBtn = document.getElementById('chat-send-btn');
        const chatBody = document.getElementById('chat-body');

        if (chatToggleBtn && chatWindow && chatCloseBtn && chatInput && chatSendBtn && chatBody) {
            chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('show'));
            chatCloseBtn.addEventListener('click', () => chatWindow.classList.remove('show'));

            const handleSendMessage = () => {
                const messageText = chatInput.value.trim();
                if (messageText === "") return;
                const userMessage = document.createElement('div');
                userMessage.classList.add('chat-message', 'user');
                userMessage.textContent = messageText;
                chatBody.appendChild(userMessage);
                chatInput.value = "";
                chatBody.scrollTop = chatBody.scrollHeight;
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('chat-message', 'bot');
                    botMessage.textContent = "Thanks! Our legal expert will connect with you shortly.";
                    chatBody.appendChild(botMessage);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
            chatSendBtn.addEventListener('click', handleSendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSendMessage();
            });
        }
    }, 500);
});

