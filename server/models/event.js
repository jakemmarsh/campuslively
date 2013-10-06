var mongoose = require('mongoose'),
    User     = require('./user'),
    Category = require('./category'),
    Comment  = require('./comment');

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        // TODO: should this be a string?
        type: String,
        required: true
    },
    description: String,
    start: {
        type: String,
        required: true
    },
    end: String,
    categories: [Category],
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date, 
        default: Date.now,
        required: true
    },
    attending: {
        type: Number,
        required: true
    },
    comments: [Comment]
});

module.exports = mongoose.model('Event', eventSchema);