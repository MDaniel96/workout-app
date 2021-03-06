var requireOption = require('../common').requireOption;

/**
 * Mark a plan object
 */
module.exports = function (objectrepository) {

    var markModel = requireOption(objectrepository, 'markModel');

    return function (req, res, next) {

        if (typeof res.tpl.plan === 'undefined' || res.tpl.user === 'undefined') {
            return next();
        }

        mark = new markModel();
        mark._plan = res.tpl.plan;
        mark._user = res.tpl.user;

        mark.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        });

    };

};