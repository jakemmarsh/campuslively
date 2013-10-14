var Q          = require('q'),
	crypto     = require('crypto'),
    User       = require('../models/user'),
    School     = require('../models/school'),
    Activity   = require('../models/activity'),
    Event	   = require('../models/event'),
    Comment    = require('../models/comment');

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

		Event.findOne({ _id: eventId }).populate(eventPopulateObj).exec(function(err, updatedEvent) {
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
		res.json(retrievedEvent);
	}, function(err) {
		res.send(500, "Failed to retrieve event by ID.");
	});
};

exports.getEventsBySchool = function(req, res) {
	var getEvents = function(schoolId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'location' },
	            { path: 'creator' }, 
	            { path: 'attending' },
	            { path: 'comments' },
	            { path: 'school' }
			];

		Event.find({ school: schoolId }).populate(populateObj).exec(function (err, retrievedEvent) {
	        if (err || !retrievedEvent) {
	        	deferred.reject(new Error("No events exist for specified school."));
	        }
	        else {
	        	deferred.resolve(retrievedEvent);
	        }
	    });

		return deferred.promise;
	};

	getEvents(req.params.schoolId).then(function(retrievedEvents) {
		res.json(retrievedEvents);
	}, function(err) {
		res.send(500, "Failed to retrieve events by school.");
	});
};

exports.getEventsBySchoolAndDay = function(req, res) {

};

exports.getEventsByUser = function(req, res) {
	var getEvents = function(userId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'location' },
	            { path: 'creator' }, 
	            { path: 'attending' },
	            { path: 'comments' },
	            { path: 'school' }
			];

		Event.find({ creator: userId }).populate(populateObj).exec(function (err, retrievedEvent) {
	        if (err || !retrievedEvent) {
	        	deferred.reject(new Error("No events exist for specified user."));
	        }
	        else {
	        	deferred.resolve(retrievedEvent);
	        }
	    });

		return deferred.promise;
	};

	getEvents(req.params.userId).then(function(retrievedEvents) {
		res.json(retrievedEvents);
	}, function(err) {
		res.send(500, "Failed to retrieve events by user.");
	});
};

exports.getEventsByLocation = function(req, res) {

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
		if(receivedEvent.location) {
			event.location = receivedEvent.location;
		}
		if(receivedEvent.locationName) {
			event.locationName = receivedEvent.locationName;
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
		res.send(500, "Could not post event.");
	});
};

exports.postComment = function(req, res) {
	var postComment = function(eventId, comment) {
		var deferred = Q.defer(),
		comment = new Comment({
			eventId: eventId,
			body: comment.body,
			creator: comment.creator
		});

		comment.save(function (err, savedComment) {
            if (err) {
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(savedComment);
            }
        });

		return deferred.promise;
	},
	addToEvent = function(eventId, postedComment) {
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

		Event.findOneAndUpdate({ _id: req.params.eventId }, { $addToSet: { comments: postedComment._id } })
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

	postComment(req.params.eventId, req.body).then(function(returnedComment) {
		addToEvent(req.params.eventId, returnedComment).then(function(returnedEvent) {
			res.json(returnedEvent);
		}, function(err) {
			res.send(200, "Comment created but failed to add to event.");
		});
	}, function(err) {
		res.send(500, err);
	});
};

exports.postSubComment = function(req, res) {
	var addSubComment = function(commentId, subComment) {
		var deferred = Q.defer(),
			subComment = {
				body: subComment.body,
				creator: subComment.creator
			};

		Comment.findOneAndUpdate({ _id: commentId }, { $addToSet: { subComments: subComment } })
		.exec(function(err, updatedComment) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(updatedComment);
         	}
	    });

		return deferred.promise;
	},
	getUpdatedEvent = function(eventId) {
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
				{ path: 'subComments.creator' }
			];

		Event.findOne({ _id: req.params.eventId })
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

	addSubComment(req.params.commentId, req.body).then(function() {
		getUpdatedEvent(req.params.eventId).then(function(returnedEvent) {
			res.json(returnedEvent);
		}, function(err) {
			res.send(200, "Subcomment created but failed to retrieve updated event.");
		});
	}, function(err) {
		res.send(500, err);
	});
};

exports.likeComment = function(req, res) {
	var updateComment = function(commentId, userId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator' }
			];

		Comment.findOneAndUpdate({ _id: commentId }, { $addToSet: { likes: userId } })
		.populate(populateObj)
		.exec(function(err, updatedComment) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(updatedComment);
         	}
	    });

		return deferred.promise;
	}

	updateComment(req.params.commentId, req.params.userId).then(function(updatedComment) {
		res.json(updatedComment);
	}, function(err) {
		res.send(500, "Failed to like comment.");
	});
};

exports.unlikeComment = function(req, res) {
	var updateComment = function(commentId, userId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator' }
			];

		Comment.findOneAndUpdate({ _id: commentId }, { $pull: { likes: userId } })
		.populate(populateObj)
		.exec(function(err, updatedComment) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(updatedComment);
         	}
	    });

		return deferred.promise;
	}

	updateComment(req.params.commentId, req.params.userId).then(function(updatedComment) {
		res.json(updatedComment);
	}, function(err) {
		res.send(500, "Failed to unlike comment.");
	});
};

exports.deleteEvent = function(req, res) {
	var deleteEvent = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	deleteComments = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	deleteSubComments = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	deleteActivity = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	removeInvited = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	emoveAttending = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	};
};


exports.deleteComment = function(req, res) {
	var deleteComment = function(commentId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	deleteSubComments = function(commentId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	removeFromEvent = function(commentId) {
		var deferred = Q.defer();

		return deferred.promise;
	};
};


exports.deleteSubComment = function(req, res) {
	var deleteSubComment = function(subCommentId, commentId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	removeFromComment = function(subCommentId, commentId) {
		var deferred = Q.defer();

		return deferred.promise;
	},
	getUpdatedEvent = function(eventId) {
		var deferred = Q.defer();

		return deferred.promise;
	};
};