const Question = require('../models/question');//two dots means outside this folder

function indexRoute(req, res) { //passing the array of questions into the index of question
//use the Question model to get the data from the database
  Question.find()
    // pass the data into view
    .then( questions => {
      res.render('questions/index', {questions});
    });
}

function newRoute(req, res) {
  res.render('questions/new');//why isn't it just get
}

function createRoute(req, res, next) {
  Question.create(req.body)
    .then(()=> res.redirect('/questions'))
    .catch(next);
}

function showRoute(req, res, next) {
  Question.findById(req.params.id)
    .populate('comments.user')
    .then(question => {
      if(!question) return res.render('pages/404');
      res.render('questions/show', { question });
    })
    .catch(next);
}

function editRoute(req, res) {
  Question.findById(req.params.id)
    .then(question => res.render('questions/edit', { question }));
}

function updateRoute(req, res) {
  Question.findById(req.params.id)
    .then(question => Object.assign(question, req.body)) //assign assigns anythiing on the other side (req.body) onto the question
    .then(question => question.save())
    .then(() => res.redirect(`/questions/${req.params.id}`));
}

function deleteRoute(req, res) {
  Question.findById(req.params.id)
    .then(question => question.remove())
    .then(() => res.redirect('/questions'));
}

function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  Question.findById(req.params.id)
    .then(question => {
      question.comments.push(req.body);
      return question.save();
    })
    .then(question => res.redirect(`/questions/${question._id}`))
    .catch(next);
}
function commentsDeleteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => {
      const comment = question.comments.id(req.params.commentId);//will i ever get params??
      comment.remove();
      return question.save();
    })
    .then(question => res.redirect(`/questions/${question._id}`))
    .catch(next);
}
function upvoteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => {
      question.upvotes.push(req.currentUser);
      question.downvotes = question.downvotes.filter(userId => !userId.equals(req.currentUser._id));

      return question.save();
    })
    .then(() => res.redirect('/questions'))
    .catch(next);
}

function downvoteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => {
      question.downvotes.push(req.currentUser);
      question.upvotes = question.upvotes.filter(userId => !userId.equals(req.currentUser._id));
      return question.save();
    })
    .then(() => res.redirect('/questions'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  upvote: upvoteRoute,
  downvote: downvoteRoute
};
