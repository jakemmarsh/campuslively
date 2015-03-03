var mongoose = require('mongoose');

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