const mongoose = require('mongoose');
const express = require('express');
const { ticketSchema } = require('../schema');

const router = express.Router();
const Ticket = new mongoose.model('Ticket', ticketSchema);

router.delete('/:ticket_id', (req, res) => {
  // TODO
});

module.exports = router;