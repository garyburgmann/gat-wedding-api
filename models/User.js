var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({  
  first_name: String,
  last_name: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: Boolean
});


mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
