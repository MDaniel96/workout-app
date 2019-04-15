var requireOption = require('../common').requireOption;

/**
 * Get the plan list
 */
module.exports = function (objectrepository) {

    var planModel = requireOption(objectrepository, 'planModel');
    var markModel = requireOption(objectrepository, 'markModel');

    return function (req, res, next) {

        planModel.find({

        }).populate('_user').exec(function (err, results) {
            if (err) {
                return next(new Error('Error getting plans'));
            }

            var cnt = 0;
            results.forEach(function (plan) {
                markModel.findOne({
                    _plan: plan._id,
                    _user: res.tpl.user._id
                }).exec(function (err, result) {
                    if (err) {
                        return next(new Error('Error getting marks'));
                    }
                    cnt++;
                    result !== null ? plan.marked = true : plan.marked = false;
                    if (cnt === results.length) {
                        res.tpl.plans = results;
                        return next();
                    }
                });
                
            });


        });
    };

};