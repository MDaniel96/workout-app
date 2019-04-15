var authMW = require('../middlewares/generic/auth');
var renderMW = require('../middlewares/generic/render');
var getLoggedinUserMW = require('../middlewares/generic/getLoggedinUser');

var getCommentListMW = require('../middlewares/comment/getCommentList');
var updateCommentMW = require('../middlewares/comment/updateComment');
var getCommentMW = require('../middlewares/comment/getComment');
var deleteCommentMW = require('../middlewares/comment/deleteComment');

var getPlanMW = require('../middlewares/plan/getPlan');

var planModel = require('../models/plan');
var userModel = require('../models/user');
var commentModel = require('../models/comment');

module.exports = function(app) {
    
    var objectRepository = {
        planModel: planModel,
        userModel: userModel,
        commentModel: commentModel
    };
    
    /**
     * Add new comment to a plan
     */
    app.use('/comment/add/:planid', 
        authMW(objectRepository),
        getLoggedinUserMW(objectRepository),
        getPlanMW(objectRepository),
        updateCommentMW(objectRepository),
        renderMW(objectRepository, 'addcomment')
    );

    /**
     * Delete comment
     * - then redirect to /comment/:planid
     */
    app.use('/comment/del/:commentid', 
        authMW(objectRepository),
        getCommentMW(objectRepository),
        deleteCommentMW(objectRepository),
        /*function (req, res, next) {
            return res.redirect('/comment/:planid');
        } */
    );

    /**
     * List all comments of a plan
     */
    app.use('/comment/:planid', 
        authMW(objectRepository),
        getLoggedinUserMW(objectRepository),
        getPlanMW(objectRepository),
        getCommentListMW(objectRepository),
        renderMW(objectRepository, 'comments')
    );
    
};