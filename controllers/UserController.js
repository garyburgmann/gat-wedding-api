var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/User');


var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.status(200).send('User @list route');
});

router.post('/', function (req, res) {
  res.status(200).send('User @create route');
});

router.get('/:id', function (req, res) {
  res.status(200).send('User @retrieve route for id: ' + req.params.id);
});

router.delete('/:id', function (req, res) {
  res.status(200).send('User @destroy route for id: ', req.params.id);
});

router.patch('/:id', function (req, res) {
  res.status(200).send('User @update route for id: ', req.params.id);
});


module.exports = router;
