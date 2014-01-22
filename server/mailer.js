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
	        from: "Campuslively <jake@campuslively.com>",
	        to: user.email,
	        subject: "Activate your Account",
	        html: '<a href="http://www.campuslively.com/activate/' + user._id + '/' + user.activationKey + '">Click Here to Activate Your Account</a>'
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
	        from: "Campuslively <jake@campuslively.com>",
	        to: user.email,
	        subject: "Reset your Password",
	        html: '<a href="http://www.campuslively.com/reset/' + user._id + '/' + user.passwordResetKey + '">Click Here to Set a New Password</a>'
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

exports.sendContactEmail = function(req, res) {
    var sendEmail = function(message) {
        var deferred = Q.defer(),
            mailOptions = {
                from: "Campuslively <jake@campuslively.com>",
                to: "jake@campuslively.com, matt@campuslively.com",
                html: message.body
            };

        if(message.subject) {
            mailOptions.subject = "Message from Campuslively: " + message.subject;
        }
        else {
            mailOptions.subject = "Message from Campuslively";
        }

        transport.sendMail(mailOptions, function(error, response){
            if(error){
                deferred.reject(error);
            } else {
                deferred.resolve(response.message);
            }

            transport.close();
        });

        return deferred.promise;
    }

    sendEmail(req.body).then(function(data) {
        res.send(200, "Message successfully sent.");
    }, function(err) {
        res.send(500, "Failed to send email.");
    });
};