// TODO check if page matches Freebox OS
if (true) {
	// Inject script & stylesheet
	injectScript(chrome.extension.getURL('js/script.js'));
	injectStyle(chrome.extension.getURL('css/style.css'));

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
		console.info('Material-Freebox-OS', msg);
	}
}
