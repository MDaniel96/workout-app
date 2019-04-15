var requireOption = require('../common').requireOption;

/**
 * Get the comment for the commentid param
 *  - if there is no such comment, redirect to /comments
 *  - if there is one, put it on res.tpl.comment
 */
module.exports = function (objectrepository) {

    var commentModel = requireOption(objectrepository, 'commentModel');

    return function (req, res, next) {

        commentModel.findOne({
            _id: req.params.commentid
        }).populate('_plan').exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/plan/user');
            }

            res.tpl.comment = result;
            return next();
        });
    };

};