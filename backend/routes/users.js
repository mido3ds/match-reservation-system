const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

/***
 * get /users (get all users (not pendding)) (only by admin)
 * get /users/me (get my info) (any type of user)
 * post /users (register user) (anyone)
 * put /users/me (edit my info) (anyone)
 * delete /users/:username  (delete user) (only by admin)
 */

router.get('/', [auth, admin], async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  const users = await User.find({ isPending: false }).select('-password').sort('-createdIn').skip((req.query.page - 1) * pageSize).limit(pageSize);

  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  console.log('works');
  if (error) return res.status(400).send({ err: error.details[0].message });
  console.log(req.body.username);
  console.log(req.body.email);
  let user;
  try {
    user = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    });
  } 
  catch (error) {
    return res.status(400).send({ err: error.message });
  }

  if (user) return res.status(400).send({ err: 'This username or/and email is already registered.' });

  const to_pick = ['username', 'password', 'firstName', 'lastName',
    'birthDate', 'gender', 'city', 'address', 'email', 'role'];

  user = _.pick(req.body, to_pick);
  let msg = "";
  if (req.body.role === 'fan') {
    user = { ...user, isPending: false };
    msg = `Welcome, ${user.firstName} ${user.lastName}`;
  }
  else {
    user = { ...user, isPending: true };
    msg = `Welcome, ${user.firstName} ${user.lastName}, your management request is pending!`;
  }


  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = new User(user);

  try {
    await user.save();
  } 
  catch (err) {
    return res.status(400).send({ err: error.message });
  }


  const authToken = user.generateAuthToken();

  res.send({ authToken, msg });
});

router.put('/me', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ err: error.details[0].message });

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