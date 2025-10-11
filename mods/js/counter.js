const icon = twemoji.parse("⬇️",
    {
        className: 'twemoji',
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'
    }
);

function updateDownloads() {
    fetch('https://api.modrinth.com/v2/project/alloyspawn')
        .then(response => response.json())
        .then(data => {
            const latestVersion = data;
            const downloadCount = latestVersion.downloads;
            document.getElementById('modrinth-downloads').innerHTML = `${icon} ${downloadCount.toLocaleString()} downloads`;
        })
        .catch(error => {
            document.getElementById('modrinth-downloads').innerHTML = `${icon} Error loading downloads`;
        });

    fetch('https://api.github.com/repos/ghluka/CamelClientLegacy/releases/latest')
        .then(response => response.json())
        .then(data => {
            let totalDownloads = 0;
            data.assets.forEach(asset => {
                totalDownloads += asset.download_count;
            });
            document.getElementById('github-downloads').innerHTML = `${icon} ${totalDownloads.toLocaleString()} downloads`;
        })
        .catch(error => {
            document.getElementById('github-downloads').innerHTML = `${icon} Error loading downloads`;
        });
}

updateDownloads();