const mongoose = require('mongoose');
const express = require('express');
const { userSchema } = require('../schema');

const router = express.Router();
const User = new mongoose.model('User', userSchema);

router.get('/', (req, res) => {
	// TODO
});

router.post('/', (req, res) => {
	// TODO
});

router.put('/:username', (req, res) => {
	// TODO
});

router.delete('/:username', (req, res) => {
	// TODO
});

module.exports = router;