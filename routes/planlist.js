var authMW = require('../middlewares/generic/auth');
var renderMW = require('../middlewares/generic/render');
var getLoggedinUserMW = require('../middlewares/generic/getLoggedinUser');

var getPlanListMW = require('../middlewares/plan/getPlanList');
var getUsersPlanListMW = require('../middlewares/plan/getUsersPlanList');
var updatePlanMW = require('../middlewares/plan/updatePlan');
var getPlanMW = require('../middlewares/plan/getPlan');
var deletePlanMW = require('../middlewares/plan/deletePlan');
var markPlanMW = require('../middlewares/plan/markPlan');
var unmarkPlanMW = require('../middlewares/plan/unmarkPlan');


var planModel = require('../models/plan');
var userModel = require('../models/user');
var markModel = require('../models/mark');

module.exports = function(app) {
    
    var objectRepository = {
        planModel: planModel,
        userModel: userModel,
        markModel: markModel
    };
    
    /**
     * Add new plan
     */
    app.use('/plan/add', 
        authMW(objectRepository),
        updatePlanMW(objectRepository),
        renderMW(objectRepository, 'addplan')
    );

     /**
     * Edit plan details
     */
    app.use('/plan/mod/:planid', 
        authMW(objectRepository),
        getPlanMW(objectRepository),
        updatePlanMW(objectRepository),
        renderMW(objectRepository, 'editplan')
    );

    /**
     * Delete plan
     * - then redirect to /plan/user
     */
    app.use('/plan/del/:planid', 
        authMW(objectRepository),
        getPlanMW(objectRepository),
        deletePlanMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/plan/user');
      }
    );

    /**
     * Mark a plan
     * - then redirect to /plan
     */
    app.use('/plan/mark/:planid', 
        authMW(objectRepository),
        getLoggedinUserMW(objectRepository),
        getPlanMW(objectRepository),
        markPlanMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/plan');
        }
    );

     /**
     * Unmark a plan
     * - then redirect to /plan
     */
    app.use('/plan/unmark/:planid', 
        authMW(objectRepository),
        getLoggedinUserMW(objectRepository),
        getPlanMW(objectRepository),
        unmarkPlanMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/plan');
        }
    );

    /**
     * List all user's plans
     */
    app.use('/plan/user', 
        authMW(objectRepository),
        getLoggedinUserMW(objectRepository),
        getUsersPlanListMW(objectRepository),
        renderMW(objectRepository, 'myplans')
    );

    /**
     * List all plans
     */
    app.use('/plan', 
        authMW(objectRepository),
        getLoggedinUserMW(objectRepository),
        getPlanListMW(objectRepository),
        renderMW(objectRepository, 'plans')
    );
    
};