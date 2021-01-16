const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  // TODO
});

router.get('/match_id', auth, async (req, res) => {
  // TODO
});

router.delete('/:ticket_id', async (req, res) => {
  // TODO
});

module.exports = router;