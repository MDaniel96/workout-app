var requireOption = require('../common').requireOption;

/**
 * Get user's plan list
 */

module.exports = function (objectrepository) {

    var planModel = requireOption(objectrepository, 'planModel');

    return function (req, res, next) {

        planModel.find({
            _user: req.session.userid
        }).populate('_user').exec(function (err, results) {
            if (err) {
                return next(new Error('Error getting plans'));
            }

            res.tpl.plans = results;
            return next();
        });
    };

};