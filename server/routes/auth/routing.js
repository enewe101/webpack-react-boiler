const express = require('express');
const twitterRouter = require('./twitter.js');
const facebookRouter = require('./facebook.js');
const instagramRouter = require('./instagram.js');

// Build and export the router.  This is called at the bottom of the file,
// after any handlers are defined.
function prepare_router() {
  const router = express.Router();
  router.use('/twitter', twitterRouter);
  router.use('/facebook', facebookRouter);
  router.use('/instagram', instagramRouter);
  module.exports = router;
}

prepare_router();
