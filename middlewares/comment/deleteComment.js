var requireOption = require('../common').requireOption;

/**
 * Delete the comment object, if its already loaded
 */
module.exports = function (objectrepository) {

    var planModel = requireOption(objectrepository, 'planModel');

    return function (req, res, next) {
        if (typeof res.tpl.comment === 'undefined') {
            return next();
        }


        res.tpl.comment.remove(function (err) {
            if (err) {
                return next(err);
            }

            //redirect to user's comment
            res.redirect('/plan/user');
        });
    };

};