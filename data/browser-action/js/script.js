/**
 * Material-Freebox-OS
 * Browser action JS
 */
(function() {
    var BrowserAction = {
        /**
         * Updates wallpaper in current tab
         * @param projectUri
         */
        updateWallpaperInTab: function(projectUri) {
            var uri = chrome.extension.getURL(projectUri);

            chrome.tabs.getSelected(null, function(tab) {
                console.log(tab.title);
                if (tab.title.indexOf('Freebox OS') == 0) {
                    chrome.tabs.executeScript(null, {
                        code: "document.body.style.backgroundImage = \"url('" + uri + "')\";"
                    })
                }
            });
        }
    };

    $(document).ready(function () {
        // Wallpapers
        var wallpapers = $('.wallpapers').find('li');

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

            BrowserAction.updateWallpaperInTab(uri);
            chrome.storage.sync.set({
                'wallpaper': uri
            });
        });
    });
})();
