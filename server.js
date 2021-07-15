// import path from "path";
// import express from "express";
// import fs from "fs";
// import { renderToString } from '@vue/server-renderer';
//// @ts-ignore
// import manifest from './dist/server/ssr-manifest.json';

const path = require('path');
const fs = require('fs');
const express = require('express');
const { renderToString } = require('@vue/server-renderer');
const manifest = require('./dist/server/ssr-manifest.json');

const server = express();

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js']);
const createApp = require(appPath).default;

server.use('/img', express.static(path.join(__dirname, './dist/client', 'img')));
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')));
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')));
server.use('/hot', express.static(path.join(__dirname, './dist/client', 'hot')));
server.use("/", express.static(path.join(process.cwd(), "/")));

// server.use(
//   '/favicon.ico',
//   express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
// );

server.get('*', async (req, res) => {
  const { app, router } = await createApp(req.path);

  await router.push(req.url);
  await router.isReady();

  const appContent = await renderToString(app);

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err;
    }

    const content = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`);
    res.setHeader('Content-Type', 'text/html');

    res.send(content);
  });
});

console.log('You can navigate to http://localhost:4100');

server.listen(4100);
