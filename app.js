var express = require('express');
var db = require('./db');  // mongo db connection
var keys = require('./env/keys');


var app = express();

app.set('secretKey', keys.APP_SECRET);

require('./routes')(app);


module.exports = app;
