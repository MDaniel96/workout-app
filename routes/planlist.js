var authMW = require('../middlewares/generic/auth');
var renderMW = require('../middlewares/generic/render');

var getPlanListMW = require('../middlewares/plan/getPlanList');
var updatePlanMW = require('../middlewares/plan/updatePlan');
var getPlanMW = require('../middlewares/plan/getPlan');
var deletePlanMW = require('../middlewares/plan/deletePlan');
var markPlanMW = require('../middlewares/plan/markPlan');


module.exports = function(app) {
    
    var objectRepository = { };
    
    /**
     * Add new plan
     */
    app.use('/plan/add', 
        authMW(objectRepository),
        updatePlanMW(objectRepository),
        renderMW(objectRepository, 'plan_edit')
    );

     /**
     * Edit plan details
     */
    app.use('/plan/mod/:id', 
        authMW(objectRepository),
        getPlanMW(objectRepository),
        updatePlanMW(objectRepository),
        renderMW(objectRepository, 'plan_edit')
    );

    /**
     * Delete plan
     * - then redirect to /plan/user
     */
    app.use('/plan/del/:id', 
        authMW(objectRepository),
        getPlanMW(objectRepository),
        deletePlanMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/plan/user');
        }
    );

    /**
     * Mark/unmark a plan
     * - then redirect to /plan
     */
    app.use('/plan/mark/:id', 
        authMW(objectRepository),
        getPlanMW(objectRepository),
        markPlanMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/plan');
        }
    );

    /**
     * List all user's plans
     */
    app.use('/plan/user', 
        authMW(objectRepository),
        getPlanListMW(objectRepository),
        renderMW(objectRepository, 'user_plans')
    );

    /**
     * List all plans
     */
    app.use('/plan', 
        authMW(objectRepository),
        getPlanListMW(objectRepository),
        renderMW(objectRepository, 'plans')
    );
    
};