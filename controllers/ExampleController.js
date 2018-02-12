const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());