var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Plan = db.model('Plan', {
  title: String,
  description: String,
  difficulty: Number,
  length: {
    type: Number,
    default: 0
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Plan;