require('dotenv').load();
const express = require('express');
const db = require('./db');  // mongo db connection
const {APP_SECRET} = require('./settings');


const app = express();

app.set('secretKey', APP_SECRET);

// require('./routes')(app);
require('./routes')(app);

module.exports = app;
