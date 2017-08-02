const express = require('express');

function prepare_router() {
  const router = express.Router();
  router.use('/documents', require('./documents'));
  module.exports = router;
}

prepare_router()
