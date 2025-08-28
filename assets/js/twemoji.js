window.onload = function() {
    twemoji.parse(document.body,
        {
            className: 'twemoji',
            folder: 'svg',
            ext: '.svg',
            base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'
        }
    );
}