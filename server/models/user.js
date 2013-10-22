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
    businessPictureUrls: [String],
    address: String,
    loc: {
      type: { type: String }, 
      coordinates: [Number]
    },
    pictureUrl: {
        type: String,
        default: 'http://s3.amazonaws.com/campuslively/user_imgs/default.png',
        required: true
    },
    subscriptions: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    postedEvents: [{type: mongoose.Schema.ObjectId, ref: 'Event'}],
    attending: [{type: mongoose.Schema.ObjectId, ref: 'Event'}],
    invites: [{type: mongoose.Schema.ObjectId, ref: 'Invite'}],
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
    },
    activated: {
        type: Boolean,
        default: false,
        required: true
    },
    activationKey: String,
    passwordResetKey: String
});

userSchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('User', userSchema);