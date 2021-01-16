const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Match } = require('../models/match');

const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});
  
  try {
    let match = await Match.findById(matchID).select({ _id: 0, seatMap: 1});
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});

    let seatMap = match.seatMap;
    res.status(200).send(seatMap);
  } catch (err) {
    res.status(500).send({ err: err.msg });
  }
});

router.post('/reserve/:seat_id', auth, async (req, res) => {
  // TODO
});

module.exports = router;