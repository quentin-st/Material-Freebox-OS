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
            var prefix = relative.substring(0, 'http'.length);

            return prefix == 'http' || prefix == 'file'
                ? relative
                : chrome.extension.getURL(relative);
        },

        primaryColor: {
            colors: [
                '#2196F3', // blue
                '#F55145', // red
                '#673AB7', // deep-purple
                '#3F51B5', // indigo
                '#009688', // teal
                '#4CAF50', // green
                '#8BC34A', // light-green
                '#FFC107', // amber
                '#FF9800', // orange
                '#FF5722', // deep-orange
                '#795548', // brown
                '#607D8B'  // blue-grey
            ],

            get defaultColor() {
                return this.colors[0]
            }
        },

        /**
         * Wallpaper-related methods
         */
        wallpaper: {
            findWallpaperInfos: function (uri) {
                var wallpaper = null;

                this.wallpapers.forEach(function (w) {
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
                    name: 'Golden Gate Afternoon',
                    credits: 'Romain Guy',
                    source: 'http://www.curious-creature.org/',
                    image: 'data/img/wallpaper6.jpg'
                }
            ],

            get defaultWallpaper() {
                return this.wallpapers[0];
            },

            updateWallpaperCredits: function (element, wallpaperInfos) {
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

                // Equivalent for element.innerHTML = "Fond d'écran : <b>" + wallpaperInfos['name'] + "</b> par <b>" + wallpaperInfos['credits'] + "</b>";
                //  but Firefox validation process will complain about creating DOM nodes from HTML string
                element.innerHTML = '';
                element.appendChild(document.createTextNode("Fond d'écran : "));
                element.appendChild(
                    document.createElement('b').appendChild(document.createTextNode(wallpaperInfos['name'])).parentNode
                );
                element.appendChild(document.createTextNode(" par "));
                element.appendChild(
                    document.createElement('b').appendChild(document.createTextNode(wallpaperInfos['credits'])).parentNode
                );
            }
        },

        environment: {
            isFirefox: function() {
                return /firefox/i.test(navigator.userAgent);
            }
        }
    };
})();
