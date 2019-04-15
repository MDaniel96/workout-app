var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Comment = db.model('Comment', {
  name: String,
  content: String,
  _plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  }
});

module.exports = Comment;