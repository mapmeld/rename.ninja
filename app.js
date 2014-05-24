// load node modules
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

// connect to MongoDB for user account support
var User = require('./models/user');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost');
require('./config/passport')(passport);

// configure Express.js framework
var app = express();
app.configure(function () {
  app.use(express.compress());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: process.env.SECRET }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/static'));
  app.use(express.static(__dirname + '/lib'));
});

// routes
var routes = require('./routes');

// homepage
app.get('/', routes.home);

// user pages
app.get('/signup', routes.users.signup);
app.get('/login', routes.users.login);
app.get('/logout', routes.users.logout);
app.get('/profile', routes.users.profile);

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

app.listen(process.env.PORT || 3000);
module.exports = app;
