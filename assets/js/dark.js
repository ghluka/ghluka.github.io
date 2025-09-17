(function() {
    const COOKIE_NAME = 'site_theme';
    const cookieDays = 365;

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';path=/;expires=' + d.toUTCString() + ';SameSite=Lax';
    }

    function getCookie(name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (let i = 0; i < cookies.length; i++) {
            const parts = cookies[i].split('=');
            const key = decodeURIComponent(parts.shift());
            const val = parts.join('=');
            if (key === name) return decodeURIComponent(val || '');
        }
        return null;
    }

    function applyTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-theme', theme);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        updateToggleButton();
    }

    function getSystemPrefersDark() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function updateToggleButton() {
        const btn = document.getElementById('theme-toggle');
        const icon = document.getElementById('theme-icon');
        if (!btn || !icon) return;

        const explicit = getCookie(COOKIE_NAME);
        let theme = explicit || (getSystemPrefersDark() ? 'dark' : 'light');

        if (explicit) {
            theme = explicit;
        } else if (!explicit && document.documentElement.hasAttribute('data-theme')) {
            theme = document.documentElement.getAttribute('data-theme') || (getSystemPrefersDark() ? 'dark' : 'light');
        }

        if (theme === 'dark') {
            btn.setAttribute('aria-pressed', 'true');
            icon.innerHTML = twemoji.parse('☀️', {
                className: 'twemoji',
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'
            });
            btn.title = 'Switch to light mode';
        } else {
            btn.setAttribute('aria-pressed', 'false');
            icon.innerHTML = twemoji.parse('🌙', {
                className: 'twemoji',
                folder: 'svg',
                ext: '.svg',
                base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'
            });
            btn.title = 'Switch to dark mode';
        }
    }

    function toggleTheme() {
        const explicit = getCookie(COOKIE_NAME);
        const current = explicit || (getSystemPrefersDark() ? 'dark' : 'light');
        const newTheme = (current === 'dark') ? 'light' : 'dark';
        setCookie(COOKIE_NAME, newTheme, cookieDays);
        
        applyTheme(newTheme);
    }

    (function init() {
        const explicit = getCookie(COOKIE_NAME);
        if (explicit === 'dark' || explicit === 'light') {
            applyTheme(explicit);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.addEventListener('click', toggleTheme);

        if (!explicit && window.matchMedia) {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            if (mq.addEventListener) {
                mq.addEventListener('change', () => {
                    if (!getCookie(COOKIE_NAME)) {
                        updateToggleButton();
                    }
                });
            } else if (mq.addListener) {
                mq.addListener(() => {
                    if (!getCookie(COOKIE_NAME)) {
                        updateToggleButton();
                    }
                });
            }
        }

        updateToggleButton();
    })();
})();