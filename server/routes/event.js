var Q          = require('q'),
	crypto     = require('crypto'),
    User       = require('../models/user'),
    School     = require('../models/school'),
    Activity   = require('../models/activity'),
    Event	   = require('../models/event'),
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

exports.getCount = function(req, res) {
	var getCount = function() {
		var deferred = Q.defer();

		Event.count({}, function(err, count){
		    if(err) {
				deferred.reject(err);
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

exports.getEvent = function(req, res) {
	var getEvent = function(eventId) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.findOne({ _id: eventId })
		.populate(eventPopulateObj)
		.exec(function(err, updatedEvent) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(updatedEvent.comments, commentPopulateObj, function(err, data){
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

	getEvent(req.params.eventId).then(function(retrievedEvent) {
		res.json(200, retrievedEvent);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsBySchool = function(req, res) {
	var getEvents = function(userId, schoolId) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		if(req.params.limit) {
			Event.find({ school: schoolId, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
			.sort({ _id: -1 })
			.limit(req.params.limit)
			.populate(eventPopulateObj)
			.exec(function (err, retrievedEvents) {
		        if(err) {
	         		deferred.reject(err.message);
	         	}
	         	else {
					Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err, data){
						if(err) {
							deferred.reject(err.message);
						}
						else {
							deferred.resolve(retrievedEvents);
						}
					});
	         	}
		    });
		}
		else {
			Event.find({ school: schoolId, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
			.sort({ _id: -1 })
			.populate(eventPopulateObj)
			.exec(function (err, retrievedEvents) {
		        if(err) {
	         		deferred.reject(err.message);
	         	}
	         	else {
					Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err, data){
						if(err) {
							deferred.reject(err.message);
						}
						else {
							deferred.resolve(retrievedEvents);
						}
					});
	         	}
		    });
		}

		return deferred.promise;
	};

	getEvents(req.params.userId, req.params.schoolId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsBySchoolNewer = function(req, res) {
	var getEvents = function(userId, schoolId, newestId) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.find({ school: schoolId, _id: { $gt: newestId }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.sort({ _id: -1 })
		.populate(eventPopulateObj)
		.exec(function (err, retrievedEvents) {
	        if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.schoolId, req.params.newestId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsBySchoolOlder = function(req, res) {
	var getEvents = function(userId, schoolId, oldestId, limit) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.find({ school: schoolId, _id: { $lt: oldestId }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.sort({ _id: -1 })
		.limit(limit)	
		.populate(eventPopulateObj)
		.exec(function (err, retrievedEvents) {
	        if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.schoolId, req.params.oldestId, req.params.limit).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsBySchoolAndDay = function(req, res) {
	var getEvents = function(userId, schoolId, day) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			],
			floorDay = new Date(day),
			ceilingDay = new Date(day);

		// set floor and ceiling for querying events
		floorDay.setDate(floorDay.getDate() - 1);
		ceilingDay.setDate(ceilingDay.getDate() + 1);

		Event.find({ school: schoolId, startDate: { $gt: floorDay, $lt: ceilingDay }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.populate(eventPopulateObj)
		.exec(function (err, retrievedEvents) {
	        if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.schoolId, req.params.date).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByLocationAndDay = function(req, res) {
	var getEvents = function(userId, lat, lng, day) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			],
			locationPoint = {
					type: 'Point',
					coordinates: [lat, lng]
			},
			floorDay = new Date(day),
			ceilingDay = new Date(day);

		// set floor and ceiling for querying events
		floorDay.setDate(floorDay.getDate() - 1);
		ceilingDay.setDate(ceilingDay.getDate() + 1);

		Event.find({ loc : { $near : locationPoint }, startDate: { $gt: floorDay, $lt: ceilingDay }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.populate(eventPopulateObj)
		.exec(function (err, retrievedEvents) {
	        if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvents.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.lat, req.params.lng, req.params.date).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByUser = function(req, res) {
	var getEvents = function(userId, profileId) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		if(req.params.limit) {
			Event.find({ creator: profileId, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
			.sort({ _id: -1 })
			.limit(req.params.limit)
			.populate(eventPopulateObj)
			.exec(function (err, retrievedEvent) {
		        if(err) {
	         		deferred.reject(err.message);
	         	}
	         	else {
					Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
						if(err) {
							deferred.reject(err.message);
						}
						else {
							deferred.resolve(retrievedEvent);
						}
					});
	         	}
		    });
		}
		else {
			Event.find({ creator: profileId, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
			.sort({ _id: -1 })
			.populate(eventPopulateObj)
			.exec(function (err, retrievedEvent) {
		        if(err) {
	         		deferred.reject(err.message);
	         	}
	         	else {
					Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
						if(err) {
							deferred.reject(err.message);
						}
						else {
							deferred.resolve(retrievedEvent);
						}
					});
	         	}
		    });
		}

		return deferred.promise;
	};

	getEvents(req.params.userId, req.params.profileId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByUserNewer = function(req, res) {
	var getEvents = function(userId, profileId, newestId) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.find({ creator: profileId, _id: { $gt: newestId }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.sort({ _id: -1 })
		.populate(eventPopulateObj)
		.exec(function (err, retrievedEvent) {
	        if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.profileId, req.params.newestId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByUserOlder = function(req, res) {
	var getEvents = function(userId, profileId, oldestId, limit) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.find({ creator: profileId, _id: { $lt: oldestId }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.sort({ _id: -1 })
		.limit(limit)
		.populate(eventPopulateObj)
		.exec(function (err, retrievedEvent) {
	        if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.profileId, req.params.oldestId, req.params.limit).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByLocation = function(req, res) {
	var getEvents = function(userId, lat, lng) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			],
			locationPoint = {
					type: 'Point',
					coordinates: [lat, lng]
			};

		if(req.params.limit) {
			Event.find({ loc : { $near : locationPoint }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
			.sort({ _id: -1 })
			.limit(req.params.limit)
			.populate(eventPopulateObj)
			.exec(function(err, retrievedEvent) {
				if(err) {
	         		deferred.reject(err.message);
	         	}
	         	else {
					Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
						if(err) {
							deferred.reject(err.message);
						}
						else {
							deferred.resolve(retrievedEvent);
						}
					});
	         	}
	        });
	    }
	    else {
			Event.find({ loc : { $near : locationPoint }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
			.sort({ _id: -1 })
			.populate(eventPopulateObj)
			.exec(function(err, retrievedEvent) {
				if(err) {
	         		deferred.reject(err.message);
	         	}
	         	else {
					Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
						if(err) {
							deferred.reject(err.message);
						}
						else {
							deferred.resolve(retrievedEvent);
						}
					});
	         	}
	        });
	    }

		return deferred.promise;
	};

	getEvents(req.params.userId, req.params.lat, req.params.lng).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByLocationNewer = function(req, res) {
	var getEvents = function(userId, lat, lng, newestId) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			],
			locationPoint = {
					type: 'Point',
					coordinates: [lat, lng]
			};

		Event.find({ loc: { $near : locationPoint }, _id: { $gt: newestId }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.sort({ _id: -1 })
		.populate(eventPopulateObj)
		.exec(function(err, retrievedEvent) {
			if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.lat, req.params.lng, req.params.newestId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
}

exports.getEventsByLocationOlder = function(req, res) {
	var getEvents = function(userId, lat, lng, oldestId, limit) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			],
			locationPoint = {
					type: 'Point',
					coordinates: [lat, lng]
			};

		Event.find({ loc: { $near : locationPoint }, _id: { $lt: oldestId }, $or: [{ privacy: 'public' }, { invited: userId }, { attending: userId }, { creator: userId }] })
		.sort({ _id: -1 })
		.limit(limit)
		.populate(eventPopulateObj)
		.exec(function(err, retrievedEvent) {
			if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(retrievedEvent.comments, commentPopulateObj, function(err, data){
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

	getEvents(req.params.userId, req.params.lat, req.params.lng, req.params.oldestId, req.params.limit).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.postEvent = function(req, res) {
	var postEvent = function(receivedEvent) {
		var deferred = Q.defer(),
			event = new Event(receivedEvent);

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
				event: createdEvent._id
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

	postEvent(req.body).then(function(returnedEvent) {
		createActivity(returnedEvent).then(function(returnedActivity) {
			res.json(200, returnedEvent);
		}, function(err) {
			res.send(200, "Event posted but unable to create activity.");
		});
	}, function(err) {
		res.send(500, err);
	});
};

exports.uploadImage = function(req, res) {
	postToS3 = function(image, eventId) {
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
				} else {
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
	var getUpdateParams = function() {
		var updateParams = {};

		// loop through posted properties
		for (var key in req.body) {
			// make sure it isn't inherited
			if (req.body.hasOwnProperty(key)) {
				// make sure not changing user ID
				if(key !== '_id') {
					updateParams[key] = req.body[key];
				}
			}
		}

		return updateParams;
	},
	updateEvent = function(eventId, updateParams) {
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.findOneAndUpdate({ _id: eventId }, updateParams)
		.populate(eventPopulateObj)
		.exec(function(err, updatedEvent) {
			if(err) {
         		deferred.reject(err.message);
         	}
         	else {
         		Comment.populate(updatedEvent.comments, commentPopulateObj, function(err, data){
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
		var deferred = Q.defer(),
			eventPopulateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' },
                { path: 'school' }
			],
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Event.findOneAndUpdate({ _id: eventId }, { $addToSet: { attending: userId } })
		.populate(eventPopulateObj)
		.exec(function(err, updatedEvent) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				Comment.populate(updatedEvent.comments, commentPopulateObj, function(err, data){
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
	createActivity = function(eventId, userId) {
		var deferred = Q.defer(),
			activity = new Activity({
				actor: userId,
				event: eventId,
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

	updateUser(req.params.userId, req.params.eventId).then(function(updatedUser) {
		updateEvent(req.params.eventId, req.params.userId).then(function(updatedEvent) {
			createActivity(req.params.eventId, req.params.userId).then(function(savedActivity) {
				res.json(200, updatedEvent);
			}, function(err) {
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
         		Comment.populate(updatedEvent.comments, commentPopulateObj, function(err, data){
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

		Activity.remove({ event: eventId, actor: userId, activity: 'rsvpd' }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	updateUser(req.params.userId, req.params.eventId).then(function(updatedUser) {
		updateEvent(req.params.eventId, req.params.userId).then(function(updatedEvent) {
			deleteActivity(req.params.eventId, req.params.userId).then(function() {
				res.json(200, updatedEvent);
			}, function(err) {
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
	var deleteEvent = function(eventId) {
		var deferred = Q.defer();

		Event.remove({ _id: eventId }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

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
	findInvites = function(eventId) {
		var deferred = Q.defer();

		Invite.find({ event: eventId })
		.exec(function(err, retrievedInvites) {
			if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(retrievedInvites);
         	}
        });

		return deferred.promise;
	},
	removeInvitesFromUsers = function(invites) {
		var deferred = Q.defer(),
			inviteIds = [];

		for(var i = 0; i < invites.length; i++) {
			inviteIds.push(invites[i]._id);
		}

		User.update({}, { $pull: { invites: { $in: inviteIds} } }, function(err) {
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

		Invite.remove({ event: eventId }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	},
	removeAttendingFromUsers = function(eventId) {
		var deferred = Q.defer();

		User.update({}, { $pull: { attending: eventId } }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	deleteEvent(req.params.eventId).then(function() {
		deleteComments(req.params.eventId).then(function() {
			deleteActivities(req.params.eventId).then(function() {
				findInvites(req.params.eventId).then(function(retrievedInvites) {
					removeInvitesFromUsers(retrievedInvites).then(function() {
						deleteInvites(req.params.eventId).then(function() {
							removeAttendingFromUsers(req.params.eventId).then(function() {
								res.send(200, "Event and all related items deleted successfully.")
							}, function(err) {
								res.send(200, "Event deleted but failed to remove users from attending.");
							});
						}, function(err) {
							res.send(200, "Event deleted but failed to delete invitations.");
						});
					}, function(err) {
						res.send(200, "Event deleted but failed to remove invitations from users.");
					});
				}, function(err) {
					res.send(200, "Event deleted but failed to find invitations.");
				});
			}, function(err) {
				res.send(200, "Event deleted but failed to delete activities.");
			});
		}, function(err) {
			res.send(200, "Event deleted but failed to delete comments.");
		});
	}, function(err) {
		res.send(500, err);
	});
};