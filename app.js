
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , hardware = require('./routes/hardware')
  , http = require('http')
  , path = require('path')
  , Mongoose = require('mongoose');
  //, db = Mongoose.createConnection('localhost', 'acm-site');

Mongoose.connect('localhost', 'acm-site');
Mongoose.connection.on('error',
  console.error.bind(console, 'Connection error: '));
Mongoose.connection.on('open', function() {
  console.info('Database connection open');
});

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hardwares', hardware.index);
app.put('/hardwares/:id', hardware.update);
app.get('/hardwares/:id', hardware.show);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
