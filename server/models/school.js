var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true
    },
    // TODO: should this exist?
    subscribers: Number
});

module.exports = mongoose.model('School', schoolSchema);