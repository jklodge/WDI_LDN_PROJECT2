const mongoose = require('mongoose');
//what to expect what our database should look like. Schema basically means template

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'} // ref user is saying I want the user model/object as we about to reference the user.
});

commentSchema.methods.isOwnedBy = function(user) { //have to use .methods
  return this.user && user._id.equals(this.user._id);//if user's comment id matches the id that I pass into this function. And we'll use this function for allowing users to delete only their comments.
};

const schema = new mongoose.Schema({
  title: { type: String, minlength: 2, required: true },
  image: { type: String, pattern: /^http/ },
  moreinfo: {type: String, maxlength: 360, required: true },
  comments: [ commentSchema ]
});
//module is always signualr and they will pluarlise it for us
module.exports = mongoose.model('Question', schema);
