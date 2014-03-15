var mongoose = require('mongoose');

function deleteEmpty (v) {
   if(v == null || v.length === 0){
     return undefined;
   }
   return v;
}

var userSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['student', 'group']
    },
    admin: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date, 
        default: Date.now
    },
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    salt: {
        type: String, 
        required: true,
        select: false
    },
    hash: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true/*,
        unique: true*/
    },
    firstName: {
        type: String,
        set: deleteEmpty
    },
    lastName: {
        type: String,
        set: deleteEmpty
    },
    groupName: {
        type: String,
        set: deleteEmpty
    },
    displayName: {
        type: String,
        set: deleteEmpty
    },
    groupDescription: {
        type: String,
        set: deleteEmpty
    },
    businessPictureUrls: [String],
    address: String,
    loc: {
      type: { type: String }, 
      coordinates: [Number]
    },
    website: {
        type: String,
        set: deleteEmpty
    },
    pictureUrl: {
        type: String,
        default: 'http://s3.amazonaws.com/campuslively/user_imgs/default.png'
    },
    subscriptions: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    attending: [{type: mongoose.Schema.ObjectId, ref: 'Event'}],
    invites: [{type: mongoose.Schema.ObjectId, ref: 'Event'}],
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
    },
    activated: {
        type: Boolean,
        default: false
    },
    activationKey: {
        type: String,
        set: deleteEmpty
    },
    passwordResetKey: {
        type: String,
        set: deleteEmpty
    },
    facebookLink: {
        type: String,
        set: deleteEmpty
    },
    twitterLink: {
        type: String,
        set: deleteEmpty
    },
    facebook: {
        id: String,
        managedPages: {
            name: String,
            id: String
        },
        subscriptions: [String],
        hasLinked: {
            type: Boolean,
            default: false
        },
        lastReminded: {
            type: Date,
            default: Date.now
        },
        lastUpdated: Date,
        autoPost: {
            type: Boolean,
            default: false
        }
    },
    google: {
        id: {
            type: String,
            set: deleteEmpty
        }
    }
});

userSchema.index({ loc : '2dsphere' });

userSchema.index({ "facebook.id" : 1 });

userSchema.index({ attending : 1 });

userSchema.index({ invites : 1 });

module.exports = mongoose.model('User', userSchema);