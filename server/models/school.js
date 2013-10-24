var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true
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