const mongoose = require('mongoose');
const Joi = require('joi');

const ticketSchema = mongoose.Schema({
  match_id: { type: String, required: true },
  user_id: { type: String, required: true },
  price: { type: Number, required: true },
  dateTime: { type: Date, default: Date.now , required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

function validateTicket(ticket) {
  // TODO
}

exports.Ticket = Ticket;
exports.validate = validateTicket;