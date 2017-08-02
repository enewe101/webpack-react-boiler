"use strict";
const mongoose = require('mongoose');

const auth_string = process.env.APP_DB_USER + ':' + process.env.APP_DB_PASS;
const mongo_connect_url = 'mongodb://' + auth_string + '@mongodb:27017/react';
console.log(mongo_connect_url);
mongoose.connect(mongo_connect_url);

module.exports = mongoose;
