const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = require('./config/router');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const session = require('express-session');
const flash = require('express-flash');
const userAuth = require('./lib/userAuth');
const formidable = require('formidable');
//create our Express app
const app = express();

const PORT = 8000;
mongoose.connect('mongodb://localhost/questions-database');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) { //what is in?
    const method = req.body._method;//what is this
    delete req.body._method;
    return method;
  }
}));
//setting up sessions for cookies
app.use(session({
  secret: 'GysHa^72u91sk0P(', // a random key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false
}));

//set up flash messages must be After express-session
app.use(flash());// has to go underneath session because it needs flash

app.use(userAuth);

app.use(router);

//set up global error catcher// when we have an  error catcher it has to have four functions
app.use((err, req, res, next) => { // eslint-disable-line
  console.log(err);
  if(err.name === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', { err});
  // next(err);// the next thing that will happen which is display the error on the terminal when we're done with
});
// listen for incoming traffic
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
//have to add express-flash, brcrypt, bluebird, mongoose, mongod, mongo name-database
