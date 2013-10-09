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
function hashSync(pwd, salt, fn) {
    // Bytesize
    var len = 128,

    // Iterations. ~300ms
        iterations = 12000;

    if (3 == arguments.length) {
        fn(null, crypto.pbkdf2Sync(pwd, salt, iterations, len));
    } else {
        fn = salt;
        salt = crypto.randomBytes(len).toString('base64');
        fn(null, salt, crypto.pbkdf2Sync(pwd, salt, iterations, len));
    }
}

exports.getUser = function(req, res) {
	var findUser = function(userId) {
		var deferred = Q.defer();

		User.findOne({ _id: req.params.userId }, function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(new Error("No user exists with specified ID."));
	        }
	        else {
	        	deferred.resolve(retrievedUser);
	        }
	    });

	    return deferred.promise;
	};

	findUser(req.params.username).then(function(data) {
		var returnUser = JSON.parse(JSON.stringify(data));
        delete returnUser.salt;
        delete returnUser.hash;
        res.json(returnUser);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getUserByName = function(req, res) {
	var findUser = function(username) {
		var deferred = Q.defer();

		User.findOne({ username: username }, function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(new Error("No user exists with specified username."));
	        }
	        else {
	        	deferred.resolve(retrievedUser);
	        }
	    });

	    return deferred.promise;
	};

	findUser(req.params.username).then(function(data) {
		var returnUser = JSON.parse(JSON.stringify(data));
        delete returnUser.salt;
        delete returnUser.hash;
        res.json(returnUser);
	}, function(err) {
		res.send(500, err);
	});
};

exports.updateUser = function(req, res) {
	var getUpdateParams = function() {
		var updateParams = {};

		// loop through posted properties
		for (var key in req.body) {
			// make sure it isn't inherited
			if (req.body.hasOwnProperty(key)) {
				// make sure not changing user ID
				if(key !== '_id' && key !== 'password') {
					updateParams[key] = req.body[key];
				}
				if(key == 'password') {
					console.log('hit');
					hashSync(req.body[key], function(err, salt, hash){
			            if (err) {
			            	throw err;
			            }
			            else {
			            	updateParams['salt'] = salt;
			            	updateParams['hash'] = hash;
			            }
			        });
				}
			}
		}

		return updateParams;
	},
	updateUser = function(userId, updateParams) {
		console.log(updateParams);
		var deferred = Q.defer();

		User.findOneAndUpdate({ _id: userId }, updateParams, function(err, updatedUser) {
			if(err) {
         		deferred.reject(err);
         	}
         	else {
         		deferred.resolve(updatedUser);
         	}
		});

		return deferred.promise;
	};

	updateUser(req.params.userId, getUpdateParams()).then(function(data) {
		req.session.regenerate(function(){
            // Store the user's primary key 
            // in the session store to be retrieved,
            // or in this case the entire user object
            req.session.user = data;

            // respond with user object, minus salt and hash properties
            var returnUser = JSON.parse(JSON.stringify(data));
            delete returnUser.salt;
            delete returnUser.hash;
            res.json(returnUser);
        });
	}, function(err) {
		res.send(500, err);
	})
};

exports.subscribe = function(req, res) {
	if(req.params.subscribeId == req.params.userId) {
		res.send(400, "Cannot subscribe user to themselves.");
		return;
	}

	var findSubscription = function(userId) {
		var deferred = Q.defer();

		User.findOne({ _id: userId }, function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(new Error("No user exists with specified ID."));
	        }
	        else {
	        	deferred.resolve(retrievedUser);
	        }
	    });

	    return deferred.promise;
	},
	addSubscription = function(subscription) {
		var deferred = Q.defer();

		User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { subscriptions: subscription } }, function(err, updatedUser) {
         	if(err) {
         		deferred.reject(err);
         	}
         	else {
         		deferred.resolve(updatedUser);
         	}
	    });

        return deferred.promise;
	};

	findSubscription(req.params.subscribeId).then(function(returnedSubscription) {
		addSubscription(returnedSubscription).then(function(updatedUser) {
			req.session.regenerate(function(){
                // Store the user's primary key 
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = updatedUser;

                // respond with user object, minus salt and hash properties
                var returnUser = JSON.parse(JSON.stringify(updatedUser));
                delete returnUser.salt;
                delete returnUser.hash;
                res.json(returnUser);
            });
		}, function(err) {
			res.send(500, "Failed to add user subscription.");
		});
	}, function(err) {
		res.send(500, "Failed to find user to subscribe to.");
	});
};

exports.unsubscribe = function(req, res) {
	var findUser = function(userId) {
		var deferred = Q.defer();

		User.findOne({ _id: userId }, function (err, retrievedUser) {
            if (err || !retrievedUser) {
                deferred.reject('Cannot find user.');
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

		return deferred.promise;
	},
	findSubscription = function(userId) {
		var deferred = Q.defer();

		User.findOne({ _id: userId }, function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(new Error("No user exists with specified ID."));
	        }
	        else {
	        	deferred.resolve(retrievedUser);
	        }
	    });

	    return deferred.promise;
	},
	removeSubscription = function(user, subscription) {
		var deferred = Q.defer(),
			subscriptionIndex = null;

		for(var i = 0; i < user.subscriptions.length; i++) {
			if(user.subscriptions[i]._id.toString() == subscription._id.toString()) {
				subscriptionIndex = i;
			}
		}

		if(subscriptionIndex !== null) {
			user.subscriptions.splice(subscriptionIndex, 1);
			user.save(function (err, savedUser) {
                if (err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve(savedUser);
                }
            });
		}
		else {
			deferred.reject(new Error("Subscription does not exist for user."));
		}

        return deferred.promise;
	};

	findUser(req.params.userId).then(function(retrievedUser) {
		findSubscription(req.params.subscribeId).then(function(retrievedSubscription) {
			removeSubscription(retrievedUser, retrievedSubscription).then(function(updatedUser) {
				req.session.regenerate(function(){
		            // Store the user's primary key 
		            // in the session store to be retrieved,
		            // or in this case the entire user object
		            req.session.user = updatedUser;

		            // respond with user object, minus salt and hash properties
		            var returnUser = JSON.parse(JSON.stringify(updatedUser));
		            delete returnUser.salt;
		            delete returnUser.hash;
		            res.json(returnUser);
		        });
			}, function(err) {
				res.send(500, "Failed to remove user subscription.");
			});
		}, function(err) {
			res.send(500, "Failed to find user to subscribe to.");
		});
	}, function(err) {
		res.send(500, "Failed to find user by ID.");
	});
};