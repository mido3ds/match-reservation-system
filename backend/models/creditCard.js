const Joi = require('joi');

function validateCreditCard(creditCard) {
  return Joi.object({
    creditCardNumber: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
    pin: Joi.string().length(4).pattern(/^[0-9]+$/).required()
  }).validate(creditCard);
}

exports.validateCreditCard = validateCreditCard;