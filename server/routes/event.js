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
	var getEvents = function(schoolId) {
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
			Event.find({ school: schoolId })
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
			Event.find({ school: schoolId })
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

	getEvents(req.params.schoolId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsBySchoolOlder = function(req, res) {
	var getEvents = function(schoolId, skip, limit) {
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

		Event.find({ school: schoolId })
		.skip(skip)
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

	getEvents(req.params.schoolId, req.params.skip, req.params.limit).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsBySchoolAndDay = function(req, res) {
	var getEvents = function(schoolId, day) {
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

		Event.find({ school: schoolId, startDate: { $gt: floorDay, $lt: ceilingDay } })
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

	getEvents(req.params.schoolId, req.params.date).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByUser = function(req, res) {
	var getEvents = function(userId) {
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
			Event.find({ creator: userId })
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
			Event.find({ creator: userId })
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

	getEvents(req.params.userId).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByUserOlder = function(req, res) {
	var getEvents = function(userId, skip, limit) {
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

		Event.find({ creator: userId })
		.skip(skip)
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

	getEvents(req.params.userId, req.params.skip, req.params.limit).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByLocation = function(req, res) {
	var getEvents = function(lat, lng) {
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
			Event.find({ loc : { $near : locationPoint } })
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
			Event.find({ loc : { $near : locationPoint } })
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

	getEvents(req.params.lat, req.params.lng).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getEventsByLocationOlder = function(req, res) {
	var getEvents = function(lat, lng, skip, limit) {
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

		Event.find({ loc : { $near : locationPoint } })
		.skip(skip)
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

	getEvents(req.params.lat, req.params.lng, req.params.skip, req.params.limit).then(function(retrievedEvents) {
		res.json(200, retrievedEvents);
	}, function(err) {
		res.send(500, err);
	});
};

exports.postEvent = function(req, res) {
	var postEvent = function(receivedEvent) {
		var deferred = Q.defer(),
			event = new Event({
				title: receivedEvent.title,
				creator: receivedEvent.creator,
				startDate: receivedEvent.startDate
			});

		if(receivedEvent.description) {
			event.description = receivedEvent.description;
		}
		if(receivedEvent.locationName) {
			event.locationName = receivedEvent.locationName;
		}
		if(receivedEvent.locationPoint) {
			event.loc = {
				type: 'Point',
				coordinates: [parseFloat(receivedEvent.locationPoint.coordinates[0]), parseFloat(receivedEvent.locationPoint.coordinates[1])]
			};
		}
		if(receivedEvent.startTime) {
			event.startTime = receivedEvent.startTime;
		}
		if(receivedEvent.school) {
			event.school = receivedEvent.school;
		}
		if(receivedEvent.pictureUrl) {
			event.pictureUrl = receivedEvent.pictureUrl;
		}
		if(receivedEvent.tags) {
			event.tags = receivedEvent.tags;
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
			res.send(200, "Event posted and activity created successfully.");
		}, function(err) {
			res.send(200, "Event posted but unable to create activity.");
		});
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