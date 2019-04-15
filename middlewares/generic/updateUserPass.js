var requireOption = require('../common').requireOption;

/**
 * Update if we have the data for it
 * update if we have res.tpl.user.email, user's password to random and place it on res.tpl.newPassword
 *  - if there is no name, set tpl.error
 *  - if everything is ok ..then its ok
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        var user = undefined;
        if (typeof res.tpl.user !== 'undefined') {
            user = res.tpl.user;
        } else {
            return next();
        }


        user.password = Math.random().toString(36).slice(-8);
        res.tpl.newPassword = user.password;

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return next();
        });
    };

};