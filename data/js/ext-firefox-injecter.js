/**
 * Material-Freebox-OS
 * Firefox-specific injecter
 */
(function() {
    var self = require("sdk/self");
    var pageMod = require("sdk/page-mod");

    pageMod.PageMod({
        include: '*',
        onAttach: function onAttach(worker) {
            if (worker.tab.title.indexOf('Freebox OS') == 0) {
                // That's the one!

                // Inject dependencies
                var deps = {
                    js: [
                        'js/script.js'
                    ],
                    css: [
                        'css/style.css',
                        //'https://cdn.materialdesignicons.com/1.5.54/css/materialdesignicons.min.css', <- Invalid certificate, let's use this one instead:
                        'https://www.s-quent.in/bundles/app/3d/css/materialdesignicons.min.css',
                        'https://fonts.googleapis.com/css?family=Roboto:400,300'
                    ]
                };

                // We cannot inject stylesheets from here, but we can provide
                // some Javascript that will do the work.
                // TODO inject ext-base.js and wait for it?
                var cssInjecterJs = "\
                \
                var hasCSS = function(src) {\
                    var links = document.getElementsByTagName('link');\
                    for (var i=0; i<links.length; i++) {\
                        if (links[i].href == src)\
                            return true;\
                    }\
                    return false;\
                };\
                var injectStylesheet = function(src) {\
                    if (hasCSS(src))\
                        return;\
                    \
                    console.log('Injecting ' + src);\
                    var s = document.createElement('link');\
                    s.rel = 'stylesheet';\
                    s.href = src;\
                    s.media = 'all';\
                    s.type = 'text/css';\
                    document.head.appendChild(s);\
                };";

                for (var i=0; i<deps.css.length; i++) {
                    var url = deps.css[i];

                    url = url.substring(0, 'http'.length) == 'http'
                        ? url
                        : self.data.url(url);

                    cssInjecterJs += "injectStylesheet('" + url + "');";
                }

                // Build JS files list
                var contentScriptFiles = [];
                for (var y=0; y<deps.js.length; y++)
                    contentScriptFiles.push(self.data.url(deps.js[y]));

                worker.tab.attach({
                    contentScript: cssInjecterJs,
                    contentScriptFile: contentScriptFiles
                });
            }
        }
    });
})();
