const mongoose = require('mongoose');
const { MONGO } = require('./settings');


mongoose.connect(MONGO.MONGO_URI);