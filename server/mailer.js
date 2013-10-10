var Q          = require('q'),
	config     = require('./config'),
    nodemailer = require('nodemailer');

// set up amazon SES transport for sending emails
var transport = nodemailer.createTransport("SES", {
    AWSAccessKeyID: config.aws.key,
    AWSSecretKey: config.aws.secret
});

exports.sendActivationEmail = function(user) {
	var deferred = Q.defer(),
		mailOptions = {
	        from: "Campuslively <noreply@campuslively.com>",
	        to: user.email,
	        subject: "Activate your Account",
	        html: '<a href="localhost:3000/activate/' + user._id + '/' + user.activationKey + '">Click Here to Activate Your Account</a>'
	    };

    transport.sendMail(mailOptions, function(error, response){
        if(error){
            deferred.reject(error);
        } else {
            deferred.resolve(response.message);
        }

        transport.close();
    });

    return deferred.promise;
};

exports.sendResetEmail = function(user) {
	var deferred = Q.defer(),
		mailOptions = {
	        from: "Campuslively <noreply@campuslively.com>",
	        to: user.email,
	        subject: "Reset your Password",
	        html: '<a href="localhost:3000/reset/' + user._id + '/' + user.passwordResetKey + '">Click Here to Set a New Password</a>'
	    };

    transport.sendMail(mailOptions, function(error, response){
        if(error){
            deferred.reject(error);
        } else {
            deferred.resolve(response.message);
        }

        transport.close();
    });

    return deferred.promise;
};