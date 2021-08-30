'use strict';

/* */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = require('./webpack.base.config');
const { federationConfig } = require('./federation.config');

const mfConf = federationConfig({ isServer: false });

const devConfig = {
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["!ssr-manifest.json", "!assets", "!assets/*", "!index.html", "!js", "!js/*", "*.js"],
      cleanOnceBeforeBuildPatterns: ["**/*", "*", "!ssr-manifest.json", "!index.html", "!js", "!js/*"],
    })
  ],
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve(__dirname, "../dist/client"),
    publicPath: "http://localhost:9999/",
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 9999,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: 'http://localhost:9999/',
    hotUpdateChunkFilename: 'hot/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: 'hot/[runtime].[fullhash].hot-update.json'
  }
};

const config = (env = {}) => ({
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: env.prod ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: env.prod
        ? 'css/[name].[contenthash:8].chunk.css'
        : 'css/[name].chunk.css',
    }),
    new ModuleFederationPlugin(mfConf),
    new webpack.DefinePlugin({ 'process.env.IS_SERVER': false })
  ]
});

module.exports = (env) => {
  return merge(
    base(env),
    config(env),
    process.env.NODE_ENV === 'development' ? devConfig : {}
  );
};
