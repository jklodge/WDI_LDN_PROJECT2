const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}// don't get this

function createRoute(req, res, next) {
  User.create(req.body)
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.redirect('/register');
      }
      // store the logged in users id into the session cookie
      req.session.userId = user._id;
      req.flash('success', `Welcome back ${user.username}!`);

      res.redirect('/questions');
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute
};
