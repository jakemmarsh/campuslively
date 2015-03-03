var mongoose = require('mongoose'),
	School     = require('./school');

var venueSchema = new mongoose.Schema({
    name: {
    	type: String,
    	required: true,
    	unique: true
    },
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School'
    },
    loc: {
      type: { type: String }, 
      coordinates: [Number]
    }
});

venueSchema.index({ school : 1 });

module.exports = mongoose.model('Venue', venueSchema);