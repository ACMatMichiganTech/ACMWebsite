var Hardware = require('../models/hardware');

module.exports = {
  index: function(req, res) {
    Hardware.find().exec(function(err, hardwares) {
      res.send(hardwares);
    });
  },

  show: function(req, res) {
    var hardware = Hardware.findOne({ id: req.params.id }, function(err, data) {
      console.log(data);
      res.send('foo');
    });
  },

  update: function(req, res) {
    Hardware.findByIdAndUpdate(req.params.id, {$set: req.body},
      function(err, hardware) {
        res.send(hardware);
      }
    );
  }
};
