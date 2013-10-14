var mongoose   = require('mongoose'),
    User       = require('./user'),
    Comment    = require('./comment'),
    School     = require('./school'),
    Location   = require('./location');

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    locationName: {
        type: String
    },
    locationPoint: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    },
    description: String,
    startDate: {
        type: Date,
        required: true
    },
    startTime: String,
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
    },
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
    attending: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    invited: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
    tags: [String],
    privacy: {
        type: String,
        default: 'public',
        required: true
    },
    pictureUrl: {
        type: String
    }
});

module.exports = mongoose.model('Event', eventSchema);