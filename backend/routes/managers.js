const express = require('express');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  let users = await User.find({ role: "manager", isPending: true })
                        .select({ password: 0 })
                        .sort('createdIn')
                        .skip((req.query.page - 1) * pageSize)
                        .limit(pageSize)

  res.status(200).send(users);
});

router.post('/accept/:username', async (req, res) => {
  let username = req.params.username;
  let user = await User.findOne({ role: 'manager', isPending: true, username: username });
  if(!user)
    res.status(404).send({ err: 'No pending managers exist with the given username.'});
  else {
    user.isPending = false;
    await user.save();
    res.status(200).send( { msg: 'Manager accepted successfully!'});
  }
});

router.post('/reject/:username', async (req, res) => {
  let username = req.params.username;
  let user = await User.findOne({ role: 'manager', isPending: true, username: username });
  if(!user)
    res.status(404).send({ err: 'No pending managers exist with the given username.'});
  else {
    user.remove();
    res.status(200).send( { msg: 'Manager rejected successfully!'});
  }
});

module.exports = router;