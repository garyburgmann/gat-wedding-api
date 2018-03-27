var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  is_admin: Boolean
});


module.exports = mongoose.model('User', UserSchema);
