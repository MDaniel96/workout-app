var requireOption = require('../common').requireOption;

/**
 * This MW saves plans 
 */

module.exports = function(objectrepository) {

    return function(req, res, next) {
        return next();
    };

};