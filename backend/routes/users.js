const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const {User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  const pageSize = 10;
  if (req.params.page < 1) return res.status(406).send('not acceptable page < 1');

  const users = await User.find().select('-password').sort('-createdIn').skip((req.query.page - 1) * pageSize).limit(pageSize);

  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ $or: [
    {username: req.body.username},
    {email: req.body.email}
  ]});

  if (user) return res.status(400).send('This username or/and email is already registered.');

  const to_pick = ['username', 'password', 'firstname', 'lastName',
    'birthDate', 'gender', 'city', 'address', 'email', 'role'];

  user = new User(_.pick(req.body, to_pick));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(`Welcome, ${user.firstname} ${user.lastname}`);
});

router.put('/edit', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const to_pick = ['password', 'firstname', 'lastName', 'birthDate', 'gender', 'city', 'address'];

  user = new User(_.pick(req.body, to_pick));

  const user = await User.findByIdAndUpdate(req.user._id, user).select('-password');

  res.send(user);
});

router.delete('/:username', [auth, admin], async (req, res) => {
  const user = await User.deleteOne({ username: req.params.username });
  res.send(user);
});

module.exports = router;