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
    sent: {
    	type: Date, 
    	default: Date.now,
    	required: true
    },
    read: {
    	type: Boolean,
    	default: false,
    	required: true
    }
});

module.exports = mongoose.model('Invite', inviteSchema);