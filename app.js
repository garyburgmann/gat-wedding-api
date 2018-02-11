var express = require('express');
var db = require('./db');  // mongo db connection


var app = express();

var UserController = require('./controllers/UserController');
app.use('/users', UserController);

module.exports = app;
