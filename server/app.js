const path = require('path')
const express = require('express')

const port = (process.env.PORT || 8080)

// Basic setup for the server
const app = express();
const indexPath = path.join(__dirname, '../client-build/index.html');
const publicPath = express.static(path.join(__dirname, '../client-build'));
app.use('/', publicPath);
app.get('/', function (_, res) { res.sendFile(indexPath) });

// Additional setup for dev server
const webpack = require('webpack')
const config = require('../webpack.config.js')
const compiler = webpack(config)

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/assets/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

//if (process.env.NODE_ENV !== 'production') {
//  const webpack = require('webpack')
//  const webpackDevMiddleware = require('webpack-dev-middleware')
//  const webpackHotMiddleware = require('webpack-hot-middleware')
//  const config = require('../webpack.config.js')
//  const compiler = webpack(config)
//
//  app.use(webpackHotMiddleware(compiler))
//  app.use(webpackDevMiddleware(compiler, {
//    noInfo: true,
//    publicPath: config.output.publicPathdist
//  }))
//}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
