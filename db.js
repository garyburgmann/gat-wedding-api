var mongoose = require('mongoose');
var mongo = require('./config/mongo');


mongoose.connect(mongo.MONGO_URI);
