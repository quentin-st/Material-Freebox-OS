/**
 * Material-Freebox-OS
 * Firefox-specific injecter
 */
(function() {
    var self = require("sdk/self");
    var pageMod = require("sdk/page-mod");
    let {Cc, Ci, Cu} = require("chrome");
    Cu.import(self.data.url('js/ext-base.js'), this);

    pageMod.PageMod({
        include: '*',
        onAttach: function onAttach(worker) {
            if (worker.tab.title.indexOf('Freebox OS') == 0) {
                // That's the one!
                // Define functions
                var injecterJs =
                    'var hasMeta = ' + MaterialFreeboxOS.hasMeta.toString() + ';' +
                    'var addMeta = ' + MaterialFreeboxOS.addMeta.toString() + ';' +
                    'var injectScript = ' + MaterialFreeboxOS.injectScript.toString() + ';' +
                    'var injectStylesheet = ' + MaterialFreeboxOS.injectStylesheet.toString() + ';';

                // Check if Material-Freebox-OS meta tag is here
                // (it would mean that another instance has already been injected)
                injecterJs += "\
                var meta_name = '" + MaterialFreeboxOS.name + "';\
                if (hasMeta(meta_name))\
                    throw new Error('Material-Freebox-OS already injected, aborting.');\
                \
                addMeta(meta_name, true);";

                // Inject dependencies
                var deps = MaterialFreeboxOS.getDependencies('Firefox');

                var getResourceUri = function(src) {
                    return src.substring(0, 'http'.length) == 'http'
                        ? src
                        : self.data.url(src);
                };

                deps.css.forEach(function(uri) {
                    injecterJs += "injectStylesheet('" + getResourceUri(uri) + "');";
                });

                deps.js.forEach(function(uri) {
                    injecterJs += "injectScript('" + getResourceUri(uri) + "');";
                });

                worker.tab.attach({
                    contentScript: injecterJs
                });
            }
        }
    });
})();
