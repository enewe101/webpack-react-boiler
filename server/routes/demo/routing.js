"use strict";
const express = require('express');
const request = require('request');

function prepare_router() {
  const router = express.Router();
  router.get('/', sendDemoApp);
  module.exports = router;
}

function sendDemoApp(req, res) {
  console.log('yoyo');
  let GLOBALS = {
    'FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID
  };
  res.render('index', {'globals': JSON.stringify(GLOBALS)});
}


prepare_router();

