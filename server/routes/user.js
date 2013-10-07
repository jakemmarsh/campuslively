var Q      = require('q'),
    User   = require('../models/user');

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

		User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { subscriptions: subscription._id } }, function(err, updatedUser) {
         	console.log('inside');
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
	removeSubscription = function(user, subscriptionId) {
		var deferred = Q.defer(),
			subscriptionIndex = user.subscriptions.indexOf(subscriptionId);

		if(subscriptionIndex !== -1) {
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
		removeSubscription(retrievedUser, req.params.subscribeId).then(function(updatedUser) {
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
		res.send(500, "Failed to find user by ID.");
	});
};