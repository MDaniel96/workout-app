var requireOption = require('../common').requireOption;

/**
 * This middleware puts the user to res.tpl.user if found by email
 */
module.exports = function (objectrepository) {

  var userModel = requireOption(objectrepository, 'userModel');

  return function (req, res, next) {

    //not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined')) {
        
      return next();
    }
    

    //lets find the user
    userModel.findOne({
      email: req.body.email
    }, function (err, result) {
      if ((err) || (!result)) {
        console.log("Your email address is not registered");
        //res.tpl.error.push('Your email address is not registered!');

        return next();
      }

      //user found, place it to res.tpl.user
      res.tpl.user = result;
      return next();
    });
  };

};