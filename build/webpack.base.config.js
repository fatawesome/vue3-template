'use strict';

/* */

const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: "auto",
    filename: env.prod ? 'js/[name].[chunkhash].js' : 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue: 'vue/dist/vue.runtime.esm-bundler.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            envName: env.prod ? 'prod' : 'dev',
            filename: ''
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { babelrc: true }
          },
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]',
              }
            }
          }
        }
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              esModule: true
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: Boolean(env.prod),
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        // cache: true,
        parallel: true,
        // sourceMap: !env.prod,
        terserOptions: {
          /* creds to vue/cli */
          compress: {
            // turn off flags with small gains to speed up minification
            arrows: false,
            collapse_vars: false, // 0.3kb
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,

            // a few flags with noticeable gains/speed ratio
            // numbers based on out of the box vendor bundle
            booleans: true, // 0.7kb
            if_return: true, // 0.4kb
            sequences: true, // 0.7kb
            unused: true, // 2.3kb

            // required features to drop conditional branches
            conditionals: true,
            dead_code: true,
            evaluate: true,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: env.prod ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: env.prod
        ? 'css/[name].[contenthash:8].chunk.css'
        : 'css/[name].chunk.css',
    })
  ],
});
