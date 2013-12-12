var mongoose = require('mongoose'),
	User     = require('./user'),
    Event    = require('./event'),
    Comment  = require('./comment');

var activitySchema = new mongoose.Schema({
    actor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date, 
        default: Date.now
    },
    activity: {
        type: String,
        required: true,
        enum: ['subscribed', 'posted', 'commented', 'invited', 'rsvpd']
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    },
    eventPrivacy: String,
    eventCreator: mongoose.Schema.ObjectId,
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }
});

module.exports = mongoose.model('Activity', activitySchema);