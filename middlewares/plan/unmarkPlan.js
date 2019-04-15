var requireOption = require('../common').requireOption;

/**
 * Unmark a plan object
 */
module.exports = function (objectrepository) {

    var markModel = requireOption(objectrepository, 'markModel');

    return function (req, res, next) {

        if (typeof res.tpl.plan === 'undefined' || res.tpl.user === 'undefined') {
            return next();
        }

        markModel.find({
            _plan: res.tpl.plan,
            _user: res.tpl.user
        })
        .remove()
        .exec(function (err, res) {
            if (err) {
                return next(new Error('Error deleting mark'));
            }
            return next();
        });


    };

};