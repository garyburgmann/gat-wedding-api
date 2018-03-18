const mongoose = require('mongoose');
const mongo = require('./config/mongo');


mongoose.connect(mongo.MONGO_URI);