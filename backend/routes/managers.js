const express = require('express');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  let users, totalManagerRequests;
  try {
    users = await User.find({ role: "manager", isPending: true })
                          .select({ password: 0 })
                          .sort('createdIn')
                          .skip((req.query.page - 1) * pageSize)
                          .limit(pageSize);

    totalManagerRequests = await User.countDocuments({ role: "manager", isPending: true });
  } catch(err) {
    return res.status(500).send({ err: err.message });
  }

  let has_next = (req.query.page - 1) * pageSize + users.length < totalManagerRequests;
  res.status(200).send({
    has_next: has_next,
    requestedManagers: users
  });
});

router.post('/accept/:username', async (req, res) => {
  let username = req.params.username;
  try {
    let user = await User.findOne({ role: 'manager', isPending: true, username: username });
    if(!user)
      res.status(404).send({ err: 'No pending managers exist with the given username.'});
    else {
      user.isPending = false;
      await user.save();
      res.status(200).send( { msg: 'Manager accepted successfully!'});
    }
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.post('/reject/:username', async (req, res) => {
  let username = req.params.username;
  try {
    let user = await User.findOne({ role: 'manager', isPending: true, username: username });
    if(!user)
      res.status(404).send({ err: 'No pending managers exist with the given username.'});
    else {
      user.remove();
      res.status(200).send( { msg: 'Manager rejected successfully!'});
    }
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;