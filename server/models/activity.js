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
    updatedOn: {
        type: Date, 
        default: Date.now,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }
});

module.exports = mongoose.model('Activity', activitySchema);