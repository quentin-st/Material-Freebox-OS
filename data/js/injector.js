/**
 * Material-Freebox-OS
 * Client dependencies injector
 */
(function() {
    if (!MaterialFreeboxOS.matches(document.title))
        return;

    // Define functions
    var Injector = {
        metaName: 'MaterialFreeboxOS',
        hasMeta: function(key) {
            var metas = document.getElementsByTagName('meta');
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].name == key)
                    return true;
            }

            return false;
        },
        addMeta: function(key, val) {
            var m = document.createElement('meta');
            m.name = key;
            m.content = val;
            document.head.appendChild(m);
            return m;
        },
        getDeps: function() {
            return {
                js: [
                    'data/js/material-freebox-os.js',
                    'data/js/content-script.js'
                ],
                css: [
                    'data/css/style.css',
                    'data/css/fonts/roboto.css',
                    'data/css/fonts/materialdesignicons.css'
                ]
            };
        },
        injectScript: function(src) {
            var s = document.createElement('script');
            s.src = src;
            (document.head || document.documentElement).appendChild(s);
        },
        injectStylesheet: function(src) {
            var s = document.createElement('link');
            s.rel = 'stylesheet';
            s.href = src;
            s.media = 'all';
            s.type = 'text/css';
            document.head.appendChild(s);
        },
        injectAll: function() {
            var deps = this.getDeps();
            var that = this;

            // Inject scripts
            deps.js.forEach(function(uri) {
                that.injectScript(MaterialFreeboxOS.getDepURI(uri));
            });

            // Inject stylesheets
            deps.css.forEach(function(uri) {
                that.injectStylesheet(MaterialFreeboxOS.getDepURI(uri));
            });
        },
        applyColors: function() {
            if (MaterialFreeboxOS.environment.isFirefox()) {
                // On Firefox, we cannot access chrome.storage.local: apply default colors
                document.body.setAttribute('data-color-primary', MaterialFreeboxOS.materialColors.defaultPrimary);
                document.body.setAttribute('data-color-accent', MaterialFreeboxOS.materialColors.defaultAccent);
            } else {
                chrome.storage.local.get('color-primary', function (data) {
                    var primaryColor = data['color-primary'] || MaterialFreeboxOS.materialColors.defaultPrimary;

                    document.body.setAttribute('data-color-primary', primaryColor);
                });
                chrome.storage.local.get('color-accent', function (data) {
                    var accentColor = data['color-accent'] || MaterialFreeboxOS.materialColors.defaultAccent;

                    document.body.setAttribute('data-color-accent', accentColor);
                });
            }
        },
        applyWallpaper: function() {
            if (MaterialFreeboxOS.environment.isFirefox())
                return;

            // Retrieve setting
            chrome.storage.local.get('wallpaper', function(data) {
                var wallpaperUri = data['wallpaper'] || MaterialFreeboxOS.wallpaper.defaultWallpaper.image;

                var wallpaperInfos = MaterialFreeboxOS.wallpaper.findWallpaperInfos(wallpaperUri);

                document.body.style.backgroundImage = "url('" + MaterialFreeboxOS.getDepURI(wallpaperUri) + "')";

                // Add credits information to page
                var span = document.createElement('a');
                span.className = 'desktop-wallpaper-credits';
                document.body.appendChild(span);

                if (wallpaperInfos !== null)
                    MaterialFreeboxOS.wallpaper.updateWallpaperCredits(span, wallpaperInfos);
            });
        }
    };

    // Check if Material-Freebox-OS meta tag is here
    // (it would mean that another instance has already been injected)
    if (Injector.hasMeta(Injector.metaName))
        throw new Error('Material-Freebox-OS already injected, aborting.');

    // Append Material-Freebox-OS meta tag to head
    Injector.addMeta(Injector.metaName, true);

    // Apply colors & wallpaper (defined in browser-action)
    Injector.applyColors();
    Injector.applyWallpaper();

    // Inject dependencies
    Injector.injectAll();
})();
