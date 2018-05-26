var mongoose = require('mongoose');


var RSVPSchema = new mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  attendance: { type: Boolean, required: true },
  noSeafood: { type: Boolean, required: true },
  seafood: { type: Boolean, required: true },
  vegetarian: { type: Boolean, required: true },
  specialDietary: { type: String },
  extraNotes: { type: String },
});


module.exports = mongoose.model('RSVP', RSVPSchema);