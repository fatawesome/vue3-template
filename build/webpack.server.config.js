'use strict';

/* */

const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');

module.exports = (env = {}) =>
  merge(base(env), {
    target: 'node',
    entry: {
      app: [
        './src/server-entry.ts'
      ]
    },
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, '../dist/server'),
      publicPath: '/'
    },
    externals: nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      allowlist: /\.(css|vue)$/
    }),
    plugins: [
      new WebpackManifestPlugin({ fileName: 'ssr-manifest.json', publicPath: '' }),
    ],
    optimization: {
      splitChunks: false,
      minimize: false
    },
  });
