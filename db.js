var mongoose = require('mongoose');
var keys = require('./env/keys');


mongoose.connect(keys.MONGO_URI);
