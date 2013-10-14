var mongoose = require('mongoose'),
	User     = require('./user'),
    Event    = require('./event'),
    Comment  = require('./comment');

var subCommentSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    commentId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    posted: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('SubComment', subCommentSchema);