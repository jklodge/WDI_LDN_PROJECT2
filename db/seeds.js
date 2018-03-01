//planting the seeds for/into our database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Question = require('../models/question');
const User = require('../models/user');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/questions-database', (err, db) => {
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
      image: '/images/shoes4.jpg',
      moreinfo: 'Got this ages ago but are these still in?',
      from: 'Topshop',
      user: user
    }, {
      title: 'Headphones?',
      image: '/images/head.jpg',
      moreinfo: 'Got these from my mate',
      from: 'Currys',
      user: user
    }, {
      title: 'This jumper?',
      image: '/images/jumper.jpg',
      moreinfo: 'Want to wear this to a tech interview, I am a junior dev?',
      from: 'Urban Outfitters',
      user: user
    }, {
      title: 'Is my dress too small?',
      image: '/images/megdress.jpg',
      moreinfo: 'Is this too small?',
      from: 'ASOS',
      user: user
    }, {
      title: 'Is my hat cool?',
      image: '/images/hat.jpg',
      moreinfo: 'Is my hat cool?',
      from: 'JD Sports',
      user: user
    }, {
      title: 'Do you like my shoes?',
      image: '/images/katie.jpg',
      moreinfo: 'Just for casual days out',
      from: 'Timberland',
      user: user
    }]))
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
