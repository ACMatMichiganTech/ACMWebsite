var Event = require('../models/event');

module.exports = {
  index: function(req, res) {
    Event.find().exec(function(err, events) {
      res.send(events);
    });
  },
};
