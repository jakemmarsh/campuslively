var mongoose         = require('mongoose'),
    bcrypt           = require('bcrypt'),
    Category         = require('./category'),
    Event            = require('./event'),
    Invite           = require('./invite'),
    User             = require('./user');

var userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        index: { 
            unique: true 
        } 
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    categories: [Category],
    subscriptions: [User],
    attending: [Event],
    invites: [Invite],
    // TODO: should this be a string?
    location: String
});

module.exports = mongoose.model('User', userSchema);