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

    if (3 === arguments.length) {
        fn(null, crypto.pbkdf2Sync(pwd, salt, iterations, len));
    } else {
        fn = salt;
        salt = crypto.randomBytes(len).toString('base64');
        fn(null, salt, crypto.pbkdf2Sync(pwd, salt, iterations, len).toString('hex'));
    }
}

exports.getAllUsers = function(req, res) {
    var getUsers = function() {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' },
                { path: 'attending' },
                { path: 'school' }
            ];

        User.find({})
        .populate(populateObj)
        .exec(function (err, retrievedUsers) {
            if (err || !retrievedUsers) {
                deferred.reject(new Error("No user exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedUsers);
            }
        });

        return deferred.promise;
    };

    getUsers().then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getUsersForInvite = function(req, res) {
    var getEvent = function(eventId) {
        var deferred = Q.defer();

        Event.findOne({
            _id: eventId
        })
        .exec(function (err, retrievedEvent) {
            if (err || !retrievedEvent) {
                deferred.reject(new Error("No event exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedEvent);
            }
        });

        return deferred.promise;
    },
    getUsers = function(userId, event) {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' },
                { path: 'attending' },
                { path: 'school' }
            ];

        User.find({
            attending: { $ne: event._id },
            invites: { $ne: event._id },
            subscriptions: userId,
            $and: [
                {
                    _id: {
                        $ne: userId
                    }
                },
                {
                    _id: {
                        $ne: event.creator
                    }
                }
            ]
        })
        .populate(populateObj)
        .exec(function (err, retrievedUsers) {
            if (err || !retrievedUsers) {
                deferred.reject(new Error("No user exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedUsers);
            }
        });

        return deferred.promise;
    };

    getEvent(req.params.eventId).then(function(retrievedEvent) {
        getUsers(req.params.userId, retrievedEvent).then(function(data) {
            res.json(200, data);
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.searchForUsers = function(req, res) {
    var getUsers = function(params) {
        var deferred = Q.defer();

        return deferred.promise;
    };

    // queryString is pulled from /api/v1/user/search?query=X
    getUsers(req.query.query).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getUser = function(req, res) {
    var getUser = function(userId) {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' },
                { path: 'attending' },
                { path: 'school' }
            ];

        User.findOne({
            _id: req.params.userId
        })
        .populate(populateObj)
        .exec(function (err, retrievedUser) {
            if (err || !retrievedUser) {
                deferred.reject(new Error("No user exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    };

    getUser(req.params.username).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getSubscribers = function(req, res) {
    var getUsers = function(userId) {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' },
                { path: 'attending' },
                { path: 'school' }
            ];

        User.find({
            subscriptions: userId
        })
        .populate(populateObj)
        .exec(function(err, retrievedUsers) {
            if (err || !retrievedUsers) {
                deferred.reject(new Error("No users exist subscribed to specified ID."));
            }
            else {
                deferred.resolve(retrievedUsers);
            }
        });

        return deferred.promise;
    };

    getUsers(req.params.userId).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getUserByName = function(req, res) {
    var getUser = function(username) {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' },
                { path: 'attending' },
                { path: 'school' }
            ];

        User.findOne({
            username: username.toLowerCase()
        })
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

    getUser(req.params.username).then(function(data) {
        res.json(200, data);
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

                if(key === 'password') {
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

                // extract IDs from attending, invited, or comments
                if(key === 'attending' || key === 'subscriptions' || key === 'invites') {
                    var idArray = [];
                    for (var i = 0; i < req.body[key].length; i++) {
                        idArray.push(req.body[key][i]['_id']);
                    }
                    updateParams[key] = idArray;
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
            var newUser = {
                _id: data._id,
                admin: data.admin
            };
            // Store the user's ID and admin status
            // in the session store to be retrieved
            req.session.user = newUser;

            res.json(200, data);
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
    });
};

exports.subscribe = function(req, res) {
    if(req.params.subscribeId === req.params.userId) {
        res.send(400, "Cannot subscribe user to themselves.");
        return;
    }

    var findSubscription = function(userId) {
        var deferred = Q.defer();

        User.findOne({
            _id: userId
        })
        .exec(function (err, retrievedUser) {
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
                    var newUser = {
                        admin: updatedUser.admin,
                        _id: updatedUser._id
                    };
                    // Store the user's ID and admin status
                    // in the session store to be retrieved
                    req.session.user = newUser;

                    res.json(200, updatedUser);
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

        Activity.remove({
            actor: userId,
            recipient: subscriptionId,
            activity: 'subscribed'
        })
        .exec(function(err) {
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
                var newUser = {
                    admin: updatedUser.admin,
                    _id: updatedUser._id
                };

                // Store the user's ID and admin status
                // in the session store to be retrieved
                req.session.user = newUser;

                res.json(200, updatedUser);
            });
        }, function(err) {
            req.session.regenerate(function(){
                req.session.user = updatedUser;

                res.json(200, updatedUser);
            });
        });
    }, function(err) {
        res.send(500, "Failed to remove user subscription.");
    });
};

exports.getActivities = function(req, res) {
    var getUser = function(userId) {
        var deferred = Q.defer();

        User.findOne({
            _id: userId
        })
        .exec(function (err, retrievedUser) {
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
                { path: 'event.creator' },
                { path: 'comment' },
                { path: 'actor' },
                { path: 'recipient' }
            ],
            userPopulateObj = [
                { path: 'event.creator', model: User },
                { path: 'comment.creator', model: User }
            ],
            today = new Date();

        var query = Activity.find({
                        $and: [
                            {$or: [
                                {eventStartDate: {$exists: false}},
                                {eventStartDate: {$gte: today}}
                            ]},
                            {$or: [
                                {recipient: user._id},
                                {eventCreator: user._id},
                                {
                                    actor: {$in: user.subscriptions},
                                    $or: [
                                        {eventPrivacy: 'public'},
                                        {event: {$in: user.attending}},
                                        {event: {$in: user.invites}}
                                    ]
                                },
                                {event: {$in: user.attending}}
                            ]}
                        ],
                        actor: { $ne: user._id }
                    })
                    .sort({ _id: -1 });

        if(req.params.limit) {
            query = query.limit(req.params.limit);
        }

        query.populate(activityPopulateObj)
        .exec(function(err, retrievedActivities) {
            if(err || !retrievedActivities) {
                deferred.reject(new Error("No events found."));
            }
            else {
                User.populate(retrievedActivities, userPopulateObj, function(err, data){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedActivities);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getUser(req.params.userId).then(function(retrievedUser) {
        getActivities(retrievedUser).then(function(activities) {
            res.json(200, activities);
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.getActivitiesNewer = function(req, res) {
    var getUser = function(userId) {
        var deferred = Q.defer();

        User.findOne({
            _id: userId
        })
        .exec(function (err, retrievedUser) {
            if (err || !retrievedUser) {
                deferred.reject(new Error("No user exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    }
    getActivities = function(user, newestId) {
        var deferred = Q.defer(),
            activityPopulateObj = [
                { path: 'event' },
                { path: 'comment' },
                { path: 'actor' },
                { path: 'recipient' }
            ],
            userPopulateObj = [
                { path: 'event.creator', model: User },
                { path: 'comment.creator', model: User }
            ],
            today = new Date();

        var query = Activity.find({
                        $and: [
                            {$or: [
                                {eventStartDate: {$exists: false}},
                                {eventStartDate: {$gte: today}}
                            ]},
                            {$or: [
                                {recipient: user._id},
                                {eventCreator: user._id},
                                {
                                    actor: {$in: user.subscriptions},
                                    $or: [
                                        {eventPrivacy: 'public'},
                                        {event: {$in: user.attending}},
                                        {event: {$in: user.invites}}
                                    ]
                                },
                                {event: {$in: user.attending}}
                            ]}
                        ],
                        actor: { $ne: user._id }
                    });

        if(newestId) {
            query = query.where('_id').gt(newestId);
        }

        query.sort({ _id: -1 })
        .populate(activityPopulateObj)
        .exec(function(err, retrievedActivities) {
            if(err || !retrievedActivities) {
                deferred.reject(new Error("No events found."));
            }
            else {
                User.populate(retrievedActivities, userPopulateObj, function(err, data){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedActivities);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getUser(req.params.userId).then(function(retrievedUser) {
        getActivities(retrievedUser, req.params.newestId).then(function(activities) {
            res.json(200, activities);
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

        User.findOne({
            _id: userId
        })
        .exec(function (err, retrievedUser) {
            if (err || !retrievedUser) {
                deferred.reject(new Error("No user exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    }
    getActivities = function(user, oldestId, limit) {
        var deferred = Q.defer(),
            activityPopulateObj = [
                { path: 'event' },
                { path: 'comment' },
                { path: 'actor' },
                { path: 'recipient' }
            ],
            userPopulateObj = [
                { path: 'event.creator', model: User },
                { path: 'comment.creator', model: User }
            ],
            today = new Date();

        Activity.find({
            $and: [
                {$or: [
                    {eventStartDate: {$exists: false}},
                    {eventStartDate: {$gte: today}}
                ]},
                {$or: [
                    {recipient: user._id},
                    {eventCreator: user._id},
                    {
                        actor: {$in: user.subscriptions},
                        $or: [
                            {eventPrivacy: 'public'},
                            {event: {$in: user.attending}},
                            {event: {$in: user.invites}}
                        ]
                    },
                    {event: {$in: user.attending}}
                ]}
            ],
            actor: { $ne: user._id },
            _id: { $lt: oldestId }
        })
        .sort({ _id: -1 })
        .limit(limit)
        .populate(activityPopulateObj)
        .exec(function(err, retrievedActivities) {
            if(err || !retrievedActivities) {
                deferred.reject(new Error("No events found."));
            }
            else {
                User.populate(retrievedActivities, userPopulateObj, function(err, data){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedActivities);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getUser(req.params.userId).then(function(retrievedUser) {
        getActivities(retrievedUser, req.params.oldestId, req.params.limit).then(function(activities) {
            res.json(200, activities);
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.addFacebookSubscriptions = function(req, res) {
    var findUser = function(userId) {
        var deferred = Q.defer();

        User.findOne({ _id: userId })
        .select('facebook.subscriptions')
        .exec(function (err, retrievedUser) {
            if (err || !retrievedUser) {
                deferred.reject(new Error("No user exists with specified ID."));
            }
            else {
                deferred.resolve(retrievedUser);
            }
        });

        return deferred.promise;
    },
    findSubscriptions = function(fbIds) {
        var deferred = Q.defer();

        User.find({
            $or: [
                { 'facebook.id': {
                        $in: fbIds
                    }
                },
                { 'facebook.managedPages.id': {
                        $in: fbIds
                   }
                }
            ]
        })
        .select('_id')
        .exec(function (err, retrievedUsers) {
            if (err || !retrievedUsers) {
                deferred.reject(new Error("No users exist associated with any of the Facebook IDs."));
            }
            else {
                deferred.resolve(retrievedUsers);
            }
        });

        return deferred.promise;
    },
    updateUser = function(userId, newSubscriptions) {
        var deferred = Q.defer(),
            populateObj = [
                { path: 'subscriptions' },
                { path: 'postedEvents' },
                { path: 'attending' },
                { path: 'school' }
            ];

        User.findOneAndUpdate({ _id: userId }, { $addToSet: { subscriptions: { $each: newSubscriptions } }, $set: { 'facebook.lastUpdated': new Date().toISOString() } })
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

    findUser(req.params.userId).then(function(retrievedUser) {
        findSubscriptions(retrievedUser.facebook.subscriptions).then(function(retrievedUsers) {
            updateUser(req.params.userId, retrievedUsers).then(function(updatedUser) {
                res.json(200, updatedUser);
            }, function(err) {
                res.send(500, err);
            });
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.deleteUser = function(req, res) {
    var removeSubscriptions = function(userId) {
        var deferred = Q.defer();

        User.update({}, { $pull: { 'subscriptions': userId } }, { multi: true })
        .exec(function (err, numberAffected) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(numberAffected);
            }
        });

        return deferred.promise;
    },
    removeFromEvents = function(userId) {
        var deferred = Q.defer();

        Event.update({}, { $pull: { 'attending': userId, 'invited': userId } }, { multi: true })
        .exec(function (err, numberAffected) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(numberAffected);
            }
        });

        return deferred.promise;
    },
    removeActivities = function(userId) {
        var deferred = Q.defer();

        Activity.remove({
            $or: [
                { actor: userId },
                { recipient: userId }
            ]
        })
        .exec(function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    deleteUser = function(userId) {
        var deferred = Q.defer();

        User.remove({ _id: userId })
        .exec(function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    // only allow users to delete their own account
    if(req.session.user._id === req.params.userId) {
        removeSubscriptions(req.params.userId).then(function() {
            removeFromEvents(req.params.userId).then(function() {
                removeActivities(req.params.userId).then(function() {
                    deleteUser(req.params.userId).then(function() {
                        res.send(200, "User and related items deleted successfully.");
                    }, function(err) {
                        res.send(500, err);
                    });
                }, function(err) {
                    res.send(500, err);
                });
            }, function(err) {
                res.send(500, err);
            });
        }, function(err) {
            res.send(500, err);
        });
    }
    else {
        res.send(403, "You do not have permission to delete other users' accounts.");
    }
};