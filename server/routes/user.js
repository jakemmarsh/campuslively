var Q        = require('q'),
	crypto   = require('crypto'),
    User     = require('../models/user'),
    School   = require('../models/school'),
    Activity = require('../models/activity');

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
		var deferred = Q.defer(),
			populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' }
            ];

		User.findOne({ _id: req.params.userId }).populate(populateObj).exec(function (err, retrievedUser) {
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
		var deferred = Q.defer(),
			populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' }
            ];

		User.findOne({ username: username }).populate(populateObj).exec(function (err, retrievedUser) {
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
		var updateParams = {},
			hasSchool;

		// loop through posted properties
		for (var key in req.body) {
			// make sure it isn't inherited
			if (req.body.hasOwnProperty(key)) {
				// make sure not changing user ID
				if(key !== '_id' && key !== 'password') {
					updateParams[key] = req.body[key];
				}
				if(key == 'password') {
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
		var deferred = Q.defer(),
			populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' }
            ];

		User.findOneAndUpdate({ _id: userId }, updateParams).populate(populateObj).exec(function(err, updatedUser) {
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
		var deferred = Q.defer(),
			populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' }
            ];

		User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { subscriptions: subscription._id } }).populate(populateObj).exec(function(err, updatedUser) {
         	if(err) {
         		deferred.reject(err);
         	}
         	else {
         		deferred.resolve(updatedUser);
         	}
	    });

        return deferred.promise;
	},
	createActivity = function(user, subscription) {
		var deferred = Q.defer(),
			activity = new Activity({
				actor: user._id,
				recipient: subscription._id,
				activity: 'subscribed'
			});

		activity.save(function (err, savedActivity) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(savedActivity);
            }
        });

        return deferred.promise;
	};

	findSubscription(req.params.subscribeId).then(function(returnedSubscription) {
		addSubscription(returnedSubscription).then(function(updatedUser) {
			createActivity(updatedUser, returnedSubscription).then(function() {
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
				res.send(200, "Subscription added but activity could not be created.");
			});
		}, function(err) {
			res.send(500, "Failed to add user subscription.");
		});
	}, function(err) {
		res.send(500, "Failed to find user to subscribe to.");
	});
};

exports.unsubscribe = function(req, res) {
	var removeSubscription = function(userId, subscriptionId) {
		var deferred = Q.defer(),
			populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' }
            ];

		User.findOneAndUpdate({ _id: userId }, { $pull: { 'subscriptions': subscriptionId } }).populate(populateObj).exec(function(err, updatedUser) {
         	if(err) {
         		deferred.reject(err);
         	}
         	else {
         		deferred.resolve(updatedUser);
         	}
	    });

	    return deferred.promise;
	};

	removeSubscription(req.params.userId, req.params.subscribeId).then(function(updatedUser) {
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
};

exports.getActivities = function(req, res) {
	var getUser = function(userId) {
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
	}
	getTwentyActivities = function(user) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'event' },
				{ path: 'actor' },
				{ path: 'recipient '}
			];

		if(req.params.oldestId) {
			Activity.find({ _id: {$lt: req.params.oldestId}, $or: [{recipient: user._id}, {actor: {$in: user.subscriptions}}] }).populate(populateObj).exec(function(err, retrievedActivities) {
				if(err || !retrievedActivities) {
					deferred.reject(new Error("No events found."));
				}
				else {
					deferred.resolve(retrievedActivities);
				}
			});
		}
		else {
			Activity.find({ $or: [{recipient: user._id}, {actor: {$in: user.subscriptions}}] }).populate(populateObj).exec(function(err, retrievedActivities) {
				if(err || !retrievedActivities) {
					deferred.reject(new Error("No events found."));
				}
				else {
					deferred.resolve(retrievedActivities);
				}
			});
		}

		return deferred.promise;
	};

	getUser(req.params.userId).then(function(retrievedUser) {
		getTwentyActivities(retrievedUser).then(function(activities) {
			res.json(activities);
		}, function(err) {
			res.send(500, "Failed to load more activities.");
		});
	}, function(err) {
		res.send(500, "Failed to retrieve user.");
	});
};