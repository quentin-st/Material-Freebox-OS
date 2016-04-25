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
            /**
             * IMPORTANT
             * Firefox reviewers, please read this:
             * I tried everything to avoid importing MaterialDesignIcons & Roboto from a remote server, but it fails
             *  on Firefox (while all the techniques mentioned worked on Google Chrome). I documented the process here:
             *  https://github.com/chteuchteu/Material-Freebox-OS/issues/6.
             */
            return {
                js: [
                    'data/js/material-freebox-os.js',
                    'data/js/script.js'
                ],
                css: [
                    'data/css/style.css',
                    //'https://cdn.materialdesignicons.com/1.5.54/css/materialdesignicons.min.css', <- Invalid certificate, let's use this one instead:
                    'https://www.s-quent.in/bundles/app/3d/css/materialdesignicons.min.css',
                    'https://fonts.googleapis.com/css?family=Roboto:400,300'
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
        applyWallpaper: function() {
            // Retrieve setting
            chrome.storage.local.get('wallpaper', function(data) {
                var wallpaperUri = data['wallpaper'];
                if (wallpaperUri === undefined)
                    wallpaperUri = MaterialFreeboxOS.wallpaper.defaultWallpaper.image;

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

    // Update wallpaper (defined in browser-action)
    if (!MaterialFreeboxOS.browser.isFirefox())
        Injector.applyWallpaper();

    // Inject dependencies
    Injector.injectAll();
})();
