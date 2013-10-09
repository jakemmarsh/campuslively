var mongoose         = require('mongoose'),
    Event            = require('./event'),
    Invite           = require('./invite'),
    User             = require('./user'),
    School           = require('./school');

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
    businessDescription: String,
    pictureUrl: {
        type: String,
        default: 'http://s3.amazonaws.com/campuslively/user_imgs/default.png',
        required: true
    },
    subscriptions: [User],
    postedEvents: [Event],
    attending: [Event],
    invites: [Invite],
    school: [School],
    activated: {
        type: Boolean,
        default: false,
        required: true
    },
    activationKey: String,
    passwordResetKey: String
});

module.exports = mongoose.model('User', userSchema);