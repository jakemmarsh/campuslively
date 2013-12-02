var mongoose   = require('mongoose'),
    User       = require('./user'),
    Comment    = require('./comment'),
    School     = require('./school');

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    locationName: {
        type: String
    },
    loc: {
      type: { type: String }, 
      coordinates: [Number]
    },
    description: String,
    startDate: {
        type: Date,
        required: true
    },
    startTime: String,
    endTime: String,
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
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
    attending: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    invited: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
    tags: [String],
    privacy: {
        type: String,
        default: 'public',
        enum: ['public', 'inviteOnly']
    },
    pictureUrl: {
        type: String
    },
    facebookId: String
});

eventSchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('Event', eventSchema);