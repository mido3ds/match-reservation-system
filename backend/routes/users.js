const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { User, validate, validateUpdated } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

/***
 * get /users (get all users (not pendding)) (only by admin) (Tested)
 * get /users/me (get my info) (any type of user) (Tested)
 * post /users (register user) (anyone) (Tested)
 * put /users/me (edit my info) (anyone)
 * delete /users/:username  (delete user) (only by admin) (Tested)
 */

router.get('/', [auth, admin], async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });
  let users, totalConfirmedUsers;
  try {
    users = await User.find({ isPending: false, role: { $ne: 'admin'} })
                            .select('-password')
                            .sort('-createdIn')
                            .skip((req.query.page - 1) * pageSize)
                            .limit(pageSize);
    totalConfirmedUsers = await User.countDocuments({ isPending: false, role: { $ne: 'admin'} });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
  if (totalConfirmedUsers == 0) return res.status(404).send({err: 'No Users Found'});
  let has_next = (req.query.page - 1) * pageSize + users.length < totalConfirmedUsers;
  res.status(200).send({
    has_next: has_next,
    users: users
  });
});

router.get('/me', auth, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user._id).select('-password -isPending');
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
  if (user) return res.status(200).send(user);
  return res.status(404).send({err: 'User Not Found'});
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send({ err: error.details[0].message });
  let user;
  try {
    user = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    });
  } catch (err) {
    return res.status(500).send({ err: err.message });
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
    return res.status(500).send({ err: err.message });
  }

  if (user.isPending) return res.status(200).send({ msg });

  const authToken = user.generateAuthToken();
  res.status(200).send({ authToken, msg });
});

router.put('/me', auth, async (req, res) => {
  const to_pick = ['password', 'firstName', 'lastName', 'birthDate', 'gender', 'city', 'address', 'role'];
  let user = _.pick(req.body, to_pick);

  const { error } = validateUpdated(user);
  if (error) return res.status(400).send({ err: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  let logout = false;
  try {
    if (req.user.role !== user.role) {
      user.isPending = (req.user.role !== "fan");
      logout = true;
    }
    user = await User.findByIdAndUpdate(req.user._id, user, {new: true}).select('-password');
  }
  catch (err) {
    return res.status(500).send({ err: err.message });
  }

  res.status(200).send({logout, user});
});

router.delete('/:username', [auth, admin], async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).send({ err: 'User to delete is not found'});
    await user.remove();
    res.status(200).send({ msg: 'User deleted successfully!' });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;