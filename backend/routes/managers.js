const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { userSchema } = require('../schema');
const User = new mongoose.model('User', userSchema);

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