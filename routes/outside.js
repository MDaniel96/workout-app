var mainRedirectMW = require('../middlewares/generic/mainRedirect');
var inverseAuthMW = require('../middlewares/generic/inverseAuth');
var checkUserLoginMW = require('../middlewares/generic/checkUserLogin');
var renderMW = require('../middlewares/generic/render');
var logoutMW = require('../middlewares/generic/logout');
var checkUserRegistrationMW = require('../middlewares/generic/checkUserRegistration');
var getUserByEmailMW = require('../middlewares/generic/getUserByEmail');
var updateUserPassMW = require('../middlewares/generic/updateUserPass');
var sendEmailMW = require('../middlewares/generic/sendEmail');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository),
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
     * Registration
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /**
     * Forgotten password
     */
    app.use('/remind',
        getUserByEmailMW(objectRepository),
        updateUserPassMW(objectRepository),
        sendEmailMW(objectRepository),
        renderMW(objectRepository, 'reminder')
    );

    /**
     * Main page
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            res.redirect('/');
        }
    );

};


