document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollUp');
    let scrollAnimation;
    
    function scrollToTop() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 0) {
            window.scrollBy(0, -15);
            scrollAnimation = requestAnimationFrame(scrollToTop);
        } else {
            cancelAnimationFrame(scrollAnimation);
        }
    }
    
    scrollButton.addEventListener('click', function() {
        cancelAnimationFrame(scrollAnimation); // Остановить предыдущую анимацию
        scrollToTop();
    });
    
    // Остановить скролл при прокрутке колесиком
    window.addEventListener('wheel', function() {
        cancelAnimationFrame(scrollAnimation);
    });
});