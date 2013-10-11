var Q        = require('q'),
	crypto   = require('crypto'),
    User     = require('../models/user'),
    School   = require('../models/school'),
    Activity = require('../models/activity'),
    Event	 = require('../models/event');

exports.getEvent = function(req, res) {
	var getEvent = function(eventId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'location' },
                { path: 'creator' }, 
                { path: 'attending' },
                { path: 'comments' }
			];

		Event.findOne({ _id: eventId }).populate(populateObj).exec(function (err, retrievedEvent) {
	        if (err || !retrievedEvent) {
	        	deferred.reject(new Error("No event exists with specified ID."));
	        }
	        else {
	        	deferred.resolve(retrievedEvent);
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
            { path: 'comments' }
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
}

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
			event.receivedEvent = receivedEvent.startTime;
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

};

exports.postSubComment = function(req, res) {

};