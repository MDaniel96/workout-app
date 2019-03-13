var mainRedirectMW = require('../middlewares/generic/mainRedirect');
var inverseAuthMW = require('../middlewares/generic/inverseAuth');
var checkUserLoginMW = require('../middlewares/generic/checkUserLogin');
var renderMW = require('../middlewares/generic/render');
var logoutMW = require('../middlewares/generic/logout');

module.exports = function (app) {

    var objectRepository = { };

    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Main page
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function(req, res, next) {
            res.redirect('/');
        }
    );

};


