var express = require('express');
var db = require('./db');  // mongo db connection
var secrets = require('./config/secrets');


var app = express();

app.set('secretKey', secrets.APP_SECRET);

require('./routes')(app);


module.exports = app;
