const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', (req, res) => {
  res.status(200).send({success: true, message: 'User @list route'});
});

router.post('/', (req, res) => {
  res.status(200).send({success: true, message: 'User @create route.', data: req.body});
});

// example with token middleware
router.get('/:id', User.checkToken, (req, res) => {
  if (req.decoded.userId == req.params.id){
    res.status(200).send({success: true, message: 'User @retrieve route for id: ' + req.params.id, data: req.decoded});
  } else {
    res.status(403).send({success: false, message: 'User @retrieve route for id - not authorised to view user ' + req.params.id, data: req.decoded});
  }
});

router.delete('/:id', (req, res) => {
  res.status(200).send({success: true, message: 'User @destroy route for id: ' + req.params.id, data: req.body});
});

router.patch('/:id', (req, res) => {
  res.status(200).send({success: true, message: 'User @update route for id: ' + req.params.id, data: req.body});
});


module.exports = router;
