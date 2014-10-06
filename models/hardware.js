var mongoose = require('mongoose');

var hardwareSchema = mongoose.Schema({
  name: String,
  checkedOut: Boolean,
  checkouts: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Checkout'}
  ]
});

module.exports = mongoose.model('hardwares', hardwareSchema);
