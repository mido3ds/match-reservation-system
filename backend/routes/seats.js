const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Match } = require('../models/match');
const { validate } = require('../models/ticket');

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
  let ticket = {
    matchUUID: req.params.match_id,
    username: req.user.username,
    seatID: req.params.set_id,
  }
  const { error } = validate(matchEdit);  
  if (error) 
    return res.status(403).send({ err: error.details[0].message });
  
  try {
    let match = await Match.findById(matchID).select({ _id: 0, seatMap: 1});
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});

    for(let i = 0; i < match.seatMap.length; i++) {
      for(let j = 0; j < match.seatMap[0].legnth; j++) {
        if(match.seatMap[i][j].id == ticket.seatID) {
          if(match.seatMap[i][j].isReserved)
            return res.status(409).send({ err: 'Ticket already booked.'});
          else
            match.seatMap[i][j].isReserved = true;
        }
      }
    }
    
    await match.save();
    ticket.price = match.price;
    res.status(200).send( { msg: 'Ticket booked successfully.'});
  } catch (err) {
    res.status(500).send({ err: err.msg });
  }
});

module.exports = router;