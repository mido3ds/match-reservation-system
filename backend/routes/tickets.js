const express = require('express');
const { ticketSchema } = require('../schema');

const router = express.Router();

router.delete('/:ticket_id', (req, res) => {
  // TODO
});

module.exports = router;