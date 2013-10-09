var mongoose = require('mongoose');

var locationObject = new mongoose.Schema({
    loc: {
      type: { 
      	type: String,
      	required: true 
      }, 
      coordinates: []
    }
});

locationObject.index({ loc : '2dsphere' });

module.exports = mongoose.model('Location', locationObject);