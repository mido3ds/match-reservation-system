const express = require('express');
const seats = require('./seats');
const { matchSchema } = require('../schema');

const router = express.Router();

router.use('/:match_id/seats', seats);

router.get('/', (req, res) => {
	// TODO
});

router.get('/:match_id', (req, res) => {
	// TODO
});

router.post('/', (req, res) => {
	// TODO
});

router.put('/:match_id', (req, res) => {
	// TODO
});

module.exports = router;