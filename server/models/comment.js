var mongoose = require('mongoose');

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
    timestamp: {
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
    timestamp: {
        type: Date, 
        default: Date.now
    },
    likes: [{type: mongoose.Schema.ObjectId}],
    subComments: [subCommentSchema]
});

comment.index({ eventId: 1 });

module.exports = mongoose.model('Comment', comment);