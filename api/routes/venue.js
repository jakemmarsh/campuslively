var Q          = require('q'),
	Venue	   = require('../models/venue');

exports.getVenuesBySchool = function(req, res) {
	var getVenues = function(schoolId) {
		var deferred = Q.defer();

		Venue.find({ school: schoolId })
		.sort({ name: 1 })
		.exec(function (err, venues) {
			if(err) {
				deferred.reject(err.message);
			}
			else {
				deferred.resolve(venues);
			}
		});

		return deferred.promise;
	};

	getVenues(req.params.schoolId).then(function(venues) {
		res.json(200, venues);
	}, function() {
		res.send(500, "Failed to retrieve venues.");
	});
};