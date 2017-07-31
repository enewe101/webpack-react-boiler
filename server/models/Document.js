// grab the things we need
const mongoose = require('../mongoose_connection.js');

// create a schema
var documentSchema = new mongoose.Schema({
  platformId: String,   // Id for doc on original platform
  text: String,       
  title: String,
  platform: String,
  publishedAt: Date,    // When doc was published on original platform
  createdAt: {type:Date, default: Date.now}, // When doc was added to this app
  author: String, // Reference to author by platform Id
  hearts: Number,       // favourites, likes
  shares: Number,       // shares, retweets
  score: Number,        // karma
  replies: [String],  // replies, by platform Id
  inReplyTo: String,  // parent's platform Id (if reply)
});

// Create a model from the schema
const Document = mongoose.model('document', documentSchema);

// make this available to our users in our Node applications
module.exports = Document;

