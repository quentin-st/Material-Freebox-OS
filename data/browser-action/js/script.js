/**
 * Material-Freebox-OS
 * Browser action JS
 */

$(document).ready(function () {
    // Wallpapers
    var wallpapers = $('.wallpapers').find('li');

    // Highlight active wallpaper TODO
    wallpapers.filter(':first-child').addClass('current');

    // Update current wallpaper
    wallpapers.click(function () {
        wallpapers.removeClass('current');
        $(this).addClass('current');

        chrome.tabs.executeScript(null, {code: "document.body.style.backgroundImage = \"url('" + chrome.extension.getURL($(this).data('uri')) + "')\";"});
    });
});
