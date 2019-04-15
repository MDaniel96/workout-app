var nodemailer = require('nodemailer');

/**
 * This middleware sends email to res.tpl.user.email by about its new password
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        //smth not arrived
        if (typeof res.tpl.user === 'undefined' || typeof res.tpl.newPassword === 'undefined') {
            return next();
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'teamsportify@gmail.com',
                pass: 'sportify123'
            }
        });

        var mailOptions = {
            from: 'reminder@myworkout.com',
            to: res.tpl.user.email,
            subject: 'Password reminder',
            text: 'Congrats for forgetting your pass, your new one is: ' + res.tpl.newPassword
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        return res.redirect('/');
    }
};