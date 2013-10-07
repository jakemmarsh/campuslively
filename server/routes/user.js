var Q      = require('q'),
    User   = require('../models/user');

exports.getUser = function(req, res) {
	var findUser = function(userId) {
		var deferred = Q.defer();

		User.findOne({ _id: req.params.userId }, function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(new Error("No user exists with specified ID."));
	        }
	        else {
	        	deferred.resolve(retrievedUser);
	        }
	    });

	    return deferred.promise;
	};

	findUser(req.params.username).then(function(data) {
		var returnUser = JSON.parse(JSON.stringify(data));
        delete returnUser.salt;
        delete returnUser.hash;
        res.json(returnUser);
	}, function(err) {
		res.send(500, err);
	});
};

exports.getUserByName = function(req, res) {
	var findUser = function(username) {
		var deferred = Q.defer();

		User.findOne({ username: req.params.username }, function (err, retrievedUser) {
	        if (err || !retrievedUser) {
	        	deferred.reject(new Error("No user exists with specified username."));
	        }
	        else {
	        	deferred.resolve(retrievedUser);
	        }
	    });

	    return deferred.promise;
	};

	findUser(req.params.username).then(function(data) {
		var returnUser = JSON.parse(JSON.stringify(data));
        delete returnUser.salt;
        delete returnUser.hash;
        res.json(returnUser);
	}, function(err) {
		res.send(500, err);
	});
};

exports.subscribe = function(req, res) {

};

exports.unsubscribe = function(req, res) {
	
};