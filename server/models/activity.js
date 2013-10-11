var mongoose = require('mongoose'),
	User     = require('./user'),
    Event    = require('./event');

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
    }
});

module.exports = mongoose.model('Activity', activitySchema);