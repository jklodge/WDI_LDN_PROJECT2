function secureRoute(req, res, next) {
  //if user is not logged in
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to do that.');
      res.redirect('/login');
    }); //regenerate clears session click
  }
  next();
}

module.exports = secureRoute;
