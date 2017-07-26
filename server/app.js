"use strict";
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port = (process.env.PORT || 8080);
const mongoose = require('mongoose');
const User = require('./models/User.js');

var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var inspect = require('util-inspect');
var oauth = require('oauth');


// Basic setup for the server
const ip = '159.203.30.146';
const _twitterConsumerKey = "ADGLPx9iJUL6oNl7RyozTgaZG";
const _twitterConsumerSecret = "ZwcXeDJwNDWsLWKvw6wxQFVeFRxkVMzcZ7rV6QzugPnSWTSbdQ";

const consumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  _twitterConsumerKey,
  _twitterConsumerSecret,
  "1.0A",
  "http://"+ip+"/sessions/callback",
  "HMAC-SHA1"
);
   
const app = express();
const indexPath = path.join(__dirname, '../client-build/index.html');
const publicPath = express.static(path.join(__dirname, '../client-build'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(logger({ path: "log/express.log"}));
app.use(cookieParser());
app.use(session({ secret: "very secret", resave: false, saveUninitialized: true}));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

//app.use('/', publicPath);
//app.get('/', function (req, res) { res.sendFile(indexPath) });
//app.get('/data', (req, res) => {
//  res.send("take what you GET");
//});
//app.post('/data', function(req, res){
//  res.send(`get what you POSTed: '${req.body.name}'`)});


app.get('/sessions/connect', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + inspect(error), 500);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      console.log("Double check on 2nd step");
      console.log("------------------------");
      console.log("<<"+req.session.oauthRequestToken);
      console.log("<<"+req.session.oauthRequestTokenSecret);
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
    }
  });
});

app.get('/sessions/callback', function(req, res){
  console.log("------------------------");
  console.log(">>"+req.session.oauthRequestToken);
  console.log(">>"+req.session.oauthRequestTokenSecret);
  console.log(">>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
        res.status(500).send(
            "Error getting OAuth access token : " + inspect(error) 
            + "[" + oauthAccessToken + "]" 
            + "[" + oauthAccessTokenSecret + "]"
        );
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      console.log("oauthAccessToken: " + oauthAccessToken)
      console.log("oauthAccessTokenSecret: " + oauthAccessTokenSecret)
      res.redirect('/home');
    }
  });
});

app.get('/home', function(req, res){
    consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
        //console.log(error)
        res.redirect('/sessions/connect');
      } else {
        var parsedData = JSON.parse(data);
        res.send('You are signed in: ' + inspect(parsedData.screen_name));
	console.log('access token: ' + req.session.oauthAccessToken)
	console.log('access token secret: ' + req.session.oauthAccessTokenSecret)
      }
    });
});

app.get('*', function(req, res){
    res.redirect('/home');
});

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
