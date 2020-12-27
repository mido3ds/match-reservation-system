const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  birthDate: String,
  gender: String,
  city: String,
  address: String,
  email: String,
});

const matchSchema = new mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  venue: String,
  dateTime: {type: Date, default: Date.now},
  mainReferee: String,
  firstLinesman: String,
  secondLinesman: String,
});

const stadiumSchema = mongoose.Schema({
  name: String,
  city: String,
});

const ticketSchema = mongoose.Schema({
  match_id: String,
  user_id: String,
  price: Number,
  dateTime: {type: Date, default: Date.now},
});

module.exports = {userSchema, matchSchema, stadiumSchema, ticketSchema};