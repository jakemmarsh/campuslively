var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true
    },
    // TODO: should this exist?
    subscribers: {
    	type: Number,
    	required: true,
    	default: 0
    }
});

module.exports = mongoose.model('School', schoolSchema);