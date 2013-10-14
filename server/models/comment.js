var mongoose   = require('mongoose'),
	User       = require('./user'),
    SubComment = require('./subcomment');

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
    subComments: [{type: mongoose.Schema.ObjectId, ref: 'SubComment'}]
});

module.exports = mongoose.model('Comment', comment);