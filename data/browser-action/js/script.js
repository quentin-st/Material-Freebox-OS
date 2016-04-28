/**
 * Material-Freebox-OS
 * Browser action JS
 */
(function() {
    var BrowserAction = {
        updatePrimaryColorAndSave: function(color) {
            $('body').attr('data-primary-color', color);
            BrowserAction.updatePrimaryColorInTab(color);
            chrome.storage.local.set({
                'primary-color': color
            });
        },

        updatePrimaryColorInTab: function(color) {
            chrome.tabs.getSelected(null, function(tab) {
                if (MaterialFreeboxOS.matches(tab.title)) {
                    var updatePrimaryColor = function(color) {
                        document.body.setAttribute('data-primary-color', color);
                    };

                    var code =
                        "var updatePrimaryColor = " + updatePrimaryColor.toString() + ";\
                        updatePrimaryColor('" + color + "');";

                    chrome.tabs.executeScript(null, {
                        code: code
                    });
                }
            });
        },

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
        // Primary colors
        var primaryColorsUl = $('#primary-colors');

        // Inflate list
        MaterialFreeboxOS.primaryColor.colors.forEach(function(color) {
            $('<li />')
                .attr('data-color', color)
                .css('background-color', color)
                .appendTo(primaryColorsUl);
        });

        var primaryColor_colors = primaryColorsUl.find('li');

        // Retrieve current settings
        chrome.storage.local.get('primary-color', function(data) {
            var defaultPrimaryColor = MaterialFreeboxOS.primaryColor.defaultColor,
                primaryColor = data['primary-color'] || defaultPrimaryColor;

            primaryColor_colors.filter('[data-color="' + primaryColor + '"]').addClass('current');
            $('body').attr('data-primary-color', primaryColor)
        });

        // Update current primary color
        primaryColor_colors.click(function() {
            primaryColor_colors.removeClass('current');
            $(this).addClass('current');

            BrowserAction.updatePrimaryColorAndSave($(this).attr('data-color'));
        });


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
    });
})();
