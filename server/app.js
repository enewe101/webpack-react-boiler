const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const port = (process.env.PORT || 8080)

// Basic setup for the server
const app = express();
const indexPath = path.join(__dirname, '../client-build/index.html');
const publicPath = express.static(path.join(__dirname, '../client-build'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/', publicPath);
app.get('/', function (req, res) { res.sendFile(indexPath) });
app.get('/data', function(req, res){res.send("take what you GET")});
app.post('/data', function(req, res){
  res.send(`get what you POSTed: '${req.body.name}'`)});

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
console.log(`Listening carefully at http://localhost:${port}`)
