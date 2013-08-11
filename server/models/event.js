var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    location: String,
    description: String,
    start: String,
    end: String,
    category: String,
    creator: String,
    created: {type: Date, default: Date.now},
    schoolId: String,
    attending: Number
});

module.exports = mongoose.model('Event', eventSchema);