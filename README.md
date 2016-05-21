# <img src="/data/img/icon-48x48.png" align="left" /> Material Freebox OS

This project's aim is to redesign Freebox OS's UI by injecting custom stylesheets into its web interface via a Google Chrome
or Firefox extension.

As you can see, the redesign is hugely inspired from [Google's Material design guidelines](http://www.google.com/design/spec/material-design/introduction.html)
and Chrome OS specs.

[![Download on Chrome Web Store](doc/download-chrome-web-store.png)](https://chrome.google.com/webstore/detail/material-freebox-os/lhdfonhgkclaigpfmclbahllambeednh)
[![Download for Firefox](doc/download-firefox.png)](https://addons.mozilla.org/fr/firefox/addon/material-freeboxos/)
[![Download for Opera](doc/download-opera.png)](doc/opera/opera-en.md)

![Material-Freebox-OS](doc/screenshot2.png)

See [below](#screenshots) for more screenshots.

## How does it work?
Quite straight-forward actually: [`injector.js`](data/js/injector.js) file is injected by either Chrome or Firefox inside the tab.
 His aim is to inject the necessary resources - `style.css`, `content-script.js`, MaterialDesignIcons stylesheet and Roboto font.

We use SCSS (compiled CSS) to override Freebox OS's styles alongside with some Javascript when necessary.

That's it!

This project relies on the following resources:

* [Material Design Icons](https://materialdesignicons.com)
* [Roboto font](https://www.google.com/fonts/specimen/Roboto)
* Wallpaper credits: see [`material-freebox-os.js/MaterialFreeboxOS.wallpaper.wallpapers`](https://github.com/chteuchteu/Material-Freebox-OS/blob/master/data/js/material-freebox-os.js#L71)


### How about security?
That's a legitimate question: you can browse Javascript files ([`injector.js`](data/js/injector.js) and [`content-script.js`](data/js/content-script.js))
 in this repo or directly from Chrome's debugger tools - to see that their sole purpose is to manipulate the DOM to apply
 some styling that couldn't be set in CSS.

## How to contribute
Do not hesitate to open issues or to create pull requests against the master branch!
The main project is based on SCSS to build CSS files: you'll need an appropriate compiler alongside with some Chrome extensions notions.

> Note: we're using the EditorConfig standard to supply coding rules for this project, learn more about it [here](http://editorconfig.org/).

> Warning: this is not meant to be perfect. Freebox OS's UI is quite difficult to style, and some changes aren't possible for now.
I'd rather keep this project maintainable and compatible with upcoming releases of Freebox OS than doing some Javascript black
magic to set these minimize/maximize/close buttons padding.

## Screenshots
![Material-Freebox-OS](doc/screenshot1.png)
![Material-Freebox-OS](doc/screenshot3.png)

Check Material Freebox OS's page on the [Chrome Web Store](https://chrome.google.com/webstore/detail/material-freebox-os/lhdfonhgkclaigpfmclbahllambeednh)
 or [Firefox addons repository](https://addons.mozilla.org/fr/firefox/addon/material-freeboxos/) for some more.

## Licensing
Material-Freebox-OS is distributed under the GNU GPL version 2.
