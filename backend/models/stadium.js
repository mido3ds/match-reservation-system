const mongoose = require('mongoose');
const Joi = require('joi');
const { Match } = require('./match');

const stadiumSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  rows: { type: Number, requireed: true, min: 1, max: 4 },
  seatsPerRow: { type: Number, required: true, min: 5, max: 10 },
});


stadiumSchema.post('remove', async (deletedStadium, next) => {
  let matches = await Match.find({ venue: deletedStadium.name });
  matches.forEach(async (match) => await match.remove());
  next();
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

function validateStadium(stadium) {
  return Joi.object({
    name: Joi.string().min(5).max(50).required(),
    city: Joi.string().min(3).max(50).required(),
    rows: Joi.number().min(1).max(4).required(),
    seatsPerRow: Joi.number().min(5).max(10).required(),
  }).validate(stadium);
}

exports.Stadium = Stadium;
exports.validate = validateStadium;