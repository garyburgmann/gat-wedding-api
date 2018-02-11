var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({  
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  is_admin: Boolean
});


mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
