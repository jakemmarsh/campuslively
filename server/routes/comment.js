var Q          = require('q'),
	crypto     = require('crypto'),
    User       = require('../models/user'),
    School     = require('../models/school'),
    Activity   = require('../models/activity'),
    Event	   = require('../models/event'),
    Comment    = require('../models/comment');

exports.getComment = function(req, res) {
	var getComment = function(eventId) {
		var deferred = Q.defer(),
			commentPopulateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Comment.findOne({ _id: eventId })
		.populate(commentPopulateObj)
		.exec(function(err, retrievedComment) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(retrievedComment);
         	}
	    });

		return deferred.promise;
	};

	getComment(req.params.commentId).then(function(retrievedComment) {
		res.json(200, retrievedComment);
	}, function(err) {
		res.send(500, err);
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
	addToEvent = function(eventId, postedCommentId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'location' },
	            { path: 'creator' }, 
	            { path: 'attending' },
	            { path: 'comments' },
	            { path: 'school' }
			];
			
		Event.findOneAndUpdate({ _id: req.params.eventId }, { $addToSet: { comments: postedCommentId } })
		.populate(populateObj)
		.exec(function(err, updatedEvent) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(updatedEvent);
         	}
	    });

		return deferred.promise;
	},
	createActivity = function(comment, event) {
		var deferred = Q.defer(),
			activity = new Activity({
				actor: comment.creator,
				event: event._id,
				eventPrivacy: event.privacy,
				eventCreator: event.creator,
				comment: comment._id,
				activity: 'commented'
			});

		activity.save(function (err, savedActivity) {
            if (err) {
            	console.log(err);
                deferred.reject(err.message);
            }
            else {
                deferred.resolve(savedActivity);
            }
        });

        return deferred.promise;
	},
	getPostedComment = function(commentId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator' }
			];

		Comment.findOne({ _id: commentId })
		.populate(populateObj)
		.exec(function(err, retrievedComment) {
			if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(retrievedComment);
         	}
		});

		return deferred.promise;
	};

	postComment(req.params.eventId, req.body).then(function(savedComment) {
		addToEvent(req.params.eventId, savedComment._id).then(function(returnedEvent) {
			createActivity(savedComment, returnedEvent).then(function(savedActivity) {
				getPostedComment(savedComment._id).then(function(retrievedComment) {
					res.json(200, retrievedComment);
				}, function(err) {
					res.send(200, "Comment created but failed to retrieve.");
				});
			}, function(err) {
				res.send(200, "Comment created and added to event but failed to create activity.");
			});
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
			},
			populateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator' }
			];

		Comment.findOneAndUpdate({ _id: commentId }, { $addToSet: { subComments: subComment } })
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
	};

	addSubComment(req.params.commentId, req.body).then(function(returnedComment) {
		res.json(200, returnedComment);
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
		res.json(200, updatedComment);
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

exports.deleteComment = function(req, res) {
	var deleteComment = function(commentId) {
		var deferred = Q.defer();

		Comment.remove({ _id: commentId }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	},
	removeFromEvent = function(eventId, commentId) {
		var deferred = Q.defer();

		Event.findOneAndUpdate({ _id: eventId }, { $pull: { comments: commentId } })
		.exec(function(err, updatedEvent) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
				deferred.resolve(updatedEvent);
         	}
	    });

		return deferred.promise;
	},
	deleteActivity = function(eventId, commentId) {
		var deferred = Q.defer();

		Activity.remove({ comment: commentId, event: eventId, activity: 'commented' }, function(err) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	deleteComment(req.params.commentId).then(function() {
		removeFromEvent(req.params.eventId, req.params.commentId).then(function(updatedEvent) {
			deleteActivity(req.params.eventId, req.params.commentId).then(function() {
				res.json(200, updatedEvent);
			}, function(err) {
				res.json(200, updatedEvent);
			});
		}, function(err) {
			res.send(200, "Comment deleted but not removed from event.");
		});
	}, function(err) {
		res.send(500, err);
	});
};

exports.deleteSubComment = function(req, res) {
	removeFromComment = function(subCommentId, commentId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'creator' },
				{ path: 'subComments.creator'}
			];

		Comment.findOneAndUpdate({ _id: commentId }, { $pull: { subComments: { _id: subCommentId } } })
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
	};

	removeFromComment(req.params.subCommentId, req.params.commentId).then(function(updatedComment) {
		res.json(200, updatedComment);
	}, function(err) {
		res.send(500, err);
	});
};