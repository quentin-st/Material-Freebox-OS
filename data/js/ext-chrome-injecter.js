/**
 * Material-Freebox-OS
 * Content-script
 */
(function() {
    if (document.title.indexOf('Freebox OS') == 0) {
        var meta_name = 'Material-Freebox-OS';

        // Check if Material-Freebox-OS meta tag is here
        // (it means that another instance has already been injected)
        if (MaterialFreeboxOS.hasMeta(meta_name))
            throw new Error('Material-Freebox-OS already injected, aborting.');

        // Append Material-Freebox-OS meta tag to head
        MaterialFreeboxOS.addMeta(meta_name, true);

        // Inject dependencies
        var deps = {
            js: [
                'data/js/script.js'
            ],
            css: [
                'data/css/style.css',
                'data/3d/css/materialdesignicons.min.css',
                'https://fonts.googleapis.com/css?family=Roboto:400,300'
            ]
        };

        var getDepUrl = function(url) {
            return url.substring(0, 'http'.length) == 'http'
                ? url
                : chrome.extension.getURL(url);
        };

        // Inject scripts
        for (var i=0; i<deps.js.length; i++)
            MaterialFreeboxOS.injectScript(getDepUrl(deps.js[i]));

        // Inject stylesheets
        for (var y=0; y<deps.css.length; y++)
            MaterialFreeboxOS.injectStylesheet(getDepUrl(deps.css[y]));
    }
})();
