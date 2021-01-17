const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Ticket } = require('./ticket');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, minlength: 5, maxlength: 50, lowercase: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  firstName: { type: String, required: true, minlength: 3, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 20 },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  city: { type: String, required: true, minlength: 3, maxlength: 15, lowercase: true },
  address: { type: String , maxlength: 200},
  email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255, lowercase: true },
  role: { type: String, required: true, enum: ['fan', 'manager', 'admin'] },
  isPending: { type: Boolean, default: true, required: true },
  createdIn: { type: Date, default: Date.now, required: true }
});

userSchema.methods.generateAuthToken = function () {
  const payload = { _id: this.id, username: this.username, role: this.role, isPending: this.isPending };
  const token = jwt.sign(payload, config.get('jwt_private_key'));
  return [token, this.role];
}

userSchema.post('remove', async (deletedUser, next) => {
  let tickets = await Ticket.find({ username: deletedUser.username });
  tickets.forEach(async (ticket) => await ticket.remove());
  next();
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  return Joi.object({
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    birthDate: Joi.date().required().max('now'),
    gender: Joi.string().valid('male', 'female').required(),
    city: Joi.string().min(3).max(15).required(),
    address: Joi.string().allow('').optional().max(200),
    email: Joi.string().min(5).max(255).required().email(),
    role: Joi.string().valid('fan', 'manager', 'admin').required()
  }).validate(user);
}

function validateUpdatedUser(user) {
  return Joi.object({
    password: Joi.string().min(5).max(255).required(),
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    birthDate: Joi.date().required().max('now'),
    gender: Joi.string().valid('male', 'female').required(),
    city: Joi.string().min(3).max(15).required(),
    address: Joi.string().max(200),
    role: Joi.string().valid('fan', 'manager', 'admin').required()
  }).validate(user);
}

function validateLoginUser(user) {
  return Joi.object({
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  }).validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.validateUpdated = validateUpdatedUser;
exports.validateLogin = validateLoginUser;