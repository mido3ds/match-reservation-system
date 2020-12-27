const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 20, lowercase: true },
  password: { type: String, required: true, minlength: 5, maxlength: 20 },
  firstName: { type: String, required: true, minlength: 3, maxlength: 10 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 10 },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  city: { type: String, required: true, minlength: 2, maxlength: 15, lowercase: true },
  address: { type: String, required: true },
  email: { type: String, required: true, minlength: 7, lowercase: true },
  role: { type: String, required: true , enum: ['fan', 'manager'] }
});

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  venue: { type: String, required: true },
  dateTime: { type: Date, required: true },
  mainReferee: { type: String, required: true },
  firstLinesman: { type: String, required: true },
  secondLinesman: { type: String, required: true },
  freeSeats: { type: Number, min: 0, required: true }
});

const stadiumSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
});

const ticketSchema = mongoose.Schema({
  match_id: { type: String, required: true },
  user_id: { type: String, required: true },
  price: { type: Number, required: true },
  dateTime: { type: Date, default: Date.now , required: true },
});

module.exports = {userSchema, matchSchema, stadiumSchema, ticketSchema};