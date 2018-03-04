var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var _ = require('lodash');
var User = require('../models/User');
var secrets = require('../config/secrets');


var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/register', (req, res) => {
  // return res.status(200).send({msg: 'Auth @register route.', req: req.body});
  if (!req.body.password) {
    return res.status(400).send({ success: false, 
                                  message: 'Password missing in request', 
                                  data: req.body });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }, (err, user) => {
      if (err) {
        return res.status(400).send({ success: false, 
                                      message: 'There was a problem adding the information to the database.', 
                                      data: req.body, 
                                      error: err.message });
      } 

      const token = jwt.sign({ id: user._id }, secrets.APP_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      // remove password in user object before returning
      const returnUser = JSON.parse(JSON.stringify(user));
      delete returnUser.password;

      return res.status(201).send({success: true, 
                                   message: 'New user successfully created', 
                                   data: returnUser,
                                   token: token});
      }
  );
});


router.post('/login', (req, res) => {

  if ((!req.body.username && !req.body.email) || !req.body.password) {
    return res.status(400).send({ success: false, 
                                  message: 'Missing data for authentication', 
                                  data: req.body });
  } 
    
  if (req.body.email) {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(400).send({ success: false, 
                                      message: 'User with that email not found', 
                                      data: req.body });
      } 
      sendTokenAndUser(req, res, user);
    });
  } else if (req.body.username) {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(400).send({ success: false, 
                                      message: 'User with that username not found', 
                                      data: req.body });
      }
      sendTokenAndUser(req, res, user);
    });
  }
});


sendTokenAndUser = (req, res, user) => {
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(200).send({ success: false, 
                                  message: 'Incorrect password.', 
                                  data: req.body });
  }

  const token = jwt.sign({ id: user._id }, secrets.APP_SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });
  
  // remove password in user object before returning
  const returnUser = JSON.parse(JSON.stringify(user));
  delete returnUser.password;

  return res.status(200).send({ success: true, 
                                message: 'Successfully logged in.', 
                                data: returnUser, 
                                token: token });
}


module.exports = router;
