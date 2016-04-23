/**
 * Material-Freebox-OS
 * Browser action JS
 */
(function() {
    var BrowserAction = {
        /**
         * Updates wallpaper in current tab
         * @param projectUri
         * @param wallpaperInfos
         */
        updateWallpaperInTab: function(projectUri, wallpaperInfos) {
            var uri = chrome.extension.getURL(projectUri);

            chrome.tabs.getSelected(null, function(tab) {
                if (MaterialFreeboxOS.matches(tab.title)) {
                    var updateWallpaper = function(uri, wallpaperInfos) {
                        document.body.style.backgroundImage = "url(" + uri + ")";

                        if (wallpaperInfos != undefined) {
                            var element = document.getElementsByClassName('desktop-wallpaper-credits')[0];
                            MaterialFreeboxOS.updateWallpaperCredits(element, wallpaperInfos);
                        }
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
        var wallpapersUl = $('.wallpapers');

        // Inflate list
        MaterialFreeboxOS.wallpapers.forEach(function(wallpaper) {
            $('<li />')
                .attr('data-uri', wallpaper.image)
                .attr('data-credits', wallpaper.credits)
                .attr('data-source', wallpaper.source)
                .css('background-image', "url(" + MaterialFreeboxOS.getDepURI(wallpaper.image) + ")")
                .appendTo(wallpapersUl);
        });
        var wallpapers = wallpapersUl.find('li');

        // Retrieve current settings
        chrome.storage.sync.get('wallpaper', function(data) {
            var defaultWallpaper = wallpapers.first().data('uri'),
                settingsWallpaper = data['wallpaper'] || defaultWallpaper;

            wallpapers.filter('[data-uri="' + settingsWallpaper + '"]').addClass('current');
        });

        // Update current wallpaper
        wallpapers.click(function () {
            var uri = $(this).data('uri');
            wallpapers.removeClass('current');
            $(this).addClass('current');

            BrowserAction.updateWallpaperInTab(uri, MaterialFreeboxOS.findWallpaperInfos(uri));
            chrome.storage.sync.set({
                'wallpaper': uri
            });
        });
    });
})();
