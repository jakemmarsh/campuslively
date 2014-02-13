var mongoose = require('mongoose'),
	User     = require('./user'),
    Event    = require('./event'),
    Comment  = require('./comment');

function deleteEmpty (v) {
   if(v == null || v.length === 0){
     return undefined;
   }
   return v;
}

var activitySchema = new mongoose.Schema({
    actor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        set: deleteEmpty
    },
    timestamp: {
        type: Date, 
        default: Date.now
    },
    activity: {
        type: String,
        required: true,
        enum: ['subscribed', 'posted', 'commented', 'invited', 'rsvpd']
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        set: deleteEmpty
    },
    eventPrivacy: {
        type: String,
        set: deleteEmpty
    },
    eventCreator: {
        type: mongoose.Schema.ObjectId,
        set: deleteEmpty
    },
    eventStartDate: {
        type: Date,
        set: deleteEmpty
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
        set: deleteEmpty
    }
});

module.exports = mongoose.model('Activity', activitySchema);