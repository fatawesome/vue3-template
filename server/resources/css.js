const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { serverBundlePath, isCSS } = require('../utils');

function getCSSContent(path) {
  return fsp.readFile(path).then(res => res.toString());
}

async function concatCSS(filePaths) {
  return await filePaths.reduce(async (acc, path) => {
    const css = await getCSSContent(path);
    return (await acc) + css;
  }, '');
}

function injectCSS(html, manifest) {
  const cssPaths = Object.keys(manifest)
    .filter(filename => isCSS(filename))
    .map(filename => serverBundlePath(manifest[filename]));

  return concatCSS(cssPaths).then(raw => {
    const css = `<style>${raw}</style>`;
    return html.toString().replace('<link rel="stylesheet" href="ya govno poel">', css);
  });
}

module.exports = { injectCSS };
