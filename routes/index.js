
exports.home = function (req, res) {
  res.render('index', {
    loggedin: req.isAuthenticated()
  });
};

exports.users = require('./users');
