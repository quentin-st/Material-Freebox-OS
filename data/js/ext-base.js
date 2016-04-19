/**
 * Material-Freebox-OS
 * Base extension prototype
 */

/**
 * That's for Firefox
 */
var EXPORTED_SYMBOLS = ['MaterialFreeboxOS'];

var MaterialFreeboxOS = function(options) {
    this.options = options;
};

MaterialFreeboxOS.prototype = {
    name: 'Material-Freebox-OS',
    defaults: {},

    injectScript: function(src) {
        var s = document.createElement('script');
        s.src = src;
        (document.head || document.documentElement).appendChild(s);
    },

    hasScript: function(src) {
        var scripts = document.getElementsByTagName('script');
        for (var i=0; i<scripts.length; i++) {
            if (scripts[i].src == src)
                return true;
        }
        return false;
    },

    injectStylesheet: function(src) {
        var s = document.createElement('link');
        s.rel = 'stylesheet';
        s.href = src;
        s.media = 'all';
        s.type = 'text/css';
        document.head.appendChild(s);
    },

    hasStylesheet: function(src) {
        var links = document.getElementsByTagName('link');
        for (var i=0; i<links.length; i++) {
            if (links[i].href == src)
                return true;
        }
        return false;
    },

    hasMeta: function(key) {
        var metas = document.getElementsByTagName('meta');
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].name == key)
                return true;
        }

        return false;
    },

    addMeta: function(key, val) {
        var m = document.createElement('meta');
        m.name = key;
        m.content = val;
        document.head.appendChild(m);
        return m;
    },

    log: function(msg) {
        console.info('Material-Freebox-OS:', msg);
    },

    getDependencies: function(flavour) {
        var deps = {
            js: [
                'data/js/script.js'
            ],
            css: [
                'data/css/style.css',
                //'https://cdn.materialdesignicons.com/1.5.54/css/materialdesignicons.min.css', <- Invalid certificate, let's use this one instead:
                'https://www.s-quent.in/bundles/app/3d/css/materialdesignicons.min.css',
                'https://fonts.googleapis.com/css?family=Roboto:400,300'
            ]
        };

        switch (flavour) {
            case 'Chrome':
                return deps;
            case 'Firefox':
                // Remove the data/ prefix from URIs
                Object.keys(deps).forEach(function(key, index) {
                    deps[key].forEach(function(uri, index) {
                        if (uri.substring(0, 'data/'.length) == 'data/')
                            deps[key][index] = uri.substring('data/'.length);
                    });
                });
                return deps;
        }
    }
};

if (typeof window !== 'undefined')
    window.MaterialFreeboxOS = new MaterialFreeboxOS();
else
    MaterialFreeboxOS = new MaterialFreeboxOS();
