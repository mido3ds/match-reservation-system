const mongoose = require('mongoose');
const Joi = require('joi');

const ticketSchema = mongoose.Schema({
  matchUUID: { type: String, required: true },
  seatID: {type: String, required: true},
  username: { type: String, required: true },
  price: { type: Number, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);


function validateTicket(ticket) {
  return Joi.object({
    matchUUID: Joi.string().required().custom((value, helpers) => {
      if(mongoose.Types.ObjectId.isValid(value)) return value;
      return helpers.message('Invalid match id');
    }),
    seatID: Joi.string().required().custom((value, helpers) => {
      let valid = value.length === 2 && ['A', 'B', 'C'].includes(value[0]) && value[1] >= 1 && value[1] <= 10;
      if(valid) return value;
      return helpers.message('Invalid seat id');
    }),
    username: Joi.string().min(5).max(50).required()
  }).validate(ticket);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;