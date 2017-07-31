const express = require('express');
const oauth = require('oauth');


// Build and export the router.  This is called at the bottom of the file,
// after handlers are defined.
function prepare_router() {
  const router = express.Router();
  router.get('/auth', handleTwitterAuth);
  router.get('/reauth', handleTwitterReauth);
  router.get('/return', handleTwitterAuthReturn);
  router.get('/verify', verifyCredentials);
  module.exports = router;
}

var twitterConsumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  "1.0A",
  "http://"+process.env.HOST+"/auth/twitter/return",
  "HMAC-SHA1"
);

const verifyCredentials = function(req, res) {
  twitterConsumer.get(
    "https://api.twitter.com/1.1/account/verify_credentials.json",
    req.session.oauthAccessToken,
    req.session.oauthAccessTokenSecret,

    function (error, data, response) {
      if (error) {
        console.log(error)
        res.redirect('/sessions/connect');
      } else {
        var parsedData = JSON.parse(data);
        req.session.user = {'name':parsedData.screen_name};
        res.json({
          'screenName': parsedData.screen_name
        });

        //  'You are signed in: '+parsedData.screen_name);
        //  console.log('access token: ' + req.session.oauthAccessToken)
        //  console.log('access token secret: ' 
        //  + req.session.oauthAccessTokenSecret
        //)
      }
    }
  );
}


const handleTwitterAuth = function(req, res) {
  twitterConsumer.getOAuthRequestToken(
    function(error, oauthToken, oauthTokenSecret, results){
      if (error) {
        res.send("Error getting OAuth request token : " + error, 500);
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

const handleTwitterReauth = function(req, res) {
  twitterConsumer.getOAuthRequestToken(
    function(error, oauthToken, oauthTokenSecret, results){
      if (error) {
        res.send("Error getting OAuth request token : " + error, 500);
      } else {
        req.session.oauthRequestToken = oauthToken;
        req.session.oauthRequestTokenSecret = oauthTokenSecret;
        console.log("Double check on 2nd step");
        console.log("------------------------");
        console.log("<<"+req.session.oauthRequestToken);
        console.log("<<"+req.session.oauthRequestTokenSecret);
        res.redirect(
          'https://twitter.com/oauth/authenticate?'
          + 'force_login=true&amp;'
          + 'oauth_token=' + req.session.oauthRequestToken
        );
      }
    }
  );
}

const handleTwitterAuthReturn =  function(req, res){
  console.log("------------------------");
  console.log(">>"+req.session.oauthRequestToken);
  console.log(">>"+req.session.oauthRequestTokenSecret);
  console.log(">>"+req.query.oauth_verifier);
  twitterConsumer.getOAuthAccessToken(
    req.session.oauthRequestToken, req.session.oauthRequestTokenSecret,
   	req.query.oauth_verifier, 
	function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
	  if (error) {
		res.status(500).send(
			"Error getting OAuth access token : " + error
			+ "[" + oauthAccessToken + "]" 
			+ "[" + oauthAccessTokenSecret + "]"
		);
	  } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        console.log("oauthAccessToken: " + oauthAccessToken)
        console.log("oauthAccessTokenSecret: " + oauthAccessTokenSecret)
        res.redirect('/app/logged-in');
      }
    }
  );
}


prepare_router();

