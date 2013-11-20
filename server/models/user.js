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
    timestamp: {
        type: Date, 
        default: Date.now
    },
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    salt: {
        type: String, 
        required: true,
        select: false
    },
    hash: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    businessName: String,
    displayName: String,
    businessDescription: String,
    businessPictureUrls: [String],
    address: String,
    loc: {
      type: { type: String }, 
      coordinates: [Number]
    },
    website: String,
    pictureUrl: {
        type: String,
        default: 'http://s3.amazonaws.com/campuslively/user_imgs/default.png'
    },
    subscriptions: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    attending: [{type: mongoose.Schema.ObjectId, ref: 'Event'}],
    invites: [{type: mongoose.Schema.ObjectId, ref: 'Event'}],
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
    },
    activated: {
        type: Boolean,
        default: false
    },
    activationKey: String,
    passwordResetKey: String,
    facebookLink: String,
    twitterLink: String,
    facebook: {
        id: String,
        managedPages: {
            name: String,
            id: String
        },
        subscriptions: [String],
        linked: {
            type: Boolean,
            default: false
        },
        lastUpdated: Date,
        autoPost: {
            type: Boolean,
            default: true
        }
    },
    google: {
        id: String
    }
});

userSchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('User', userSchema);