var authMW = require('../middlewares/generic/auth');
var renderMW = require('../middlewares/generic/render');

var getCommentListMW = require('../middlewares/comment/getCommentList');
var updateCommentMW = require('../middlewares/comment/updateComment');
var getCommentMW = require('../middlewares/comment/getComment');
var deleteCommentMW = require('../middlewares/comment/deleteComment');


module.exports = function(app) {
    
    var objectRepository = { };
    
    /**
     * Add new comment to a plan
     */
    app.use('/comment/add/:planid', 
        authMW(objectRepository),
        updateCommentMW(objectRepository),
        renderMW(objectRepository, 'comment_edit')
    );

    /**
     * Delete comment
     * - then redirect to /comment/:planid
     */
    app.use('/comment/del/:id', 
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
        getCommentListMW(objectRepository),
        renderMW(objectRepository, 'comments')
    );
    
};