var mongoose = require('mongoose');

function deleteEmpty (v) {
   if(v == null || v.length === 0){
     return undefined;
   }
   return v;
}

var schoolSchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true
    },
    shortcode: {
        type: String,
        unique: true,
        set: deleteEmpty
    },
    color: {
        type: String,
        set: deleteEmpty
    },
    subscribers: {
    	type: Number,
    	default: 0
    },
    events: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('School', schoolSchema);