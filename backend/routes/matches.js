const express = require('express'),
	router = express.Router();

const seats = require('./seats');

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