const mongoose = require('mongoose');
const Joi = require('joi');
const { Ticket } = require('./ticket');

const rowsCount = 3;
const colsCount = 10;

let defaultSeatMap = [];
for(let i = 0; i < rowsCount; i++) {
  let rowLetter = String.fromCharCode('A'.charCodeAt(0) + i);
  let row = [];
  for(let j = 1; j <= colsCount; j++) {
    let seatCode = rowLetter + j;
    row.push({
      id: seatCode,
      isReserved: false
    })
  }
  defaultSeatMap.push(row);
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

matchSchema.post('remove', async (deletedMatch, next) => {
  let tickets = await Ticket.find({ matchUUID: deletedMatch._id });
  tickets.forEach(async (ticket) => await ticket.remove());
  next();
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
  }).validate(match);
}

exports.Match = Match;
exports.validateMatch = validateMatch;
exports.validateMatchEdit = validateMatchEdit;
