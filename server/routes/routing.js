"use strict";
const oauth = require('oauth');
const request = require('request');
const authRouter = require('./auth/routing.js');
const express = require('express');


function prepare_router() {
  const router = express.Router();
  router.use('/auth', authRouter);
  router.use('/api', require('./api/routing.js'));
	router.get('/app/*', serve_client_app);
  module.exports = router;
}


function serve_client_app(req, res){

  if(req.session && req.session.user) {
    // User is already signed in, no need to verify their credentials
    res.send('Hi ' + req.session.user.name);

  } else if (req.session && req.session.oauthAccessToken) {
    twitterConsumer.get(
      "https://api.twitter.com/1.1/account/verify_credentials.json",
      req.session.oauthAccessToken,
      req.session.oauthAccessTokenSecret,

      function (error, data, response) {
        if (error) {
          //console.log(error)
          res.redirect('/sessions/connect');
        } else {
          var parsedData = JSON.parse(data);
          req.session.user = {'name':parsedData.screen_name};
          res.send(
            'You are signed in: '+parsedData.screen_name);
            console.log('access token: ' + req.session.oauthAccessToken)
            console.log('access token secret: ' 
            + req.session.oauthAccessTokenSecret
		  )
        }
      }

    );

  } else {
    let GLOBALS = {
      'FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID
    };
    res.render('index', {'globals': JSON.stringify(GLOBALS)});
  }
}

prepare_router();
