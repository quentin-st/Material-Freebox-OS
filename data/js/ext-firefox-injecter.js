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

                // We cannot inject stylesheets from here, but we can provide some Javascript that will do the work.
                // Also, injected javascripts does not seem to be injected as in Chrome. So let's manually inject these
                // TODO inject ext-base.js and wait for it?
                var injecterJs = "\
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
                };\
                var hasJS = function(src) {\
                    var scripts = document.getElementsByTagName('script');\
                    for (var i=0; i<scripts.length; i++) {\
                        if (scripts[i].src == src)\
                            return true;\
                    }\
                    return false;\
                };\
                var injectScript = function(src) {\
                    if (hasJS(src))\
                        return;\
                    \
                    console.log('Injecting ' + src);\
                    var s = document.createElement('script');\
                    s.type = 'text/javascript';\
                    s.src = src;\
                    document.head.appendChild(s);\
                };";

                function getResourceUri(src) {
                    return src.substring(0, 'http'.length) == 'http'
                        ? src
                        : self.data.url(src);
                }

                // CSS
                for (var i=0; i<deps.css.length; i++)
                    injecterJs += "injectStylesheet('" + getResourceUri(deps.css[i]) + "');";

                // JS
                for (var y=0; y<deps.js.length; y++)
                    injecterJs += "injectScript('" + getResourceUri(deps.js[y]) + "');";

                worker.tab.attach({
                    contentScript: injecterJs
                });
            }
        }
    });
})();
