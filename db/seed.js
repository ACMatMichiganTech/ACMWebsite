var Mongoose = require('mongoose');
var Hardware = require('../models/hardware');
var Event = require('../models/event');
require('datejs');

Mongoose.connect('localhost', 'acm-site');
Mongoose.connection.on('error',
  console.error.bind(console, 'Connection error: '));

Mongoose.connection.on('open', function() {
  console.info('Database connection open');

  seed();
});

var seed = function() {
  createHardwares();
  createEvents();
};

var createHardwares = function() {
  console.info('Seeding hardwares...');

  Hardware.remove({}, function() {
    Hardware.create({
      name: 'Oculus Rift',
      checkedOut: false
    });

    Hardware.create({
      name: 'Pebble',
      checkedOut: false
    });

    Hardware.create({
      name: 'Myo',
      checkedOut: false
    });

    Hardware.create({
      name: 'Leap',
      checkedOut: false
    });
  });
};

var createEvents = function() {
  console.info('Seeding events...');

  Event.remove({}, function() {
    Event.create({
      title: 'Pizza Party',
      type: 'info',
      starts_at: Date.today().add(4).days(),
      ends_at: Date.today().add(4).days().add(1).hours()
    });

    Event.create({
      title: 'Tech Hacks',
      type: 'success',
      starts_at: Date.today().add(7).days(),
      ends_at: Date.today().add(9).days()
    });
  });
};