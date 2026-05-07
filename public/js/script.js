document.addEventListener('DOMContentLoaded', function () {
    // Animate role cards on load
    const cards = document.querySelectorAll('.role-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 + i * 120);
    });
});
