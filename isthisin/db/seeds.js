//planting the seeds for/into our database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Question = require('../models/question');
const User = require('../models/user');

mongoose.connect('mongodb://localhost/questions-database', (err, db) => {
  db.dropDatabase();
  // whats happening here
  User.create({
    username: 'Jess',
    email: 'jess@jess.com',
    password: 'password',
    passwordConfirmation: 'password',
    aboutyou: 'fruity'
  })
    .then(user => Question.create([{
      title: 'Is this still in?',
      image: '/images/girl1.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/shoes1.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/shirt1.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/shoes3.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/outfit1.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/outfit2.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/top1.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Is this still in?',
      image: '/images/shoes4.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }]))
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
