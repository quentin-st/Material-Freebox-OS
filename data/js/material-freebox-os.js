/**
 * Material-Freebox-OS
 * Shared scripts
 */
(function() {
    window.MaterialFreeboxOS = {
        /**
         * Returns true if page title begins with Freebox OS
         * @param pageTitle
         * @returns {boolean}
         */
        matches: function(pageTitle) {
            return pageTitle.indexOf('Freebox OS') == 0;
        },

        getDepURI: function(relative) {
            return relative.substring(0, 'http'.length) == 'http'
                ? relative
                : chrome.extension.getURL(relative);
        },

        findWallpaperInfos: function(uri) {
            var wallpaper = null;

            this.wallpapers.forEach(function(w) {
                if (w.image == uri)
                    wallpaper = w;
            });

            return wallpaper;
        },

        wallpapers: [
            {
                name: 'Earth 064',
                credits: 'Google Maps / DigitalGlobe',
                image: 'data/img/wallpaper1.jpg'
            },
            {
                name: 'Earth 152',
                credits: 'Google Maps / Aerometrex',
                image: 'data/img/wallpaper2.jpg'
            },
            {
                name: 'Off The Road',
                credits: 'Trey Ratcliff',
                source: 'http://www.stuckincustoms.com/',
                image: 'data/img/wallpaper3.jpg'
            },
            {
                name: 'The Remarkables',
                credits: 'Trey Ratcliff',
                source: 'http://www.stuckincustoms.com/',
                image: 'data/img/wallpaper4.jpg'
            },
            {
                name: 'Blue Sky',
                credits: 'Henry Lien',
                source: 'https://plus.google.com/u/1/+HenryLien/about',
                image: 'data/img/wallpaper5.jpg'
            },
            {
                name: 'Golden Gate Afternoon',
                credits: 'Romain Guy',
                source: 'http://www.curious-creature.org/',
                image: 'data/img/wallpaper6.jpg'
            }
        ],

        get defaultWallpaper() {
            return this.wallpapers[0];
        },

        updateWallpaperCredits: function(element, wallpaperInfos) {
            element.style.display = wallpaperInfos !== null ? 'block' : 'none';

            if (wallpaperInfos === null)
                return;

            if (wallpaperInfos['source'] !== undefined) {
                element.href = wallpaperInfos['source'];
                element.target = '_blank';
            } else {
                element.removeAttribute('href');
                element.removeAttribute('target');
            }

            element.innerHTML = "Fond d'écran : <b>" + wallpaperInfos['name'] + "</b> par <b>" + wallpaperInfos['credits'] + "</b>";
        }
    };
})();
