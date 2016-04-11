/**
 * Material-Freebox-OS
 */
(function() {
	/**
	 * This function is called once the desktop is fully loaded
	 */
	var desktopLoaded = function () {
		// DESKTOP
		// Write Freebox OS version next to the huge title
		$('<div />')
			.addClass('fbxos-version-text')
			.text('v' + FbxConf.firmwareVersionMajor + '.' + FbxConf.firmwareVersionMinor)
			.appendTo($('.fbxos-version'));


		// TODO detect full-size windows, add .solid-background to .freeboxos-southbar if necessary
	};

	// Wait for desktop to be loaded
	var i = setInterval(function() {
		if (!!$('.fbxos-version').length) {
			log('Desktop seems loaded');
			desktopLoaded();
			clearInterval(i);
		}
	}, 200);

	function log(msg) {
		console.info('Material-Freebox-OS(script.js):', msg);
	}
})();
