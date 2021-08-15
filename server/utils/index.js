const IS_CSS_RE = /\.css(\?[^.]+)?$/;
const IS_JS_RE = /\.[cm]?js(\?[^.]+)?$/;
const ASSETS_PATH = process.cwd() + '/dist/server';

function serverBundlePath(file) {
  return ASSETS_PATH + '/' + file;
}

function isCSS(file) {
  return IS_CSS_RE.test(file);
}

function isJS(file) {
  return IS_JS_RE.test(file);
}

module.exports = {
  isJS, isCSS, serverBundlePath
};
