/**
 * Material-Freebox-OS
 * Chrome-specific injecter
 */
(function() {
    if (document.title.indexOf('Freebox OS') == 0) {
        // Check if Material-Freebox-OS meta tag is here
        // (it would mean that another instance has already been injected)
        var meta_name = MaterialFreeboxOS.name;
        if (MaterialFreeboxOS.hasMeta(meta_name))
            throw new Error('Material-Freebox-OS already injected, aborting.');

        // Append Material-Freebox-OS meta tag to head
        MaterialFreeboxOS.addMeta(meta_name, true);

        // Inject dependencies
        var deps = MaterialFreeboxOS.getDependencies('Chrome');

        var getDepUrl = function(url) {
            return url.substring(0, 'http'.length) == 'http'
                ? url
                : chrome.extension.getURL(url);
        };

        // Inject scripts
        deps.js.forEach(function(uri) {
            MaterialFreeboxOS.injectScript(getDepUrl(uri));
        });

        // Inject stylesheets
        deps.css.forEach(function(uri) {
            MaterialFreeboxOS.injectStylesheet(getDepUrl(uri));
        });
    }
})();
