const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateLogin } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send({ err: error.details[0].message });

  let user = await User.findOne({ username: req.body.username, isPending: false });
  if (!user) return res.status(400).send({ err: 'Invalid username or password!' });

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) return res.status(400).send({ err: 'Invalid username or password!' });

  const [authToken, userType] = user.generateAuthToken();

  res.status(200).send({ authToken, userType, msg:'Successfull Login' });
});

module.exports = router;