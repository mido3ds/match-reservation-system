const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Match } = require('../models/match');
const { Ticket } = require('../models/ticket');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  try {
    // Get tickets per user per page
    let tickets = await Ticket.find({ username: req.user.username })
                              .skip((req.query.page - 1) * pageSize)
                              .limit(pageSize);

    // Extract unique match uuids
    let matchUUIDs = new Set();
    tickets = tickets.map( ticket => {
      matchUUIDs.add(ticket.matchUUID);
      return {...ticket.toObject(), uuid: ticket._id};
    });

    // Get related matches
    let matches = await Match.find({ _id: Array.from(matchUUIDs) }).select({ seatMap: 0});
    matches = matches.map( match => {
      return {...match.toObject(), uuid: match._id};
    });

    let totalTickets = await Ticket.countDocuments({ username: req.user.username });
    let has_next = (req.query.page - 1) * pageSize + tickets.length < totalTickets;

    res.status(200).send({
      has_next: has_next,
      tickets: tickets,
      matches: matches
    });
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.get('/:match_id', auth, async (req, res) => {
  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});

  try {
    let match = await Match.findById(matchID).select({ seatMap: 0});
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});

    let tickets = await Ticket.find({ username: req.user.username, matchUUID: matchID });

    tickets = tickets.map( ticket => {
      return {...ticket.toObject(), uuid: ticket._id};
    });

    res.status(200).send(tickets);
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.delete('/:ticket_id', async (req, res) => {
  let ticketID = req.params.ticket_id;
  if(!mongoose.Types.ObjectId.isValid(ticketID))
    return res.status(400).send({ err: 'Invalid ticket ID format.'});
  try {
    let ticket = await Ticket.findOne({ _id: ticketID });
    if (!ticket) return res.status(404).send({ err: 'Ticket to delete is not found'});
    await ticket.remove();
    res.status(200).send({ msg: 'Ticket deleted successfully!' });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;