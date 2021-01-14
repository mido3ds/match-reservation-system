const mongoose = require('mongoose');
const Joi = require('joi');
const { validate } = require('./user');

const rowsCount = 5;
const colsCount = 5;

let defaultSeatMap = {}
for(let i = 0; i < rowsCount; i++) {
  let rowLetter = String.fromCharCode('A'.charCodeAt(0) + i);
  for(let j = 1; j <= colsCount; j++) {
    let seatCode = rowLetter + j;
    defaultSeatMap[seatCode] = false;
  }
}

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  venue: { type: String, required: true },
  dateTime: { type: Date, required: true },
  mainReferee: { type: String, required: true },
  firstLinesman: { type: String, required: true },
  secondLinesman: { type: String, required: true },
  ticketPrice: { type: Number, required: true},
  seatMap: { type: Object, min: 0, default: defaultSeatMap }
});

const Match = mongoose.model('Match', matchSchema);

function validateMatch(match) {
  return Joi.object({
    homeTeam: Joi.string().min(3).max(20).required(),
    awayTeam: Joi.string().min(3).max(20).required(),
    venue: Joi.string().min(5).max(50).required(),
    dateTime: Joi.date().required().min('now'),
    mainReferee: Joi.string().min(5).max(50).required(),
    firstLinesman: Joi.string().min(5).max(50).required(),
    secondLinesman: Joi.string().min(5).max(50).required(),
    ticketPrice: Joi.number().min(1).required(),
    seatMap: Joi.object().optional()
  }).validate(match);
}

function validateMatchEdit(match) {
  return Joi.object({
    homeTeam: Joi.string().min(3).max(20).optional(),
    awayTeam: Joi.string().min(3).max(20).optional(),
    venue: Joi.string().min(5).max(50).optional(),
    dateTime: Joi.date().optional().min('now'),
    mainReferee: Joi.string().min(5).max(50).optional(),
    firstLinesman: Joi.string().min(5).max(50).optional(),
    secondLinesman: Joi.string().min(5).max(50).optional(),
    ticketPrice: Joi.number().min(1).optional(),
    seatMap: Joi.object().optional()
  }).validate(match);
}

exports.Match = Match;
exports.validateMatch = validateMatch;
exports.validateMatchEdit = validateMatchEdit;
