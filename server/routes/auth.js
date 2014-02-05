var Q          = require('q'),
    crypto     = require('crypto'),
    User       = require('../models/user'),
    Event      = require('../models/event'),
    config     = require('../config'),
    mailer     = require('../mailer');

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */
function hash(pwd, salt, fn) {
    // Bytesize
    var len = 128,

    // Iterations. ~300ms
        iterations = 12000;

    if (3 === arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash.toString('hex'));
            });
        });
    }
}

function authenticate(name, pass, fn) {
    var findUser = function(username) {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' },
                { path: 'school' }
            ];
        User.findOne({ username: username.toLowerCase() })
        .select('+hash +salt')
        .populate(populateObj)
        .exec(function (err, retrievedUser) {
            if (err || !retrievedUser) {
                console.log(err);
                deferred.reject('Cannot find user.');
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    };

    findUser(name).then(function(data) {
        // apply the same algorithm to the POSTed password, applying
        // the hash against the pass / salt, if there is a match we
        // found the user
        hash(pass, data.salt, function(err, hash){
            if (err) return fn(err);
            if (hash.toString('hex') === data.hash) return fn(null, data);
            return fn('Invalid password.');
        });
    }, function() {
        return fn('Failed to retrieve user.');
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.check = function(req, res) {
    if (req.session) {
        if (req.session.user) {
            var data = {
                loggedIn: true,
                user: req.session.user
            };

            res.json(200, data);
        }
        else {
            res.send(404, "No session exists for user.");
        }
    }
    else {
        res.send(404, "No session exists for user.");
    }
};

exports.login = function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user){
        if (user) {
            if(user.activated === false) {
                res.send(403, "Account has not been activated.");
                return;
            }
            else {
                // Regenerate session when signing in
                // to prevent fixation 
                req.session.regenerate(function(){
                    // Store the user's primary key 
                    // in the session store to be retrieved,
                    // or in this case the entire user object
                    req.session.user = user;

                    // increase duration of cookie
                    req.session.cookie.maxAge = 604800000;

                    // respond with user object, minus salt and hash properties
                    var returnUser = JSON.parse(JSON.stringify(user));
                    delete returnUser.salt;
                    delete returnUser.hash;
                    res.json(200, returnUser);
                });
            }
        } 
        else {
            res.send(403, "Username or password incorrect.");
        }
    });
};

exports.logout = function(req, res) {
	req.session.destroy(function(){
        res.send(200, "User successfully logged out.");
    });
};

exports.register = function(req, res) {
    var newUser,
        registerUser = function(user) {
            var deferred = Q.defer();

            user.save(function (err, savedUser) {
                if (err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve(savedUser);
                }
            });

            return deferred.promise;
        };

    // generate a salt and hash the password
    hash(req.body.password, function(err, salt, hash){
        if (err) throw err;

        // create user object from traits that are shared between student and group accounts
        newUser = new User({
            username: req.body.username.toLowerCase(),
            salt: salt,
            hash: hash,
            email: req.body.email
        });

        // set random activation key
        newUser.activationKey = crypto.randomBytes(16).toString('hex');

        // check for account type
        if(req.body.type.toLowerCase() === 'student') {
            if((newUser.email.substring(newUser.email.length - 4)).toLowerCase() != '.edu') {
                res.send(400, 'Email address must end in .edu.');
            }

            newUser.type = 'student';
            newUser.firstName = capitalizeFirstLetter(req.body.firstName);
            newUser.lastName = capitalizeFirstLetter(req.body.lastName);
            newUser.displayName = capitalizeFirstLetter(req.body.firstName) + ' ' + capitalizeFirstLetter(req.body.lastName);
            newUser.gender = req.body.gender;
            newUser.school = req.body.school;
            newUser.loc = req.body.loc;
        }
        else if(req.body.type.toLowerCase() === 'group') {
            newUser.type = 'group';
            newUser.groupName = req.body.groupName;
            newUser.displayName = req.body.groupName;
            if(req.body.groupDescription) {
                newUser.groupDescription = req.body.groupDescription;
            }
            if(req.body.school) {
                newUser.school = req.body.school;
            }
            newUser.loc = req.body.loc;
        }
        registerUser(newUser).then(function(savedUser) {
            mailer.sendActivationEmail(savedUser).then(function(data) {
                res.send(200, 'User registered and email sent.');
            }, function(err) {
                res.send(200, 'User registered but failed to send activation email.');
            });
        }, function(err) {
            res.send(500, err);
        });
    });
};

exports.resendActivation = function(req, res) {
    var findUser = function(username) {
        var deferred = Q.defer();

        User.findOne({ username: username }, function (err, retrievedUser) {
            if (err || !retrievedUser) {
                deferred.reject('Cannot find user.');
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    };

    findUser(req.params.username).then(function(retrievedUser) {
        mailer.sendActivationEmail(retrievedUser).then(function(data) {
            res.send(200, "Activation email resent.");
        }, function() {
            res.send(500, "Failed to resend activation email.");
        });
    }, function(err) {
        res.send(404, "User could not be found.");
    })
};

exports.activate = function(req, res) {
    var getUserAndActivate = function(userId, activateKey) {
        var deferred = Q.defer();

        User.findOneAndUpdate({ activationKey: activateKey, _id: userId }, { $set: { activated: true, activationKey: null } }, function (err, updatedUser) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(updatedUser);
            }
        });

        return deferred.promise;
    };

    getUserAndActivate(req.params.userId, req.params.activateKey).then(function(data) {
        if(data) {
            res.send(200, "User successfully activated.");
        }
        else {
            res.send(500, "User doesn't exist or is already activated.");
        }
    }, function(err) {
        res.send(500, "Could not activate user.");
    });
};

exports.forgotPassword = function(req, res) {
    var getUserAndSetKey = function(username) {
        var deferred = Q.defer();

        crypto.randomBytes(16, function(ex, buf) {
            User.findOneAndUpdate({ username: username }, { $set: { passwordResetKey: buf.toString('hex') } }, function (err, retrievedUser) {
                if (err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve(retrievedUser);
                }
            });
        });

        return deferred.promise;
    };

    getUserAndSetKey(req.body.username).then(function(savedUser) {
        if(savedUser) {
            mailer.sendResetEmail(savedUser).then(function(data) {
                res.send(200, "Successfully set user's password reset key.");
            }, function() {
                res.send(500, "Password reset key set, but failed to send email.");
            });
        }
        else {
            res.send(404, "No user exists with that username.");
        }
    }, function() {
        res.send(500, "Failed to set user's password reset key.");
    });
};

exports.checkResetKey = function(req, res) {
    var checkKey = function(resetKey) {
        var deferred = Q.defer();

        User.findOne({ passwordResetKey: resetKey })
        .exec(function (err, retrievedUser) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    };

    checkKey(req.params.resetKey).then(function(data) {
        res.send(200, data);
    }, function(err) {
        res.send(404, err);
    });
};

exports.resetPassword = function(req, res) {
    var getUserAndUpdatePassword = function(userId, resetKey) {
        var deferred = Q.defer();

        hash(req.body.password, function(err, salt, hash){
            User.findOneAndUpdate({ passwordResetKey: resetKey, _id: userId }, { $set: { passwordResetKey: null, hash: hash, salt: salt }}, function (err, retrievedUser) {
                if (err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve(retrievedUser);
                }
            });
        });

        return deferred.promise;
    };

    getUserAndUpdatePassword(req.body.userId, req.body.resetKey).then(function(data) {
        res.send(200, "Successfully updated user's password.");
    }, function(err){
        res.send(500, "Failed to update user's password.");
    });

};

exports.checkUsername = function(req, res) {
    var checkIfUsernameTaken = function(username) {
        var deferred = Q.defer();

        User.find({ username: username }, function(err, retrievedUsers) {
            if (err) {
                deferred.reject(err.message)
            }
            else {
                if(retrievedUsers.length > 0) {
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            }
        });

        return deferred.promise;
    };

    checkIfUsernameTaken(req.params.username).then(function(data) {
        res.send(200, data);
    }, function(err) {
        res.send(500, "Failed to check if username exists already.");
    });
};

exports.checkEmail = function(req, res) {
    var checkIfEmailUsed = function(email) {
        var deferred = Q.defer();

        User.find({ email: email }, function(err, retrievedUsers) {
            if (err) {
                deferred.reject(err.message)
            }
            else {
                if(retrievedUsers.length > 0) {
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            }
        });

        return deferred.promise;
    };

    checkIfEmailUsed(req.params.email).then(function(data) {
        res.send(200, data);
    }, function(err) {
        res.send(500, "Failed to check if email address is in use already.");
    });
};