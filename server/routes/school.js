var Q          = require('q'),
	School	   = require('../models/school');

exports.getAllSchools = function(req, res) {
	var getSchools = function() {
		var deferred = Q.defer();

		School.find({}, function (err, schools) {
			if(err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(schools);
			}
		});

		return deferred.promise;
	};

	getSchools().then(function(schools) {
		res.json(200, schools);
	}, function(err) {
		res.send(500, "Failed to retrieve schools.");
	});
};