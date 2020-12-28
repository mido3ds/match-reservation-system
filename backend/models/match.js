const mongoose = require('mongoose');
const Joi = require('joi');

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  venue: { type: String, required: true },
  dateTime: { type: Date, required: true },
  mainReferee: { type: String, required: true },
  firstLinesman: { type: String, required: true },
  secondLinesman: { type: String, required: true },
  freeSeats: { type: Number, min: 0, required: true }
});

const Match = mongoose.model('Match', matchSchema);

function validateMatch(match) {
  // TODO
}

exports.Match = Match;
exports.validate = validateMatch;
