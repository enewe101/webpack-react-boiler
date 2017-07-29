"use strict";
const express = require('express');
const request = require('request');
const INSTAGRAM_REDIRECT_URI = (
  "https://"+process.env.HOST+"/auth/instagram/return"
)

function prepare_router() {
  const router = express.Router();
  router.get('/return', handleInstagramAuthReturn);
  router.get('/auth', handleInstagramAuth);
  module.exports = router;
}

const handleInstagramAuth = function(req, res) {
  res.redirect(
    'https://api.instagram.com/oauth/authorize/?'
    +'client_id=' + process.env.INSTAGRAM_CLIENT_ID
    +'&redirect_uri=' + INSTAGRAM_REDIRECT_URI
    +'&response_type=code'
  )
}


const handleInstagramAuthReturn =  function(req, res){

  console.log(req.query);
  request.post({
      'url':'https://api.instagram.com/oauth/access_token',
      'form': {
				'client_id': process.env.INSTAGRAM_CLIENT_ID,
				'client_secret': process.env.INSTAGRAM_CLIENT_SECRET,
				'grant_type': 'authorization_code',
				'redirect_uri':INSTAGRAM_REDIRECT_URI,
				'code': req.query.code
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


prepare_router();
