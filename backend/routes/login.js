const bcrypt = require('bcrypt');
const express = require('express');
const {User, validateLogin} = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password!');
  
  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) return res.status(400).send('Invalid username or password!');

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;