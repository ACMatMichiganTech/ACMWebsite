var mongoose = require('mongoose');

var hardwareSchema = mongoose.Schema({
  name: String,
  checkedOut: Boolean
});

module.exports = mongoose.model('hardwares', hardwareSchema);
