"use strict";
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = (process.env.PORT || 8080);
const mongoose = require('mongoose');
const User = require('./models/User.js');

// Basic setup for the server
const app = express();
const indexPath = path.join(__dirname, '../client-build/index.html');
const publicPath = express.static(path.join(__dirname, '../client-build'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/', publicPath);
app.get('/', function (req, res) { res.sendFile(indexPath) });
app.get('/data', (req, res) => {
  res.send("take what you GET");
});
app.post('/data', function(req, res){
  res.send(`get what you POSTed: '${req.body.name}'`)});

const auth_string = process.env.APP_DB_USER + ':' + process.env.APP_DB_PASS;
const mongo_connect_url = 'mongodb://' + auth_string + '@mongodb:27017/react';
console.log(mongo_connect_url);
mongoose.connect(mongo_connect_url);

// Additional setup for dev server
const webpack = require('webpack')
const config = require('../webpack.config.js')
const compiler = webpack(config)

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
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

app.listen(port)
console.log(`point browser to http://localhost:${port}`)
