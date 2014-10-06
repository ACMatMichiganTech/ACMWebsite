var mongoose = require('mongoose');

var checkoutSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  checkoutDate: Date,
  returnDate: Date
});

module.exports = mongoose.model('checkouts', checkoutSchema);
