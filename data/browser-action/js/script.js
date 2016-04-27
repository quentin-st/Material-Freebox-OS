/**
 * Material-Freebox-OS
 * Browser action JS
 */
(function() {
    var BrowserAction = {
        updateWallpaperAndSave: function(uri) {
            BrowserAction.updateWallpaperInTab(uri, MaterialFreeboxOS.wallpaper.findWallpaperInfos(uri));
            chrome.storage.local.set({
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
                        MaterialFreeboxOS.wallpaper.updateWallpaperCredits(element, wallpaperInfos);
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
        MaterialFreeboxOS.wallpaper.wallpapers.forEach(function(wallpaper) {
            $('<li />')
                .attr('data-uri', wallpaper.image)
                .attr('data-credits', wallpaper.credits)
                .attr('data-source', wallpaper.source)
                .css('background-image', "url(" + MaterialFreeboxOS.getDepURI(wallpaper.image) + ")")
                .prependTo(wallpapersUl);
        });

        // Firefox: disable wallpapers URI & stop here
        if (MaterialFreeboxOS.environment.isFirefox()) {
            $('.part-wallpapers').css('opacity', '0.2');
            $('.unsupported').show();
            return;
        }

        var wallpapers_images = wallpapersUl.find('li'),
            wallpapers_url = $('#wallpapers-url');

        // Retrieve current settings
        chrome.storage.local.get('wallpaper', function(data) {
            var defaultWallpaper = MaterialFreeboxOS.wallpaper.defaultWallpaper.image,
                wallpaper = data['wallpaper'] || defaultWallpaper;

            if (MaterialFreeboxOS.wallpaper.findWallpaperInfos(wallpaper) != null)
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
            BrowserAction.updateWallpaperAndSave($('input[type="file"]').val());
        });
    });
})();
