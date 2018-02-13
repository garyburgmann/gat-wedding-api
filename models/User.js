var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt');
var keys = require('../env/keys');
let mongooseHidden = require('mongoose-hidden')()


var UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, hide: true},
  is_admin: Boolean
});

UserSchema.plugin(mongooseHidden)
UserSchema.set('toJSON',
  {
    virtuals: true,
    transform: (doc, ret, options) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
          delete ret.password;
          return ret;
  }
});

UserSchema.statics.setPassword = (password) => {
  return bcrypt.hashSync(password, 4);
};

UserSchema.methods.checkPassword = (pw, hash) => {
  return bcrypt.compareSync(pw, hash);
}

UserSchema.methods.setToken = (id) => {
  const payload = {
    userId: `${id}`
  };
  const token = jwt.sign(payload, keys.APP_SECRET, {
    expiresIn: '1h' // expires in 24 hours
  });

  return token;
};

UserSchema.statics.checkToken = (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts[0] == 'Bearer' || parts[0] == 'Token') {
      token = parts[1];
      // console.log(token);
    } else {
      res.status(400).send({msg: 'Bearer or Token required', data: parts[0]});
    }
  } else if (req.body.token || req.query.token) {
    token = req.body.token || req.query.token;
  } else {
    res.status(400).send({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, keys.APP_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).send({ success: false, message: 'Failed to authenticate token.' });
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    }
  });
}

UserSchema.statics.loginByEmail = (password, email) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err || !user) {
      res.status(400).send({ success: false, message: 'Email not found', data: req.body });
    } else {
      const token = user.setToken(user);
      res.status(200).send({ success: true, message: 'Email found.', data: {user: user, token: token}});
    }
  });
}

UserSchema.statics.loginByEmail = (req, res) => {
  mongoose.model('User').findOne({
    email: req.body.email
  }, (err, user) => {
    if (err || !user) {
      res.status(400).send({ success: false, message: 'Email not found', data: req.body });
    } else if (!user.checkPassword(req.body.password, user.password)) {
      res.status(403).send({ success: false, message: 'Incorrect password', data: req.body });
    } else {
      const token = user.setToken(user.id);
      res.status(200).send({ success: true, message: 'Email found.', data: {user: user, token: token}});
    }
  });
}

UserSchema.statics.loginByUsername = (req, res) => {
  mongoose.model('User').findOne({
    username: req.body.username
  }, (err, user) => {
    if (err || !user) {
      res.status(400).send({ success: false, message: 'Username not found', data: req.body });
    } else if (!user.checkPassword(req.body.password, user.password)) {
      res.status(403).send({ success: false, message: 'Incorrect password', data: req.body });
    } else {
      const token = user.setToken(user.id);
      user = user.toJSON();
      res.status(200).send({ success: true, message: 'Username found.', data: {user, token}});
    }
  });
}


mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
