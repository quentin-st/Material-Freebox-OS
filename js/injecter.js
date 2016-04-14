/**
 * Material-Freebox-OS
 * Content-script
 */
(function() {
	if (document.title.indexOf('Freebox OS') == 0) {
		var meta_name = 'Material-Freebox-OS';

		// Check if Material-Freebox-OS meta tag is here
		// (it means that another instance has already been injected)
		var metas = document.getElementsByTagName('meta');
		for (var i = 0; i < metas.length; i++) {
			if (metas[i].name == meta_name)
				throw new Error('Material-Freebox-OS already injected, aborting.');
		}

		// Append Material-Freebox-OS meta tag to head
		var m = document.createElement('meta');
		m.name = meta_name;
		m.content = 'true';
		document.head.appendChild(m);

		// Inject script
		injectScript(chrome.extension.getURL('js/script.js'));

		// Inject stylesheets
		injectStyle(chrome.extension.getURL('css/style.css'));
		injectStyle(chrome.extension.getURL('3d/css/materialdesignicons.min.css'));
		injectStyle('https://fonts.googleapis.com/css?family=Roboto:400,300');

		function injectScript(src) {
			log('Injecting script ' + src);
			var s = document.createElement('script');
			s.src = src;
			(document.head || document.documentElement).appendChild(s);
		}

		function injectStyle(src) {
			log('Injecting stylesheet ' + src);

			var s = document.createElement('link');
			s.rel = 'stylesheet';
			s.href = src;
			s.media = 'all';
			s.type = 'text/css';
			document.head.appendChild(s);
		}

		function log(msg) {
			console.info('Material-Freebox-OS:', msg);
		}
	}
})();
