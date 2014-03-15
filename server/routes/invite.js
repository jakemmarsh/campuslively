var Q      = require('q'),
    Invite = require('../models/invite');

exports.getUnreadInvites = function(req, res) {
	var getInvites = function(userId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'sender' },
				{ path: 'recipient' },
				{ path: 'event' }
			];

		Invite.find({ 
			recipient: userId,
			read: false
		})
		.populate(populateObj)
		.exec(function (err, retrievedInvites) {
	        if (err || !retrievedInvites) {
	        	deferred.reject(new Error("No invites exist associated with that user ID."));
	        }
	        else {
	        	deferred.resolve(retrievedInvites);
	        }
	    });

		return deferred.promise;
	};

	getInvites(req.params.userId).then(function(data) {
        res.json(200, data);
	}, function(err) {
		res.send(500, err);
	});
};

exports.markInviteAsRead = function(req, res) {
	var updateInvite = function(inviteId) {
		var deferred = Q.defer(),
			populateObj = [
				{ path: 'sender' },
				{ path: 'recipient' },
				{ path: 'event' }
			];

		Invite.findOneAndUpdate({ _id: inviteId }, { read: true })
		.populate(populateObj)
		.exec(function(err, updatedInvite) {
         	if(err) {
         		deferred.reject(err.message);
         	}
         	else {
         		deferred.resolve(updatedInvite);
         	}
	    });

		return deferred.promise;
	};

	updateInvite(req.params.inviteId).then(function(data) {
        res.json(200, data);
	}, function(err) {
		res.send(500, err);
	});
};