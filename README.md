# <img src="/data/img/icon-48x48.png" align="left" /> Material Freebox OS

This project's aim is to redesign Freebox OS's UI by injecting custom stylesheets into its web interface via a Google Chrome
or Firefox extension.

As you can see, the redesign is hugely inspired from [Google's Material design guidelines](http://www.google.com/design/spec/material-design/introduction.html)
and Chrome OS specs.

> Warning: this is not meant to be perfect. Freebox OS's UI is quite difficult to style, and some changes aren't possible for now.
I'd rather keep this project maintainable and compatible with upcoming releases of Freebox OS than doing some Javascript black
magic to set these minimize/maximize/close buttons padding.

[![Download on Chrome Web Store](doc/download-chrome-web-store.png)](https://chrome.google.com/webstore/detail/material-freebox-os/lhdfonhgkclaigpfmclbahllambeednh)
[![Download for Firefox](doc/download-firefox.png)](https://addons.mozilla.org/fr/firefox/addon/material-freeboxos/)

| ![Material-Freebox-OS](doc/screenshot1.png)  | ![Material-Freebox-OS](doc/screenshot2.png) |
|:--------------------------------------------:|:-------------------------------------------:|

This project relies on the following projects:

* [Material Design Icons](https://materialdesignicons.com)
* [Roboto font](https://www.google.com/fonts/specimen/Roboto)
* Wallpaper credits: 1: *Google Maps / DigitalGlobe*, 2: *Google Maps / Aerometrex*

## How does it work?
Quite straight-forward actually: either [`ext-chrome-injecter.js`](data/js/ext-chrome-injecter.js) or
[`ext-firefox-injecter.js`](data/js/ext-firefox-injecter.js) file is injected by Chrome or Firefox inside the tab.
 His aim is to inject the necessary resources - `style.css`, `script.js`, MaterialDesignIcons stylesheet and Roboto font.

That's it!

### How about security?
That's a legitimate question: you can browse Javascript files ([`ext-chrome-injecter.js`](data/js/ext-chrome-injecter.js),
[`ext-firefox-injecter.js`](data/js/ext-firefox-injecter.js) and [`script.js`](data/js/script.js))
 in this repo or directly from Chrome's debugger tools - to see that their sole purpose is to manipulate the DOM to apply
 some styling that couldn't be set in CSS.

## How to contribute
Do not hesitate to open issues or to create pull requests against the master branch!
The main project is based on SCSS to build CSS files: you'll need an appropriate compiler alongside with some Chrome extensions notions.

> Note: we're using the EditorConfig standard to supply coding rules for this project, learn more about it [here](http://editorconfig.org/).

### Sidenotes
I'm really sorry for all these `!important` in the stylesheets. As you may know, Freebox OS use a lot of these so I had no choice.

## Licensing
Material-Freebox-OS is distributed under the GNU GPL version 2.
