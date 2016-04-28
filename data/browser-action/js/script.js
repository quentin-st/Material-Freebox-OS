/**
 * Material-Freebox-OS
 * Browser action JS
 */
(function() {
    var BrowserAction = {
        updateColorsAndSave: function(primary, accent) {
            $('body')
                .attr('data-color-primary', primary)
                .attr('data-color-accent', accent);

            BrowserAction.updateColorsInTab(primary, accent);
            chrome.storage.local.set({
                'color-primary': primary,
                'color-accent': accent
            });
        },

        updateColorsInTab: function(primary, accent) {
            chrome.tabs.getSelected(null, function(tab) {
                if (MaterialFreeboxOS.matches(tab.title)) {
                    var updateColors = function(primary, accent) {
                        document.body.setAttribute('data-color-primary', primary);
                        document.body.setAttribute('data-color-accent', accent);
                    };

                    var code =
                        "var updateColors = " + updateColors.toString() + ";\
                        updateColors('" + primary + "', '" + accent + "');";

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
        // Colors
        var primaryColorsUl = $('#colors-primary'),
            accentColorsUl = $('#colors-accent');

        // Inflate list
        MaterialFreeboxOS.materialColors.colors.forEach(function(color) {
            $('<li />')
                .attr('data-color', color)
                .css('background-color', color)
                .appendTo(primaryColorsUl)
                .clone().appendTo(accentColorsUl);
        });

        var primaryColor_colors = primaryColorsUl.find('li'),
            accentColor_colors = accentColorsUl.find('li');

        // Retrieve current settings
        chrome.storage.local.get('color-primary', function(data) {
            var defaultPrimaryColor = MaterialFreeboxOS.materialColors.defaultPrimary,
                primaryColor = data['color-primary'] || defaultPrimaryColor;

            primaryColor_colors.filter('[data-color="' + primaryColor + '"]').addClass('current');
            $('body').attr('data-color-primary', primaryColor)
        });
        chrome.storage.local.get('color-accent', function(data) {
            var defaultAccentColor = MaterialFreeboxOS.materialColors.defaultAccent,
                accentColor = data['color-accent'] || defaultAccentColor;

            accentColor_colors.filter('[data-color="' + accentColor + '"]').addClass('current');
            $('body').attr('data-color-accent', accentColor);
        });

        // Update current colors
        $(primaryColor_colors, accentColor_colors).click(function() {
            $(this).closest('ul').find('li').removeClass('current');
            $(this).addClass('current');

            BrowserAction.updateColorsAndSave(
                primaryColorsUl.find('li.current').attr('data-color'),
                accentColorsUl.find('li.current').attr('data-color')
            );
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
