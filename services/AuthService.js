const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../settings');


module.exports = {

  setToken: (payload) => {
    // console.log(payload, APP_SECRET);
    return jwt.sign(payload, APP_SECRET, {
      expiresIn: 60 * 60 * 4 // expires in 4 hours - in seconds
    });
    // console.log(token);
    // return token;
  },

  checkToken: (token) => {
    return jwt.verify(token, APP_SECRET, (err, decoded) => {
      return {err, decoded};
    });
  },

  setPassword: (password) => {
    return bcrypt.hashSync(password, 8);
  },

  checkPassword: (input, password) => {
    return bcrypt.compareSync(input, password);
  }

};
