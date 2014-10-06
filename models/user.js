var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: String,
  password: String,
  checkouts: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Checkout'}
  ]
});

userSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

//userSchema.methods.name = function() {
  //return this.firstName + ' ' + this.lastName;
//};

module.exports = mongoose.model('users', userSchema);
