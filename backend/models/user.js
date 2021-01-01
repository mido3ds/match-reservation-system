const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, minlength: 5, maxlength: 50, lowercase: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  firstName: { type: String, required: true, minlength: 3, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 20 },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  city: { type: String, required: true, minlength: 3, maxlength: 15, lowercase: true },
  address: { type: String, required: true },
  email: { type: String, unique: true, required: true, minlength: 5, maxlength: 255, lowercase: true },
  role: { type: String, required: true , enum: ['fan', 'manager', 'admin'] },
  isPendding: { type: Boolean, default: true, required: true },
  createdIn: { type: Date, default: Date.now, required: true }
});

userSchema.methods.generateAuthToken = function() {
  const payload = { _id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, config.get('jwt_private_key'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    birthDate: Joi.date().required(),
    gender: Joi.string().valid(['male', 'female']).required(),
    city: Joi.string().min(3).max(15).required(),
    address: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    role: Joi.string().valid(['fan', 'manager', 'admin']).required()
  };
  
  return Joi.validate(user, schema);
}

function validateLoginUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  };
  
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLoginUser;