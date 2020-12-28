const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // TODO
  // req.params.authtoken // req.params.page
  const pageSize = 10;
  const { error } = validateAuthentications()
  const users = User.find().sort('-createdIn').skip((req.params.page - 1) * pageSize).limit(pageSize);
  if (error) return res.status(400).send(error.details[0].message);
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