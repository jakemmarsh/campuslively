var Q      = require('q'),
    crypto = require('crypto'),
    User   = require('../models/user');

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

    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
}

function authenticate(name, pass, fn) {
    var findUser = function(username) {
        var deferred = Q.defer();

        User.findOne({ username: name }, function (err, retrievedUser) {
            if (err || !retrievedUser) {
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
            if (hash == data.hash) return fn(null, data);
            return fn('Invalid password.');
        });
    }, function() {
        return fn('Failed to retrieve user.');
    });
}

exports.check = function(req, res) {
    if (req.session.user) {
        var returnUser = JSON.parse(JSON.stringify(req.session.user));
        delete returnUser.salt;
        delete returnUser.hash;
        var data = {
            loggedIn: true,
            user: returnUser
        };

        res.json(data);
    } 
    else {
        res.send(401, "No session exists for user.");
    }
};

exports.login = function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user){
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation 
            req.session.regenerate(function(){
                // Store the user's primary key 
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;

                // respond with user object, minus salt and hash properties
                var returnUser = JSON.parse(JSON.stringify(user));
                delete returnUser.salt;
                delete returnUser.hash;
                res.json(returnUser);
            });
        } 
        else {
            res.send(401, err);
        }
    });
};

exports.logout = function(req, res) {
	req.session.destroy(function(){
        // TODO: delete session from mongo?
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
        }

    // generate a salt and hash the password
    hash(req.body.password, function(err, salt, hash){
        if (err) throw err;

        // create user object from traits that are shared between student and business accounts
        newUser = new User({
            username: req.body.username,
            salt: salt,
            hash: hash,
            email: req.body.email
        });

        // check for account type
        if(req.body.type) {
            if(req.body.type.toLowerCase() == 'student') {
                if((newUser.email.substring(newUser.email.length - 4)).toLowerCase() != '.edu') {
                    res.send(400, 'Email address must end in .edu.');
                }

                newUser.type = 'student';
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.gender = req.body.gender;
                newUser.school = req.body.school;

                registerUser(newUser).then(function(data) {
                    res.json(data);
                }, function(){
                    res.send(500, 'Failed to register new user.');
                });
            }
            else if(req.body.type.toLowerCase() == 'business') {
                newUser.type = 'business';
                newUser.businessName = req.body.businessName;

                // assign business to a school if one is specified
                if(req.body.school) {
                    newUser.school = req.body.school;
                }

                registerUser(newUser).then(function(data) {
                    res.json(data);
                }, function(){
                    res.send(500, 'Failed to register new user.');
                });
            }
        }
    });
};

exports.forgotPassword = function(req, res) {
    var getUserAndSetKey = function(username) {
        var deferred = Q.defer();

        crypto.randomBytes(16, function(ex, buf) {
            User.findOneAndUpdate({ username: username }, { $set: { passwordResetKey: buf.toString('hex') } }, function (err, retrievedUser) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(retrievedUser);
                }
            });
        });

        return deferred.promise;
    };

    getUserAndSetKey(req.body.username).then(function(data) {
        res.send(200, "Successfully set user's password reset key.");
    }), function() {
        res.send(500, "Failed to set user's password reset key.");
    }
};

exports.resetPassword = function(req, res) {
    var getUserAndUpdatePassword = function(resetKey) {
        var deferred = Q.defer();

        hash(req.body.password, function(err, salt, hash){
            User.findOneAndUpdate({ passwordResetKey: resetKey }, { $set: { passwordResetKey: null, hash: hash, salt: salt }}, function (err, retrievedUser) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(retrievedUser);
                }
            });
        });

        return deferred.promise;
    };

    getUserAndUpdatePassword(req.body.resetKey).then(function(data) {
        res.send(200, "Successfully updated user's password.");
    }, function(){
        res.send(500, "Failed to update user's password.");
    });

};