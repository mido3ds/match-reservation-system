const mongoose = require('mongoose');
const express = require('express');
const { userSchema } = require('../schema');

const router = express.Router();
const User = new mongoose.model('User', userSchema);

router.post('/', (req, res) => {
  // TODO
});

module.exports = router;