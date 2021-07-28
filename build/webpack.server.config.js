'use strict';

/* */

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { NodeModuleFederation } = require('@telenko/node-mf');

const base = require('./webpack.base.config');
const { federationConfig } = require('./federation.config');

const mfConf = federationConfig({ isServer: true });

module.exports = (env = {}) =>
  merge(base(env), {
    target: 'node',
    entry: {
      app: [
        './src/server-entry.ts'
        // './server.js'
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
      new NodeModuleFederation(mfConf),
      new webpack.DefinePlugin({ 'process.env.IS_SERVER': true })
    ],
    optimization: {
      splitChunks: false,
      minimize: false
    },
  });
