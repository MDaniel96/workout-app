var requireOption = require('../common').requireOption;

/**
 * Get logged in user
 * and put it on res.tpl.user
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        //lets find the user
        userModel.findOne({ _id: req.session.userid }, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.user = result;

            return next();
        });

    };
}