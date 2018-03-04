var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var secrets = require('../config/secrets');


var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, hide: true},
  is_admin: Boolean
});


mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
