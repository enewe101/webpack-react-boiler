"use strict";
const express = require('express');
const request = require('request');


function prepare_router() {
  const router = express.Router();
  router.post('/request-long-token', relayLongFBTokenRequest);
  router.post('/revoke', FBHandleRevoke);
  module.exports = router;
}


function relayLongFBTokenRequest(req, res) {
  console.log('req.body');
  console.log(req.body);

  request.get({
      'url':'https://graph.facebook.com/oauth/access_token',
      'qs': {
        'grant_type': 'fb_exchange_token',
        'client_id': process.env.FACEBOOK_APP_ID,
        'client_secret': process.env.FACEBOOK_APP_SECRET,
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


function FBHandleRevoke(req, res) {
  console.log('req.body');
  console.log(req.body);

  let url = (
    'https://graph.facebook.com/'+req.body.userId+'/permissions?'
    + 'client_id=' + process.env.FACEBOOK_APP_ID
    + '&client_secret=' + process.env.FACEBOOK_APP_SECRET
    + '&access_token=' + req.body.access_token
  )

  request['del']({
      'url': url, 
      //'qs': {
      //  'client_id': process.env.FACEBOOK_APP_ID,
      //  'client_secret': process.env.FACEBOOK_APP_SECRET,
      //}
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
