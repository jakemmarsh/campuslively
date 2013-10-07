var Q      = require('q'),
    User   = require('../models/user');

exports.getUser = function(req, res) {
    User.findOne({ _id: req.params.userId }, function (err, retrievedUser) {
        if (err || !retrievedUser) {
            res.send(404, 'No user exists with specified ID.');
        }
        else {
        	var returnUser = JSON.parse(JSON.stringify(retrievedUser));
            delete returnUser.salt;
            delete returnUser.hash;
            res.json(returnUser);
        }
    });
};

exports.getUserByName = function(req, res) {
    User.findOne({ username: req.params.username }, function (err, retrievedUser) {
        if (err || !retrievedUser) {
            res.send(404, 'No user exists with specified username.');
        }
        else {
        	var returnUser = JSON.parse(JSON.stringify(retrievedUser));
            delete returnUser.salt;
            delete returnUser.hash;
            console.log(returnUser);
            res.json(returnUser);
        }
    });
};