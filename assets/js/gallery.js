const gallery = document.getElementById('screenshots');
const images = gallery.querySelectorAll('img');
let overlay = null;
let originalParent = null;
let originalNextSibling = null;

images.forEach(img => {
    img.addEventListener('click', (e) => {
        if (overlay) return;
        e.stopPropagation();

        overlay = document.createElement('div');
        overlay.classList.add('enlarged');

        originalParent = img.parentNode;
        originalNextSibling = img.nextSibling;

        overlay.appendChild(img);
        document.body.appendChild(overlay);
    });
});

document.addEventListener('click', () => {
    if (overlay) {
        const img = overlay.querySelector('img');

        if (originalNextSibling) {
            originalParent.insertBefore(img, originalNextSibling);
        } else {
            originalParent.appendChild(img);
        }

        overlay.remove();
        overlay = null;
        originalParent = null;
        originalNextSibling = null;
    }
});