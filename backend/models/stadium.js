const mongoose = require('mongoose');
const Joi = require('joi');

const stadiumSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

function validateStadium(stadium) {
  // TODO
}

exports.Stadium = Stadium;
exports.validate = validateStadium;