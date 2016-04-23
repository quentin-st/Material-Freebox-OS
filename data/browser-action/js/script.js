/**
 * Material-Freebox-OS
 * Browser action JS
 */
(function() {
    var BrowserAction = {
        updateWallpaperAndSave: function(uri) {
            BrowserAction.updateWallpaperInTab(uri, MaterialFreeboxOS.findWallpaperInfos(uri));
            chrome.storage.sync.set({
                'wallpaper': uri
            });
        },

        /**
         * Updates wallpaper in current tab
         * @param projectUri
         * @param wallpaperInfos
         */
        updateWallpaperInTab: function(projectUri, wallpaperInfos) {
            var uri = MaterialFreeboxOS.getDepURI(projectUri);

            chrome.tabs.getSelected(null, function(tab) {
                if (MaterialFreeboxOS.matches(tab.title)) {
                    var updateWallpaper = function(uri, wallpaperInfos) {
                        document.body.style.backgroundImage = "url(" + uri + ")";

                        var element = document.getElementsByClassName('desktop-wallpaper-credits')[0];
                        MaterialFreeboxOS.updateWallpaperCredits(element, wallpaperInfos);
                    };

                    var code =
                        "var updateWallpaper = " + updateWallpaper.toString() + ";\
                        updateWallpaper('" + uri + "', eval('(" + JSON.stringify(wallpaperInfos) + ")'))";

                    chrome.tabs.executeScript(null, {
                        code: code
                    });
                }
            });
        }
    };

    $(document).ready(function () {
        // Wallpapers
        var wallpapersUl = $('#wallpapers-images');

        // Inflate list
        MaterialFreeboxOS.wallpapers.forEach(function(wallpaper) {
            $('<li />')
                .attr('data-uri', wallpaper.image)
                .attr('data-credits', wallpaper.credits)
                .attr('data-source', wallpaper.source)
                .css('background-image', "url(" + MaterialFreeboxOS.getDepURI(wallpaper.image) + ")")
                .prependTo(wallpapersUl);
        });
        var wallpapers_images = wallpapersUl.find('li'),
            wallpapers_url = $('#wallpapers-url');

        // Retrieve current settings
        chrome.storage.sync.get('wallpaper', function(data) {
            var defaultWallpaper = wallpapers_images.first().data('uri'),
                wallpaper = data['wallpaper'] || defaultWallpaper;

            if (MaterialFreeboxOS.findWallpaperInfos(wallpaper) != null)
                wallpapers_images.filter('[data-uri="' + wallpaper + '"]').addClass('current');
            else
                wallpapers_url.val(wallpaper);
        });

        // Update current wallpaper: image
        wallpapers_images.click(function () {
            wallpapers_images.removeClass('current');
            $(this).addClass('current');
            wallpapers_url.val('');

            BrowserAction.updateWallpaperAndSave($(this).data('uri'));
        });

        // Update current wallpaper: input
        wallpapers_url.keyup(function(e) {
            if (e.which == 13) {
                wallpapers_images.removeClass('current');

                BrowserAction.updateWallpaperAndSave($(this).val());
            }
        });

        $('input[type="submit"]').click(function() {
            var uri = $('input[type="file"]').val();

            BrowserAction.updateWallpaperInTab(uri, null);
            chrome.storage.sync.set({
                'wallpaper': uri
            });
        });
    });
})();
