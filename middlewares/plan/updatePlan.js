var requireOption = require('../common').requireOption;

/**
 * Create (or update) plan if we have the data for it
 * update if we have a res.tpl.plan, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /plan
 */
module.exports = function (objectrepository) {

    var planModel = requireOption(objectrepository, 'planModel');
  
    return function (req, res, next) {
  
      if ((typeof req.body.title === 'undefined') ||
        (typeof req.body.description === 'undefined')) {
        return next();
      }

      var plan = undefined;
      if (typeof res.tpl.plan !== 'undefined') {
        plan = res.tpl.plan;
      } else {
        plan = new planModel();
      }

      plan.title = req.body.title;
      plan.description = req.body.description;
      plan.difficulty = req.body.difficulty;
      plan.length = req.body.length;
      plan._user = req.session.userid;

      plan.save(function (err, result) {
        if (err) {
          return next(err);
        }

        return res.redirect('/plan/user');
      });
    };
  
  };