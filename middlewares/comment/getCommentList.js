var requireOption = require('../common').requireOption;

/**
 * Get the comment list of a plan
 */

module.exports = function (objectrepository) {

    var commentModel = requireOption(objectrepository, 'commentModel');

    return function (req, res, next) {

        commentModel.find({
            _plan: res.tpl.plan._id
        }).populate('_plan').exec(function (err, results) {
            if (err) {
                return next(new Error('Error getting comment'));
            }

            results.forEach(function (comment) {
                (comment.name === res.tpl.user.email) ?
                    comment.owned = true
                    :
                    comment.owned = false;
            });

            res.tpl.comments = results;
            return next();
        });
    };

};