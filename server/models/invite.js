var mongoose = require('mongoose'),
	User     = require('./user'),
	Event    = require('./event');

var inviteSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    timestamp: {
    	type: Date, 
    	default: Date.now
    },
    read: {
    	type: Boolean,
    	default: false
    }
});

module.exports = mongoose.model('Invite', inviteSchema);