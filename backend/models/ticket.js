const mongoose = require('mongoose');
const Joi = require('joi');

const ticketSchema = mongoose.Schema({
  matchUUID: { type: String, required: true },
  seatID: {type: String, required: true},
  username: { type: String, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);


function validateTicket(ticket) {
  return Joi.object({
    matchUUID: Joi.string().required().custom(mongoose.Types.ObjectId.isValid, 'Must be a valid uuid'),
    seatID: Joi.string().required().custom(value => {
      return value.length === 2 && ['A', 'B', 'C'].includes(value[0]) && value[1] >= 1 && value[1] <= 10;
    }, 'Must be a valid seat code'),
    username: Joi.string().min(5).max(50).required(),
    price:  Joi.number().min(1).required()
  }).validate(match);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;