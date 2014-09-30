var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: String,
  type: String,
  starts_at: Date,
  ends_at: Date
});

module.exports = mongoose.model('events', eventSchema);
