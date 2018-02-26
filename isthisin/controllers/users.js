const User = require('../models/user');

function usersIndex(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if(!user) return res.render('pages/404');
      res.render('questions/profile', { user });
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
