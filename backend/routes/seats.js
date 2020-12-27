const mongoose = require('mongoose');
const express = require('express');
const { ticketSchema, matchSchema } = require('../schema');

const router = express.Router();
const Match = new mongoose.model('Match', matchSchema);
const Ticket = new mongoose.model('Ticket', ticketSchema);

router.get('/', (req, res) => {
  // TODO
});

router.post('/reserve/:seat_id', (req, res) => {
  // TODO
});

router.delete('/:seat_id', (req, res) => {
  // TODO
});

module.exports = router;