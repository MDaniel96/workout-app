var requireOption = require('../common').requireOption;

/**
 * Delete the plan object, if its already loaded
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {

        if (typeof res.tpl.plan === 'undefined') {
            return next();
        }

        res.tpl.plan.remove(function (err) {
            if (err) {
                return next(err);
            }

            //redirect to user's plans
            res.redirect('/plan/user');
        });
    };

};