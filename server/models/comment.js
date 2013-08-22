var mongoose = require('mongoose'),
	User     = require('./user');

var commentSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Comment', commentSchema);