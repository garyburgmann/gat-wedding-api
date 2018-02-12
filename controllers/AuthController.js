var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/User');


var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/register', (req, res) => {
  // return res.status(200).send({msg: 'Auth @register route.', req: req.body});
  if (req.body.password) {
    req.body.password = User.setPassword(req.body.password);
  
    User.create(req.body, (err, user) => {
        if (err) {
          res.status(400).send({success: false, message: 'There was a problem adding the information to the database.', data: req.body, error: err.message});
        } 
        res.status(200).send({success: true, message: 'New user successfully created', user});
        }
    );
  } else {
    res.status(400).send({success: false, message: 'Password missing in request', data: req.body});
  }
});


router.post('/login', (req, res) => {

  if ((!req.body.username && !req.body.email) || !req.body.password) {
    res.status(400).send({ success: false, message: 'Missing data for authorization', data: req.body });
  } else {
    if (req.body.email) {
      User.loginByEmail(req, res);
    } else if (req.body.username) {
      User.loginByUsername(req, res);
    }
  }
});


module.exports = router;
