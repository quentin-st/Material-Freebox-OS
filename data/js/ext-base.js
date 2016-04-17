/**
 * Material-Freebox-OS
 * Base extension prototype
 * Used in ext-chrome-injecter & script
 */
(function(window) {
    var MaterialFreeboxOS = function(options) {
        this.options = options;
    };

    MaterialFreeboxOS.prototype = {
        defaults: {},

        injectScript: function(src) {
            this.log('Injecting script ' + src);

            var s = document.createElement('script');
            s.src = src;
            (document.head || document.documentElement).appendChild(s);
        },

        injectStylesheet: function(src) {
            this.log('Injecting stylesheet ' + src);

            var s = document.createElement('link');
            s.rel = 'stylesheet';
            s.href = src;
            s.media = 'all';
            s.type = 'text/css';
            document.head.appendChild(s);
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
        }
    };

    window.MaterialFreeboxOS = new MaterialFreeboxOS();
})(window);
