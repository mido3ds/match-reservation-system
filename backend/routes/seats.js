const express = require('express');
const { assert } = require('joi');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Match } = require('../models/match');
const { validate, Ticket } = require('../models/ticket');

const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});
  
  let match;
  try {
    match = await Match.findById(matchID).select({ _id: 0, seatMap: 1});
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});
  } catch (err) {
    return res.status(500).send({ err: err.msg });
  }

  let seatMap = match.seatMap;
  res.status(200).send(seatMap);
});

router.post('/reserve/:seat_id', auth, async (req, res) => {
  // TODO: verify credit card number and pin
  let ticket = {
    matchUUID: req.params.match_id,
    username: req.user.username,
    seatID: req.params.seat_id
  }
  const { error } = validate(ticket);  
  if (error) 
    return res.status(403).send({ err: error.details[0].message });

  let match;
  try {
    match = await Match.findById(ticket.matchUUID).select({ seatMap: 1, ticketPrice: 1 });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.msg });
  }
    
  if(!match) {
    return res.status(404).send({ err: 'No matches exist the given uuid.'});
  }

  let row = ticket.seatID.charCodeAt(0) - 'A'.charCodeAt(0);
  let col = ticket.seatID[1] - 1;

  let seatMap = match.seatMap;
  console.assert(seatMap[row][col].id === ticket.seatID, 'Seat ID wrong index calculation');

  if(seatMap[row][col].isReserved)
    return res.status(409).send({ err: 'Ticket already booked.'});
  else {
    seatMap[row][col].isReserved = true;
  }

  try {  
    await Match.updateOne({ _id: match._id }, { $set: { seatMap: seatMap } });
    ticket = new Ticket(ticket);
    ticket.price = match.ticketPrice;
    await ticket.save();
    res.status(200).send( { msg: 'Ticket for seat ' + ticket.seatID + ' booked successfully.'});
  } catch (err) {
    res.status(500).send({ err: err.msg });
  }
});

module.exports = router;