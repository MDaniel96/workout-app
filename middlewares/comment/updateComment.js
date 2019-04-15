var requireOption = require('../common').requireOption;

/**
 * Create (or update) comment if we have the data for it
 * update if we have a res.tpl.comment, create if we don't have
 *  - if there is no name, set tpl.error
 *  - if everything is ok ..then its ok
 */
module.exports = function (objectrepository) {

    var commentModel = requireOption(objectrepository, 'commentModel');

    return function (req, res, next) {

        if (typeof req.body.content === 'undefined') {
            return next();
        }

        var comment = new commentModel();

        comment.name = res.tpl.user.email;
        comment.content = req.body.content;
        comment._plan = res.tpl.plan._id;

        comment.save(function (err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/plan');
        });
    };

};