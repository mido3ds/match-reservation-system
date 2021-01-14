const express = require('express');
const mongoose = require('mongoose');
const { Stadium, validate } = require('../models/stadium');
const auth = require('../middleware/auth');
const manager = require('../middleware/manager');
const _ = require('lodash');

const router = express.Router();

router.get('/', async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  try {
    const stadiums = await Stadium
      .aggregate([{
        $project: {
          _id: 0, uuid: "$_id",
          name: 1, city: 1,
        }
      }])
      .skip((req.query.page - 1) * pageSize)
      .limit(pageSize);

    let totalStadiums = await Stadium.countDocuments();
    let has_next = (req.query.page - 1) * pageSize + stadiums.length < totalStadiums;
    res.status(200).send({
      has_next: has_next,
      stadiums: stadiums
    });
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.post('/', [auth, manager], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(403).send({ err: error.details[0].message });

  try {
    let stadium = await Stadium.findOne({ name: req.body.name });
    if (stadium) return res.status(403).send({ err: 'This stadium already exists.' });

    const to_pick = ['name', 'city'];
    stadium = new Stadium(_.pick(req.body, to_pick));

    await stadium.save();
    res.status(200).send({ msg: 'Stadium added successfully' });
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.delete('/:stadium_id', async (req, res) => {
  let stadiumID = req.params.stadium_id;
  if(!mongoose.Types.ObjectId.isValid(stadiumID))
    return res.status(400).send({ err: 'Invalid stadium ID format.'});
  try {
    const info = await Stadium.deleteOne({ _id: stadiumID });
    if (info.deletedCount == 0) return res.status(404).send({ err: 'Stadium to delete is not found'});
    if (info.deletedCount && info.ok) return res.status(200).send({ msg: 'Stadium deleted successfully!' });
    res.status(500).send({ err: 'Stadium could not be deleted.'});
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;