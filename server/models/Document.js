// grab the things we need
const mongoose = require('../mongoose_connection.js');

// create a schema
var documentSchema = new mongoose.Schema({
  name: String
});

// the schema is useless so far
// we need to create a model using it
const Document = mongoose.model('document', documentSchema);

// make this available to our users in our Node applications
module.exports = Document;

