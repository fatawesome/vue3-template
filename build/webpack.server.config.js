'use strict';

/* */

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { NodeModuleFederation } = require('@telenko/node-mf');
const MiniCssExtractPlugin = require('fatawesome-css-extract-plugin');

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
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
      ]
    },
    externals: nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      allowlist: /\.(css|vue)$/
    }),
    plugins: [
      new WebpackManifestPlugin({ fileName: 'ssr-manifest.json', publicPath: '' }),
      new NodeModuleFederation(mfConf),
      new webpack.DefinePlugin({ 'process.env.IS_SERVER': true }),
      new MiniCssExtractPlugin({
        filename: env.prod ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
        chunkFilename: env.prod
          ? 'css/[name].[contenthash:8].chunk.css'
          : 'css/[name].chunk.css',
      })
    ],
    optimization: {
      splitChunks: false,
      minimize: false
    },
  });
