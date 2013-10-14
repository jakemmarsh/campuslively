var mongoose   = require('mongoose'),
	User       = require('./user');

var subCommentSchema = new mongoose.Schema({
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

var comment = new mongoose.Schema();
comment.add({
    eventId: {
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
    },
    likes: [{type: mongoose.Schema.ObjectId}],
    subComments: [subCommentSchema]
});

module.exports = mongoose.model('Comment', comment);