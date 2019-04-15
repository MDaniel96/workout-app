var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Mark = db.model('Mark', {
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    }
});

module.exports = Mark;