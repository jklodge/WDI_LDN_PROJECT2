const User = require('../models/user');
const Question = require('../models/question');
const Promise = require('bluebird');


function usersIndex(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function usersShow(req, res, next) {

  // find all the questions that the user has commented on
  Promise.props({
    questions: Question.find({ 'comment.user': req.params.id }).exec(),
    user: User.findById(req.params.id).exec()
  })
    .then(data => {
      if(!data.user) return res.render('pages/404');
      res.render('registrations/profile', data);
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
