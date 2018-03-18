const express = require('express');
const db = require('./db');  // mongo db connection
const secrets = require('./config/secrets');


const app = express();

app.set('secretKey', secrets.APP_SECRET);

require('./routes')(app);


module.exports = app;
