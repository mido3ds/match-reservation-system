const express = require('express');
const router = express.Router();

const { userSchema } = require('../schema');

router.get('/', (req, res) => {
  // TODO
});

router.post('/accept/:username', (req, res) => {
  // TODO
});

router.post('/reject/:username', (req, res) => {
  // TODO
});

module.exports = router;