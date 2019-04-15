var requireOption = require('../common').requireOption;

/**
 * Get the plan for the planid param
 *  - if there is no such plan, redirect to /plan
 *  - if there is one, put it on res.tpl.plan
 */
module.exports = function (objectrepository) {

    var planModel = requireOption(objectrepository, 'planModel');

    return function (req, res, next) {

        planModel.findOne({
            _id: req.param('planid')
        }).populate('_user').exec(function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/plan/user');
            }

            res.tpl.plan = result;
            return next();
        });
    };

};