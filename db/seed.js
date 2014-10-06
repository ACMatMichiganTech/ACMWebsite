var Mongoose = require('mongoose');
var User = require('../models/user');
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
  createUsers();
  createHardwares();
  createEvents();
};

var createUsers = function() {
  console.info('Seeding users...');

  User.remove({}, function() {
    User.create({
      name: {
        firstName: 'Jay',
        lastName: 'Vana'
      },
      email: 'jsvana@mtu.edu',
      password: 'linked'
    });

    User.create({
      name: {
        firstName: 'Phil',
        lastName: 'Middleton'
      },
      email: 'pjmiddle@mtu.edu',
      password: 'linked'
    });
  })
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
      location: 'Rekhi 214',
      description: 'Come meet the members of ACM and get information on our organization!',
      type: 'info',
      starts_at: Date.today().add(4).days(),
      ends_at: Date.today().add(4).days().add(1).hours()
    });

    Event.create({
      title: 'Tech Hacks',
      location: 'Rekhi Hall',
      description: 'Build something awesome with your friends and win cool prizes!',
      type: 'success',
      starts_at: Date.today().add(7).days(),
      ends_at: Date.today().add(9).days()
    });
  });
};
