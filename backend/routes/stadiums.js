const express = require('express');
const { Stadium, validate } = require('../models/stadium');
const auth = require('../middleware/auth');
const manager = require('../middleware/manager');
const _ = require('lodash');

const router = express.Router();

router.get('/', async (req, res) => {
  const pageSize = 10;
  if (req.params.page < 1) return res.status(406).send('not acceptable page < 1');

  const stadiums = await Stadium
    .aggregate([{
      $project: {
        _id: 0, uuid: "$_id",
        name: 1, city: 1,
      }
    }])
    .skip((req.query.page - 1) * pageSize)
    .limit(pageSize)

  res.send(stadiums);
});

router.post('/', [auth, manager], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  let stadium = await Stadium.findOne({ name: req.body.name });
  if (stadium) return res.status(403).send('This stadium already exists.');

  const to_pick = ['name', 'city'];
  stadium = new Stadium(_.pick(req.body, to_pick));
  console.log(stadium);

  await stadium.save();
  res.send({})
});

module.exports = router;