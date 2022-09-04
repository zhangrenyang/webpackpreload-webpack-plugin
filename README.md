webpackpreload-webpack-plugin
============
[![NPM version][npm-img]][npm-url]

A Webpack plugin for automatically wiring up asynchronous (and other types) of JavaScript
chunks using `<link rel='preload'>`.

Note: This is an extension plugin for [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) - a plugin that
simplifies the creation of HTML files to serve your webpack bundles.

Introduction
------------

[Preload](https://w3c.github.io/preload/) is a web standard aimed at improving performance
and granular loading of resources. It is a declarative fetch that can tell a browser to start fetching a
source because a developer knows the resource will be needed soon. [Preload: What is it good for?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)
is a recommended read if you haven't used the feature before.

In simple web apps, it's straight-forward to specify static paths to scripts you
would like to preload - especially if their names or locations are unlikely to change. In more complex apps,
JavaScript can be split into "chunks" (that represent routes or components) at with dynamic
names. These names can include hashes, numbers and other properties that can change with each build.

For example, `chunk.31132ae6680e598f8879.js`.

To make it easier to wire up async chunks for lazy-loading, this plugin offers a drop-in way to wire them up
using `<link rel='preload'>`.

Pre-requisites
--------------
This module requires Webpack 5.5.0 and above. It also requires that you're using
[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) in your Webpack project.

Installation
---------------

First, install the package as a dependency in your package.json:

```sh
$ npm install --save-dev webpackpreload-webpack-plugin
```

Alternatively, using yarn:

```sh
yarn add -D webpackpreload-webpack-plugin
```

Usage
-----------------

Next, in your Webpack config, `require()` the preload plugin as follows:

```js
const WebpackPreloadWebpackPlugin = require('webpackpreload-webpack-plugin');
```

and finally, configure the plugin in your Webpack `plugins` array after `HtmlWebpackPlugin`:

```js
plugins: [
  new HtmlWebpackPlugin(),
  new WebpackPreloadWebpackPlugin()
]
```

[npm-url]: https://www.npmjs.com/package/webpackpreload-webpack-plugin
[npm-img]: https://badge.fury.io/js/webpackpreload-webpack-plugin.svg
