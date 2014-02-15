var mongoose   = require('mongoose'),
    User       = require('./user'),
    Comment    = require('./comment'),
    School     = require('./school');

function deleteEmpty (v) {
   if(v == null || v.length === 0){
     return undefined;
   }
   return v;
}

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sponsored: {
        type: Boolean,
        default: false
    },
    locationName: {
        type: String,
        set: deleteEmpty
    },
    roomNumber: {
        type: String,
        set: deleteEmpty
    },
    loc: {
      type: { type: String }, 
      coordinates: [Number]
    },
    description: {
        type: String,
        set: deleteEmpty
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        set: deleteEmpty
    },
    endTime: {
        type: String,
        set: deleteEmpty
    },
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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
        type: String,
        set: deleteEmpty
    },
    facebookId: {
        type: String,
        set: deleteEmpty
    }
});

eventSchema.index({ loc : '2dsphere' });

eventSchema.index({ loc : 1 });
eventSchema.index({ loc : 1, startDate : 1 });

eventSchema.index({ creator : 1 });

eventSchema.index({ school : 1 });
eventSchema.index({ school : 1, startDate : 1 });

module.exports = mongoose.model('Event', eventSchema);