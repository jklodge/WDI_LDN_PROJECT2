//planting the seeds for/into our database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Question = require('../models/question');
const questionData = require('./data/questions');

mongoose.connect('mongodb://localhost/questions-database', (err, db) => {
  db.dropDatabase();
  // whats happening here
  Question.create(questionData)
    .then(questions => console.log(`${questions.length} questions created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
