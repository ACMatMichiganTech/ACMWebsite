var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: String,
  location: String,
  description: String,
  type: String,
  starts_at: Date,
  ends_at: Date,
  editable: {type: Boolean, default: false},
  deletable: {type: Boolean, default: false}
});

module.exports = mongoose.model('events', eventSchema);
