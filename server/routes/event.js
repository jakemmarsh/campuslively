var Q          = require('q'),
    User       = require('../models/user'),
    Activity   = require('../models/activity'),
    Event      = require('../models/event'),
    Comment    = require('../models/comment'),
    Invite     = require('../models/invite'),
    config   = require('../config'),
    fs       = require('fs'),
    AWS      = require('aws-sdk'),
    s3       = new AWS.S3();

AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret
});

var eventPopulateObj = [
        { path: 'location' },
        { path: 'creator' },
        { path: 'attending' },
        { path: 'invited' },
        { path: 'comments' },
        { path: 'school' }
    ],
    commentPopulateObj = [
        { path: 'creator' },
        { path: 'subComments.creator'}
    ];

exports.getCount = function(req, res) {
    var getCount = function() {
        var deferred = Q.defer();

        Event.count({}, function(err, count){
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(count);
            }
        });

        return deferred.promise;
    };

    getCount().then(function(count) {
        var dataToSend = {
            count: count
        };

        res.send(200, dataToSend);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getAllEvents = function(req, res) {
    var getEvents = function() {
        var deferred = Q.defer();

        Event.find({})
        .populate(eventPopulateObj)
        .exec(function(err, retrievedEvents) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvents);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents().then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEvent = function(req, res) {
    var getEvent = function(eventId) {
        var deferred = Q.defer();

        Event.findOne({ _id: eventId })
        .populate(eventPopulateObj)
        .exec(function(err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvent(req.params.eventId).then(function(retrievedEvent) {
        res.json(200, retrievedEvent);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsBySchool = function(req, res) {
    var getEvents = function(userId, schoolId) {
        var deferred = Q.defer(),
            today = new Date();

        var query = Event.find({
                        school: schoolId,
                        $or: [
                            { privacy: 'public' },
                            { invited: userId },
                            { attending: userId },
                            { creator: userId }
                        ],
                        startDate: { $gte: today }
                    })
                    .sort({ _id: -1 });

        if(req.params.limit) {
            query = query.limit(req.params.limit);
        }

        query.populate(eventPopulateObj)
        .exec(function (err, retrievedEvents) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvents);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.schoolId).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsBySchoolNewer = function(req, res) {
    var getEvents = function(userId, schoolId, newestId) {
        var deferred = Q.defer(),
            today = new Date();

        var query = Event.find({
                        school: schoolId,
                        _id: { $gt: newestId },
                        $or: [
                            { privacy: 'public' },
                            { invited: userId },
                            { attending: userId },
                            { creator: userId }
                        ],
                        startDate: { $gte: today }
                    });

        if(newestId) {
            query = query.where('_id').gt(newestId);
        }

        query.sort({ _id: -1 })
        .populate(eventPopulateObj)
        .exec(function (err, retrievedEvents) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvents);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.schoolId, req.params.newestId).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsBySchoolOlder = function(req, res) {
    var getEvents = function(userId, schoolId, oldestId, limit) {
        var deferred = Q.defer();

        Event.find({
            school: schoolId,
            _id: { $lt: oldestId },
            $or: [
                { privacy: 'public' },
                { invited: userId },
                { attending: userId },
                { creator: userId }
            ]
        })
        .sort({ _id: -1 })
        .limit(limit)
        .populate(eventPopulateObj)
        .exec(function (err, retrievedEvents) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvents);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.schoolId, req.params.oldestId, req.params.limit).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsBySchoolAndDay = function(req, res) {
    var getEvents = function(userId, schoolId, day) {
        var deferred = Q.defer(),
            floorDay = new Date(day),
            ceilingDay = new Date(day);

        // set floor to last second of previous day
        floorDay.setHours(0, 0, -1);
        // set ceiling to first second of next day
        ceilingDay.setHours(23, 59, 60);

        Event.find({
            school: schoolId,
            startDate: {
                $gt: floorDay,
                $lt: ceilingDay
            },
            $or: [
                { privacy: 'public' },
                { invited: userId },
                { attending: userId },
                { creator: userId }
            ]
        })
        .populate(eventPopulateObj)
        .exec(function (err, retrievedEvents) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvents);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.schoolId, req.params.date).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByLocationAndDay = function(req, res) {
    var getEvents = function(userId, lat, lng, day) {
        var deferred = Q.defer(),
            locationPoint = {
                    type: 'Point',
                    coordinates: [lat, lng]
            },
            floorDay = new Date(day),
            ceilingDay = new Date(day);

        // set floor and ceiling for querying events
        floorDay.setDate(floorDay.getDate() - 1);
        ceilingDay.setDate(ceilingDay.getDate() + 1);

        Event.find({
            sponsored: true,
            loc: { $near : locationPoint },
            startDate: {
                $gt: floorDay,
                $lt: ceilingDay
            },
            $or: [
                { privacy: 'public' },
                { invited: userId },
                { attending: userId },
                { creator: userId }
            ]
        })
        .populate(eventPopulateObj)
        .exec(function (err, retrievedEvents) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvents);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.lat, req.params.lng, req.params.date).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByUser = function(req, res) {
    var getEvents = function(userId, profileId) {
        var deferred = Q.defer(),
            today = new Date();

        var query = Event.find({
                        creator: profileId,
                        $or: [
                            { privacy: 'public' },
                            { invited: userId },
                            { attending: userId },
                            { creator: userId }
                        ],
                        startDate: { $gte: today }
                    })
                    .sort({ _id: -1 });

        if(req.params.limit) {
            query = query.limit(req.params.limit);
        }

        query.populate(eventPopulateObj)
        .exec(function (err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.profileId).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByUserNewer = function(req, res) {
    var getEvents = function(userId, profileId, newestId) {
        var deferred = Q.defer(),
            today = new Date();

        var query = Event.find({
                        creator: profileId,
                        $or: [
                            { privacy: 'public' },
                            { invited: userId },
                            { attending: userId },
                            { creator: userId }
                        ],
                        startDate: { $gte: today }
                    });

        if(newestId) {
            query = query.where('_id').gt(newestId);
        }

        query.sort({ _id: -1 })
        .populate(eventPopulateObj)
        .exec(function (err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.profileId, req.params.newestId).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByUserOlder = function(req, res) {
    var getEvents = function(userId, profileId, oldestId, limit) {
        var deferred = Q.defer(),
            today = new Date();

        Event.find({
            creator: profileId,
            _id: { $lt: oldestId },
            $or: [
                { privacy: 'public' },
                { invited: userId },
                { attending: userId },
                { creator: userId }
            ],
            startDate: { $gte: today }
        })
        .sort({ _id: -1 })
        .limit(limit)
        .populate(eventPopulateObj)
        .exec(function (err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.profileId, req.params.oldestId, req.params.limit).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByLocation = function(req, res) {
    var getEvents = function(userId, lat, lng) {
        var deferred = Q.defer(),
            today = new Date();

        var query = Event.find({
                        sponsored: true,
                        loc: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [lng, lat]
                                },
                                $maxDistance: 8047 // five miles
                            }
                        },
                        $or: [
                            { privacy: 'public' },
                            { invited: userId },
                            { attending: userId },
                            { creator: userId }
                        ],
                        startDate: { $gte: today }
                    })
                    .sort({ _id: -1 });

        if(req.params.limit) {
            query = query.limit(req.params.limit);
        }

        query.populate(eventPopulateObj)
        .exec(function(err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.lat, req.params.lng).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByLocationNewer = function(req, res) {
    var getEvents = function(userId, lat, lng, newestId) {
        var deferred = Q.defer(),
            locationPoint = {
                    type: 'Point',
                    coordinates: [lat, lng]
            },
            today = new Date();

        var query = Event.find({
                        sponsored: true,
                        loc: {
                            $near : locationPoint
                        },
                        $or: [
                            { privacy: 'public' },
                            { invited: userId },
                            { attending: userId },
                            { creator: userId }
                        ],
                        startDate: { $gte: today }
                    });

        if(newestId) {
            query = query.where('_id').gt(newestId);
        }

        query.sort({ _id: -1 })
        .populate(eventPopulateObj)
        .exec(function(err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.lat, req.params.lng, req.params.newestId).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.getEventsByLocationOlder = function(req, res) {
    var getEvents = function(userId, lat, lng, oldestId, limit) {
        var deferred = Q.defer(),
            locationPoint = {
                    type: 'Point',
                    coordinates: [lat, lng]
            },
            today = new Date();

        Event.find({
            sponsored: true,
            loc: { $near: locationPoint },
            _id: { $lt: oldestId },
            $or: [
                { privacy: 'public' },
                { invited: userId },
                { attending: userId },
                { creator: userId }
            ],
            startDate: { $gte: today }
        })
        .sort({ _id: -1 })
        .limit(limit)
        .populate(eventPopulateObj)
        .exec(function(err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(retrievedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    getEvents(req.session.user._id, req.params.lat, req.params.lng, req.params.oldestId, req.params.limit).then(function(retrievedEvents) {
        res.json(200, retrievedEvents);
    }, function(err) {
        res.send(500, err);
    });
};

exports.postEvent = function(req, res) {
    var postEvent = function(receivedEvent) {
        var deferred = Q.defer(),
            event = new Event(receivedEvent);

        // force non-admin users to be associated with their events
        if(!event.creator && req.session.user.admin === false) {
            event.creator = req.session.user._id;
        }

        event.save(function (err, savedEvent) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(savedEvent);
            }
        });

        return deferred.promise;
    },
    createActivity = function(createdEvent) {
        var deferred = Q.defer(),
            activity = new Activity({
                actor: createdEvent.creator,
                activity: 'posted',
                event: createdEvent._id,
                eventPrivacy: createdEvent.privacy,
                eventCreator: req.body.creator,
                eventStartDate: createdEvent.startDate
            });

        // only create activity if event wasn't posted anonymously
        if(createdEvent.creator) {
            activity.save(function (err, savedActivity) {
                if (err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve(savedActivity);
                }
            });
        }
        else {
            deferred.resolve();
        }

        return deferred.promise;
    };

    postEvent(req.body).then(function(returnedEvent) {
        createActivity(returnedEvent).then(function() {
            res.json(200, returnedEvent);
        }, function() {
            res.send(200, "Event posted but unable to create activity.");
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.uploadImage = function(req, res) {
    var postToS3 = function(image, eventId) {
        var s3bucket = new AWS.S3({params: {Bucket: config.aws.bucket}}),
            deferred = Q.defer(),
            getExtension = function(filename) {
                var i = filename.lastIndexOf('.');
                return (i < 0) ? '' : filename.substr(i);
            },
            dataToPost = {
                Bucket: config.aws.bucket,
                Key: 'event_imgs/' + eventId + getExtension(image.name),
                ACL: 'public-read',
                ContentType: image.type
            };

        fs.readFile(image.path, function(err, readFile) {
            dataToPost.Body = readFile;

            s3bucket.putObject(dataToPost, function(err, data) {
                if (err) {
                  deferred.reject(err.message);
                }
                else {
                  deferred.resolve(data);
                }
            });
        });

        return deferred.promise;
    };

    postToS3(req.files.image, req.params.eventId).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.updateEvent = function(req, res) {
    var findEvent = function(eventId) {
        var deferred = Q.defer();

        Event.findOne({ _id: eventId })
        .populate(eventPopulateObj)
        .exec(function(err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(retrievedEvent);
            }
        });

        return deferred.promise;
    },
    deleteImage = function(imageUrl) {
        var deferred = Q.defer(),
            s3bucket = new AWS.S3({params: {Bucket: config.aws.bucket}}),
            dataToPost = {
                Bucket: config.aws.bucket,
                Key: imageUrl.substring(38)
            };

        s3bucket.deleteObject(dataToPost, function(err, data) {
            if (err) {
                // resolve even with an error to prevent blocking
                deferred.resolve();
            }
            else {
                deferred.resolve(data);
            }
        });

        return deferred.promise;
    },
    getUpdateParams = function() {
        var updateParams = {};

        // loop through posted properties
        for (var key in req.body) {
            // make sure it isn't inherited
            if (req.body.hasOwnProperty(key)) {
                // make sure not changing event ID or creator
                if(key !== '_id' && key !== 'creator') {
                    updateParams[key] = req.body[key];
                }

                // extract school ID from school object
                if(key === 'school') {
                    updateParams[key] = req.body[key]['_id'];
                }

                // extract IDs from attending, invited, or comments
                if(key === 'attending' || key === 'invited' || key === 'comments') {
                    var idArray = [];
                    for (var i = 0; i < req.body[key].length; i++) {
                        idArray.push(req.body[key][i]['_id']);
                    }
                    updateParams[key] = idArray;
                }

                // if deleting the event's image, retrieve the event to get the URL and delete from S3
                if(key === 'pictureUrl' && req.body[key] === null) {
                    findEvent(req.params.eventId).then(function(data) {
                        if(data.pictureUrl) {
                            deleteImage(data.pictureUrl);
                        }
                    });
                }
            }
        }

        return updateParams;
    },
    updateEvent = function(eventId, updateParams) {
        var deferred = Q.defer();

        Event.findOneAndUpdate({ _id: eventId }, updateParams)
        .populate(eventPopulateObj)
        .exec(function(err, updatedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(updatedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(updatedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    };

    updateEvent(req.params.eventId, getUpdateParams()).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.addGoogleEventId = function(req, res) {
    var addId = function(eventId, username, googleEventId) {
        var deferred = Q.defer();

        Event.findOne({ _id: eventId }, function(err, event) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                event.googleCalendarIds[username] = googleEventId;
                event.markModified('googleCalendarIds');
                event.save(function(err, savedEvent) {
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        // find document again to allow for populating
                        Event.findOne({ _id: eventId })
                        .populate(eventPopulateObj)
                        .exec(function(err, retrievedEvent) {
                            if(err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(retrievedEvent);
                            }
                        });
                    }
                });
            }
        });

        return deferred.promise;
    };

    addId(req.params.eventId, req.params.username, req.params.googleEventId).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    });
};

exports.removeGoogleEventId = function(req, res) {
    var removeId = function(eventId, username) {
        var deferred = Q.defer();

        Event.findOne({ _id: eventId }, function(err, event) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                delete event.googleCalendarIds[username];
                event.markModified('googleCalendarIds');
                event.save(function(err, savedEvent) {
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        // find document again to allow for populating
                        Event.findOne({ _id: eventId })
                        .populate(eventPopulateObj)
                        .exec(function(err, retrievedEvent) {
                            if(err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(retrievedEvent);
                            }
                        });
                    }
                });
            }
        });

        return deferred.promise;
    };

    removeId(req.params.eventId, req.params.username).then(function(data) {
        res.json(200, data);
    }, function(err) {
        res.send(500, err);
    })
};

exports.rsvp = function(req, res) {
    var updateUser = function(userId, eventId) {
        var deferred = Q.defer();

        User.findOneAndUpdate({ _id: userId }, { $addToSet: { attending: eventId } })
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
    updateEvent = function(eventId, userId) {
        var deferred = Q.defer();

        Event.findOneAndUpdate({ _id: eventId }, { $addToSet: { attending: userId } })
        .populate(eventPopulateObj)
        .exec(function(err, updatedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(updatedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(updatedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    },
    createActivity = function(event, userId) {
        var deferred = Q.defer(),
            activity = new Activity({
                actor: userId,
                event: event._id,
                eventPrivacy: event.privacy,
                eventCreator: event.creator,
                eventStartDate: event.startDate,
                activity: 'rsvpd'
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

    updateUser(req.params.userId, req.params.eventId).then(function() {
        updateEvent(req.params.eventId, req.params.userId).then(function(updatedEvent) {
            createActivity(updatedEvent, req.params.userId).then(function() {
                res.json(200, updatedEvent);
            }, function() {
                res.json(200, updatedEvent);
            });
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.unRsvp = function(req, res) {
    var updateUser = function(userId, eventId) {
        var deferred = Q.defer();

        User.findOneAndUpdate({ _id: userId }, { $pull: { attending: eventId } })
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
    updateEvent = function(eventId, userId) {
        var deferred = Q.defer(),
            eventPopulateObj = [
                { path: 'location' },
                { path: 'creator' },
                { path: 'attending' },
                { path: 'invited' },
                { path: 'comments' },
                { path: 'school' }
            ],
            commentPopulateObj = [
                { path: 'creator' },
                { path: 'subComments.creator'}
            ];

        Event.findOneAndUpdate({ _id: eventId }, { $pull: { attending: userId } })
        .populate(eventPopulateObj)
        .exec(function(err, updatedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                Comment.populate(updatedEvent.comments, commentPopulateObj, function(err){
                    if(err) {
                        deferred.reject(err.message);
                    }
                    else {
                        deferred.resolve(updatedEvent);
                    }
                });
            }
        });

        return deferred.promise;
    },
    deleteActivity = function(eventId, userId) {
        var deferred = Q.defer();

        Activity.remove({
            event: eventId,
            actor: userId,
            activity: 'rsvpd'
        }, function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    updateUser(req.params.userId, req.params.eventId).then(function() {
        updateEvent(req.params.eventId, req.params.userId).then(function(updatedEvent) {
            deleteActivity(req.params.eventId, req.params.userId).then(function() {
                res.json(200, updatedEvent);
            }, function() {
                res.json(200, updatedEvent);
            });
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.deleteEvent = function(req, res) {
    var getEvent = function(eventId) {
        var deferred = Q.defer();

        Event.findOne({ _id: eventId }, function(err, retrievedEvent) {
            if(err) {
                // resolve even with an error to prevent blocking
                deferred.resolve();
            }
            else {
                deferred.resolve(retrievedEvent);
            }
        });

        return deferred.promise;
    },
    deleteEvent = function(eventId) {
        var deferred = Q.defer();

        // allow admin to delete any event
        if(req.session.user.admin === true) {
            Event.remove({ _id: eventId }, function(err) {
                if(err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve();
                }
            });
        }
        // otherwise make sure user is deleting their own event
        else {
            Event.remove({ _id: eventId, creator: req.session.user._id }, function(err) {
                if(err) {
                    deferred.reject(err.message);
                }
                else {
                    deferred.resolve();
                }
            });
        }

        return deferred.promise;
    },
    deleteImage = function(event) {
        var deferred = Q.defer(),
            s3bucket = new AWS.S3({params: {Bucket: config.aws.bucket}});

        if(event.pictureUrl) {
            var dataToPost = {
                Bucket: config.aws.bucket,
                Key: event.pictureUrl.substring(38)
            };

            s3bucket.deleteObject(dataToPost, function(err, data) {
                if (err) {
                    // resolve even with an error to prevent blocking
                    deferred.resolve();
                }
                else {
                    deferred.resolve(data);
                }
            });
        }
        else {
            deferred.resolve();
        }

        return deferred.promise;
    },
    deleteComments = function(eventId) {
        var deferred = Q.defer();

        Comment.remove({ eventId: eventId }, function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    deleteActivities = function(eventId) {
        var deferred = Q.defer();

        Activity.remove({ event: eventId }, function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    deleteInvites = function(eventId) {
        var deferred = Q.defer();

        Invite.remove({
            event: eventId
        }, function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    },
    removeEventFromUsers = function(eventId) {
        var deferred = Q.defer();

        User.update({}, {
            $pull: {
                attending: eventId,
                invites: eventId
            }
        }, function(err) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    getEvent(req.params.eventId).then(function(retrievedEvent) {
        deleteEvent(req.params.eventId).then(function() {
            deleteImage(retrievedEvent).then(function() {
                deleteComments(req.params.eventId).then(function() {
                    deleteActivities(req.params.eventId).then(function() {
                        deleteInvites(req.params.eventId).then(function() {
                            removeEventFromUsers(req.params.eventId).then(function() {
                                res.send(200, "Event and all related items deleted successfully.");
                            }, function() {
                                res.send(200, "Event deleted but failed to remove users from attending.");
                            });
                        }, function() {
                            res.send(200, "Event deleted but failed to find invitations.");
                        });
                    }, function() {
                        res.send(200, "Event deleted but failed to delete activities.");
                    });
                }, function() {
                    res.send(200, "Event deleted but failed to delete comments.");
                });
            }, function (err) {
                res.send(500, err);
            });
        }, function(err) {
            res.send(500, err);
        });
    }, function(err) {
        res.send(500, err);
    });
};

exports.inviteUsers = function(req, res) {
    var updateAndGetEvent = function(eventId, recipientIds) {
        var deferred = Q.defer();

        Event.findOneAndUpdate({ _id: eventId }, { $addToSet: { invited: { $each: recipientIds } } })
        .select('creator privacy')
        .exec(function(err, retrievedEvent) {
            if(err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(retrievedEvent);
            }
        });

        return deferred.promise;
    },
    createInvites = function(eventId, senderId, recipientIds) {
        var deferred = Q.defer(),
            invites = [],
            createdInvites = [];

        for(var i = 0; i < recipientIds.length; i++) {
            var invite = {
                sender: senderId,
                recipient: recipientIds[i],
                event: eventId
            };

            invites.push(invite);
        }

        Invite.create(invites, function (err) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                for (var i = 1; i < arguments.length; ++i) {
                    createdInvites.push(arguments[i]);
                }
                deferred.resolve(createdInvites);
            }
        });

        return deferred.promise;
    },
    updateUsers = function(recipientIds, eventId) {
        var deferred = Q.defer();

        // update each user that has been invited to the event
        for(var i = 0; i < recipientIds.length; i++) {
            (function(i) {
                User.findOneAndUpdate({ _id: recipientIds[i] }, { $addToSet: { invites: eventId } })
                .exec(function(err) {
                    if(err) {
                        deferred.reject(err.message);
                    }
                });
            })(i);
        }
        deferred.resolve();

        return deferred.promise;
    },
    createActivities = function(createdInvites, retrievedEvent) {
        var deferred = Q.defer(),
            activities = [],
            createdActivities = [];

        for(var i = 0; i < createdInvites.length; i++) {
            var activity = {
                actor: createdInvites[i].sender,
                recipient: createdInvites[i].recipient,
                activity: 'invited',
                event: createdInvites[i].event,
                eventPrivacy: retrievedEvent.privacy,
                eventCreator: retrievedEvent.creator,
                eventStartDate: retrievedEvent.startDate
            };

            activities.push(activity);
        }

        Activity.create(activities, function (err) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                for (var i = 1; i < arguments.length; ++i) {
                    createdActivities.push(arguments[i]);
                }
                deferred.resolve(createdActivities);
            }
        });

        return deferred.promise;
    };

    createInvites(req.params.eventId, req.params.senderId, req.body.recipientIds).then(function(createdInvites) {
        updateAndGetEvent(req.params.eventId, req.body.recipientIds).then(function(retrievedEvent) {
            updateUsers(req.body.recipientIds, req.params.eventId).then(function() {
                createActivities(createdInvites, retrievedEvent).then(function() {
                    res.send(200, "Invites and activities all successfully created.");
                }, function() {
                    res.send(200, "Invites created but failed to create activities.");
                });
            }, function() {
                res.send(200, "Invites created but failed to update users.");
            });
        }, function() {
            res.send(200, "Invites created but failed to retrieve event or create activities.");
        });
    }, function(err) {
        res.send(500, err);
    });
};