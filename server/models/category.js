var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true
    }
    // TODO: should this exist?
    subscribers: Number
});

module.exports = mongoose.model('Category', categorySchema);