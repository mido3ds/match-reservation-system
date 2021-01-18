const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Match } = require('../models/match');
const { Ticket } = require('../models/ticket');
const { notifyClients } = require('./seats_live_updates');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const pageSize = 8;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  let tickets;
  try {
    // Get tickets per user per page
    tickets = await Ticket.find({ username: req.user.username })
                              .skip((req.query.page - 1) * pageSize)
                              .limit(pageSize);
  } catch(err) {
    return res.status(500).send({ err: err.message });
  }

  // Extract unique match uuids
  let matchUUIDs = new Set();
  tickets = tickets.map( ticket => {
    matchUUIDs.add(ticket.matchUUID);
    return {...ticket.toObject(), uuid: ticket._id};
  });

  let matches, totalTickets;
  try {
    matches = await Match.find({ _id: Array.from(matchUUIDs) }).select({ seatMap: 0});
    totalTickets = await Ticket.countDocuments({ username: req.user.username });
  } catch(err) {
    return res.status(500).send({ err: err.message });
  }

  matches = matches.map( match => {
    return {...match.toObject(), uuid: match._id};
  });
  
  let has_next = (req.query.page - 1) * pageSize + tickets.length < totalTickets;

  res.status(200).send({
    has_next: has_next,
    tickets: tickets,
    matches: matches
  });
});

router.get('/:match_id', auth, async (req, res) => {
  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});

  let tickets;
  try {
    let match = await Match.findById(matchID).select({ seatMap: 0});
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});

    tickets = await Ticket.find({ username: req.user.username, matchUUID: matchID });
  } catch(err) {
    return res.status(500).send({ err: err.message });
  }

  tickets = tickets.map( ticket => {
    return {...ticket.toObject(), uuid: ticket._id};
  });

  res.status(200).send(tickets);
});

router.delete('/:ticket_id', auth, async (req, res) => {
  let ticketID = req.params.ticket_id;
  if(!mongoose.Types.ObjectId.isValid(ticketID))
    return res.status(400).send({ err: 'Invalid ticket ID format.'});

  let ticket, match;
  try {
    ticket = await Ticket.findOne({ _id: ticketID });
    match = await Match.findById(ticket.matchUUID).select({ seatMap: 1, dateTime: 1 });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }

  if (!ticket)
    return res.status(404).send({ err: 'Ticket to delete is not found'});

  let daysBeforeMatch = (match.dateTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if(daysBeforeMatch < 3)
    return res.status(400).send({ err: 'Cannot cancel a ticket of a match that is less than 3 days away!'});

  let seatMap = match.seatMap;
  let row = ticket.seatID.charCodeAt(0) - 'A'.charCodeAt(0);
  let col = ticket.seatID.substring(1) - 1;

  console.assert(seatMap[row][col].id === ticket.seatID, 'Seat ID wrong index calculation');
  console.assert(seatMap[row][col].isReserved === true, 'Seat must be already reserved');

  let updateCondition = {}
  updateCondition['seatMap.' + row + '.' + col + '.isReserved'] = false;

  try {
    await Match.updateOne({ _id: match._id }, { $set: updateCondition });
    await ticket.remove();
    res.status(200).send({ msg: 'Ticket for seat ' + ticket.seatID + ' deleted successfully!' });
    notifyClients(ticket.matchUUID, ticket.seatID, false);
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;