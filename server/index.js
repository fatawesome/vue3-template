const path = require('path');
const fs = require('fs');
const express = require('express');
const { renderToString } = require('@vue/server-renderer');
const manifest = require('../dist/server/ssr-manifest.json');
const { injectCSS } = require('./resources/css');

const server = express();

const appPath = path.join(__dirname, '../dist', 'server', manifest['app.js']);
const createApp = require(appPath).default;

server.use('/img', express.static(path.join(__dirname, '../dist/client', 'img')));
server.use('/js', express.static(path.join(__dirname, '../dist/client', 'js')));
server.use('/css', express.static(path.join(__dirname, '../dist/client', 'css')));
server.use('/hot', express.static(path.join(__dirname, '../dist/client', 'hot')));
server.use("/", express.static(path.join(process.cwd(), "/")));

server.get('*', async (req, res) => {
  fs.readFile(path.join(__dirname, '../dist/client/index.html'), async (err, html) => {
    if (err) {
      throw err;
    }

    // This global variable is used by mini-css-extract-plugin fork to inject styles on server-side.
    // In such a way we can evade FOUC problem.
    // TODO: implement elegant solution.
    process.env.HTML = process.env.HTML || html;

    const { app, router } = await createApp(req.path);

    await router.push(req.url);
    await router.isReady();

    const appContent = await renderToString(app);

    let content = process.env.HTML
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`);
    res.setHeader('Content-Type', 'text/html');
    injectCSS(content, manifest).then(html => {
      res.send(html);
    });
  });
});

console.log('You can navigate to http://localhost:4100');

server.listen(4100);
