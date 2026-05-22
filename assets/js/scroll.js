function initCarousel(grid) {
    if (grid._carouselInit) return;
    if (grid.offsetWidth === 0) return;

    const cards = [...grid.children];
    if (cards.length === 0) return;

    const gap = 4;
    const cardWidth = cards[0].offsetWidth + gap;
    const totalCardsWidth = cardWidth * cards.length;

    if (totalCardsWidth <= grid.offsetWidth) return;

    grid._carouselInit = true;

    cards.forEach(card => grid.appendChild(card.cloneNode(true)));

    let scrollPos = 0;
    grid.scrollLeft = 0;

    let paused = false;
    const speed = 0.5;

    grid.addEventListener('mouseenter', () => paused = true);
    grid.addEventListener('mouseleave', () => paused = false);
    grid.addEventListener('touchstart', () => paused = true, { passive: true });
    grid.addEventListener('touchend', () => setTimeout(() => paused = false, 1000), { passive: true });

    function tick() {
        if (!paused) {
            scrollPos += speed;
            if (scrollPos >= totalCardsWidth) scrollPos -= totalCardsWidth;
            grid.scrollLeft = scrollPos;
        }
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

document.querySelectorAll('.projects-grid').forEach(grid => {
    requestAnimationFrame(() => initCarousel(grid));
});

document.querySelectorAll('.tab-radio').forEach(radio => {
    radio.addEventListener('change', () => {
        setTimeout(() => {
            document.querySelectorAll('.projects-grid').forEach(grid => {
                if (grid.offsetWidth > 0) initCarousel(grid);
            });
        }, 50);
    });
});