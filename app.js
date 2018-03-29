require('dotenv').load();
const express = require('express');
const cors = require('cors')
const db = require('./db');  // mongo db connection
const {APP_SECRET} = require('./settings');

const app = express();

var whitelist = ['https://gatwedding.com', 'https://www.gatwedding.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

app.set('secretKey', APP_SECRET);

// require('./routes')(app);
require('./routes')(app);

module.exports = app;
