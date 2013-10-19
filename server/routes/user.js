var Q        = require('q'),
	crypto   = require('crypto'),
    User     = require('../models/user'),
    School   = require('../models/school'),
    Activity = require('../models/activity'),
    Event    = require('../models/event'),
    Comment  = require('../models/comment'),
    config   = require('../config'),
    fs       = require('fs'),
    AWS      = require('aws-sdk'),
    s3       = new AWS.S3();

AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret
});

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
        fn(null, salt, crypto.pbkdf2Sync(pwd, salt, iterations, len).toString('hex'));
    }
};

function S3Signing(userId) {
    var bucket = config.aws.bucket,
        awsKey = config.aws.key,
        secret = config.aws.secret,
        fileName = userId,
        expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString();
    
    var policy = { 
        "expiration": expiration,
        "conditions": [
            {"bucket": bucket},
            {"key": fileName},
            {"acl": 'public-read'},
            ["starts-with", "$Content-Type", ""],
            ["content-length-range", 0, 524288000]
        ]};
 
    policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
    signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
    var returnObject = {
    	bucket: bucket,
    	awsKey: awsKey,
    	policy: policyBase64,
    	signature: signature
    };
    return returnObject;
};

exports.getUser = function(req, res) {
	var findUser = function(userId) {
		var deferred = Q.defer(),
			populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' }, 
                { path: 'attending' },
                { path: 'invites' },
                { path: 'school' }
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
                { path: 'invites' },
                { path: 'school' }
            ];

		User.findOne({ username: username.toLowerCase() })
		.populate(populateObj)
		.exec(function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(err.message);
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
                { path: 'invites' },
                { path: 'school' }
            ];

		User.findOneAndUpdate({ _id: userId }, updateParams)
		.populate(populateObj)
		.exec(function(err, updatedUser) {
			if(err) {
         		deferred.reject(err.message);
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

exports.uploadImage = function(req, res) {
	postToS3 = function(image, userId) {
		var s3bucket = new AWS.S3({params: {Bucket: config.aws.bucket}}),
			deferred = Q.defer(),
			getExtension = function(filename) {
			    var i = filename.lastIndexOf('.');
    			return (i < 0) ? '' : filename.substr(i);
			},
		 	dataToPost = {
		 		Bucket: config.aws.bucket,
		 		Key: 'user_imgs/' + userId + getExtension(image.name),
		 		ACL: 'public-read',
		 		ContentType: image.type
		 	};

		fs.readFile(image.path, function(err, readFile) {
			console.log(readFile);
	        dataToPost.Body = readFile;

	        s3bucket.putObject(dataToPost, function(err, data) {
				if (err) {
				  deferred.reject(err.message);
				} else {
				  deferred.resolve(data);
				}
			});
	    });

		return deferred.promise;
	};

	postToS3(req.files.image, req.params.userId).then(function(data) {
		res.json(200, data);
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
                { path: 'invites' },
                { path: 'school' }
            ];

		User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { subscriptions: subscription._id } })
		.populate(populateObj)
		.exec(function(err, updatedUser) {
         	if(err) {
         		deferred.reject(err.message);
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
                { path: 'invites' },
                { path: 'school' }
            ];

		User.findOneAndUpdate({ _id: userId }, { $pull: { 'subscriptions': subscriptionId } })
		.populate(populateObj)
		.exec(function(err, updatedUser) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
         		deferred.resolve(updatedUser);
         	}
	    });

	    return deferred.promise;
	},
	deleteActivity = function(userId, subscriptionId) {
		var deferred = Q.defer();

		Activity.remove({ actor: userId, recipient: subscriptionId, activity: 'subscribed' }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	removeSubscription(req.params.userId, req.params.subscribeId).then(function(updatedUser) {
		deleteActivity(req.params.userId, req.params.subscribeId).then(function() {
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
			req.session.regenerate(function(){
	            req.session.user = updatedUser;
	            
	            var returnUser = JSON.parse(JSON.stringify(updatedUser));
	            delete returnUser.salt;
	            delete returnUser.hash;
	            res.json(returnUser);
	        });
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
	getActivities = function(user) {
		var deferred = Q.defer(),
			activityPopulateObj = [
				{ path: 'event' },
				{ path: 'comment' },
				{ path: 'actor' },
				{ path: 'recipient' }
			];

		if(req.params.limit) {
			Activity.find({ $or: [{recipient: user._id}, {actor: {$in: user.subscriptions}}, {event: {$in: user.attending}}], actor: { $ne: user._id} })
			.populate(activityPopulateObj)
			.exec(function(err, retrievedActivities) {
				if(err || !retrievedActivities) {
					deferred.reject(new Error("No events found."));
				}
				else {
					deferred.resolve(retrievedActivities);
				}
			});
		}
		else {
			Activity.find({ $or: [{recipient: user._id}, {actor: {$in: user.subscriptions}}, {event: {$in: user.attending}}], actor: { $ne: user._id} })
			.limit(req.params.limit)
			.populate(activityPopulateObj)
			.exec(function(err, retrievedActivities) {
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
		getActivities(retrievedUser).then(function(activities) {
			res.json(activities);
		}, function(err) {
			res.send(500, err);
		});
	}, function(err) {
		res.send(500, err);
	});
};

exports.getActivitiesOlder = function(req, res) {
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
	getActivities = function(user, skip, limit) {
		var deferred = Q.defer(),
			activityPopulateObj = [
				{ path: 'event' },
				{ path: 'comment' },
				{ path: 'actor' },
				{ path: 'recipient' }
			];

		Activity.find({ $or: [{recipient: user._id}, {actor: {$in: user.subscriptions}}, {event: {$in: user.attending}}], actor: { $ne: user._id} })
		.skip(skip)
		.limit(limit)
		.populate(activityPopulateObj)
		.exec(function(err, retrievedActivities) {
			if(err || !retrievedActivities) {
				deferred.reject(new Error("No events found."));
			}
			else {
				deferred.resolve(retrievedActivities);
			}
		});

		return deferred.promise;
	};

	getUser(req.params.userId).then(function(retrievedUser) {
		getActivities(retrievedUser, req.params.skip, req.params.limit).then(function(activities) {
			res.json(activities);
		}, function(err) {
			res.send(500, err);
		});
	}, function(err) {
		res.send(500, err);
	});
};