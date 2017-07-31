mongoose = require('mongoose');

var documentSchema = {
  platformId: String,   // Id for doc on original platform
  text: String,       
  title: String,
  platform: String,
  publishedAt: Date,    // When doc was published on original platform
  createdAt: {type:Date, default: Date.now}, // When doc was added to this app
  author: mongoose.Schema.Types.ObjectId, // Reference to author by platform Id
  hearts: Number,       // favourites, likes
  shares: Number,       // shares, retweets
  score: Number,        // karma
  replies: [mongoose.Schema.Types.ObjectId],  // replies, by platform Id
  inReplyTo: mongoose.Schema.Types.ObjectId,  // parent's platform Id (if reply)
}

module.exports = documentSchema;

