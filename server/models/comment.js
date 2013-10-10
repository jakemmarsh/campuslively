var mongoose = require('mongoose'),
	User     = require('./user');

var comment = new mongoose.Schema();
comment.add({
    content: {
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
    subcomments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Comment', comment);