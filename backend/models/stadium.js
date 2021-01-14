const mongoose = require('mongoose');
const Joi = require('joi');
const { Match } = require('./match');
const { remove } = require('lodash');

const stadiumSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
});


stadiumSchema.post('remove', async (deletedStadium, next) => {
  let matches = await Match.find({ venue: deletedStadium.name });
  matches.forEach(async (match) => { await match.remove(); });
  next();
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

function validateStadium(stadium) {
  return Joi.object({
    name: Joi.string().min(5).max(50).required(),
    city: Joi.string().min(3).max(50).required(),
  }).validate(stadium);
}

exports.Stadium = Stadium;
exports.validate = validateStadium;