var User = require('../models/user');

// user login and signup requests
exports.login = function (req, res) {
  res.render('login', {
    message: req.flash('loginMessage')
  });
};

exports.signup = function (req, res) {
  res.render('signup', {
    message: req.flash('signupMessage')
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

// personal profile (for logged in user)
exports.profile = function (req, res) {
  res.render('profile', {
    user: req.user
  });
};

// user page (works for all web visitors)
exports.byid = function (req, res) {
  User.findById(req.params.id, function (err, viewUser) {
    Book.find({ user_id: req.params.id }, function (err, books) {
      res.render('profile', {
        user: viewUser
      });
    });
  });
};
