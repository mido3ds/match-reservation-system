const express = require('express');
const { ticketSchema, matchSchema } = require('../schema');

const router = express.Router();

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