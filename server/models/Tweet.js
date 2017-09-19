// grab the things we need
const mongoose = require('../mongoose_connection.js');

// create a schema
var tweetSchema = new mongoose.Schema({
  text: String,
  target: String,
  stance: String,
});

// Create a model from the schema
const Tweet = mongoose.model('tweet', tweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;


