
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , User = require('./models/user')
  , hardware = require('./routes/hardware')
  , event = require('./routes/event')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcrypt')
  , http = require('http')
  , path = require('path')
  , Mongoose = require('mongoose');

var SALT_WORK_FACTOR = 10;

Mongoose.connect('localhost', 'acm-site');
Mongoose.connection.on('error',
  console.error.bind(console, 'Connection error: '));
Mongoose.connection.on('open', function() {
  console.info('Database connection open');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Unknown user ' + email });
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 7000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.index);
app.get('/users/:id', user.show);
app.get('/hardwares', hardware.index);
app.put('/hardwares/:id', hardware.update);
app.get('/hardwares/:id', hardware.show);
app.get('/events', event.index);

app.get('/login', function(req, res) {
  res.render('login', { messages: req.session.messages });
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err)
    }

    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
