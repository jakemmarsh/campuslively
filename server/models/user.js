var mongoose         = require('mongoose'),
    Category         = require('./category'),
    Event            = require('./event'),
    Invite           = require('./invite'),
    User             = require('./user');

var userSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date, 
        default: Date.now,
        required: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    salt: {
        type: String, 
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    businessName: String,
    subscriptions: [User],
    subscribers: [User],
    attending: [Event],
    invites: [Invite],
    school: String,
    activated: {
        type: Boolean,
        default: false,
        required: true
    },
    activationKey: String,
    passwordResetKey: String
});

module.exports = mongoose.model('User', userSchema);