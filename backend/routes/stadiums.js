const mongoose = require('mongoose');
const express = require('express');
const { stadiumSchema } = require('../schema');

const router = express.Router();
const Stadium = new mongoose.model('Stadium', stadiumSchema);

router.get('/', (req, res) => {
  // TODO
});

router.post('/', (req, res) => {
  // TODO
});

module.exports = router;