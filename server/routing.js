"use strict";
const oauth = require('oauth');
const request = require('request');

// We'll need a few helpers and resources in the route handlers
var consumer = setup_twitter_oauth();

function provide_routing(app) {
	app.get('/auth/twitter-request', twitter_request_handler);
	app.get('/auth/twitter-return', twitter_return_handler);
	app.get('/app/*', serve_client_app);
  app.post('/auth/FB-request-long-token', relayLongFBTokenRequest);
}

function relayLongFBTokenRequest(req, res) {
  console.log('req.body');
  console.log(req.body);

  request.get({
      'url':'https://graph.facebook.com/oauth/access_token',
      'qs': {
        'grant_type': 'fb_exchange_token',
        'client_id': '157675138124785', //process.env.FACEBOOK_APP_ID,
        'client_secret': '96c3134461d04aeaf45344069875ce5f', //process.env.FACEBOOK_APP_SECRET,
        'fb_exchange_token': req.body.token
      }
    },
    function(error, response, body) {
      if(error) {
        console.log(error);
        console.log(error);
      } else { 
        console.log(body);
        res.json(body);
      }
    }
  ); 
}

function setup_twitter_oauth() {
  // Basic setup for the server
  return new oauth.OAuth(
    "https://twitter.com/oauth/request_token",
    "https://twitter.com/oauth/access_token",
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    "1.0A",
    "http://"+process.env.HOST+"/auth/twitter-return",
    "HMAC-SHA1"
  );
}

const twitter_request_handler = function(req, res) {
  consumer.getOAuthRequestToken(
    function(error, oauthToken, oauthTokenSecret, results){
	  if (error) {
	    res.send("Error getting OAuth request token : " + inspect(error), 500);
	  } else {
	    req.session.oauthRequestToken = oauthToken;
	    req.session.oauthRequestTokenSecret = oauthTokenSecret;
	    console.log("Double check on 2nd step");
	    console.log("------------------------");
	    console.log("<<"+req.session.oauthRequestToken);
	    console.log("<<"+req.session.oauthRequestTokenSecret);
	    res.redirect(
			"https://twitter.com/oauth/authorize?oauth_token="
			+ req.session.oauthRequestToken
		);
	  }
    }
  );
}

const twitter_return_handler =  function(req, res){
  console.log("------------------------");
  console.log(">>"+req.session.oauthRequestToken);
  console.log(">>"+req.session.oauthRequestTokenSecret);
  console.log(">>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(
    req.session.oauthRequestToken, req.session.oauthRequestTokenSecret,
   	req.query.oauth_verifier, 
	function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
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
        res.redirect('/');
      }
    }
  );
}

const serve_client_app = function(req, res){

  if(req.session && req.session.user) {
    // User is already signed in, no need to verify their credentials
    res.send('Hi ' + req.session.user.name);

  } else if (req.session && req.session.oauthAccessToken) {
    consumer.get(
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
            'You are signed in: '+inspect(parsedData.screen_name));
            console.log('access token: ' + req.session.oauthAccessToken)
            console.log('access token secret: ' 
            + req.session.oauthAccessTokenSecret
		  )
        }
      }

    );

  } else {
    let GLOBALS = {"one":"two", "yo":3};
    res.render('index', {'globals': JSON.stringify(GLOBALS)});
  }
}

module.exports = provide_routing;
