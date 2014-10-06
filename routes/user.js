var User = require('../models/user');

module.exports = {
  index: function(req, res) {
    User.find().exec(function(err, users) {
      res.send(users);
    })
  },

  show: function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      res.send(user);
    });
  }
};
