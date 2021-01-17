const express = require('express');
const mongoose = require('mongoose');
const manager = require('../middleware/manager');
const auth = require('../middleware/auth');
const { Match, validateMatch, validateMatchEdit, createEmptySeatMap } = require('../models/match');
const { Stadium } = require('../models/stadium');
const _ = require('lodash');
const seats = require('./seats');
const { Ticket } = require('../models/ticket');

const router = express.Router();

router.use('/:match_id/seats', seats);

router.get('/', async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  let matches, totalMatches;
  try {
    matches = await Match.find()
                            .select({ seatMap: 0 })
                            .skip((req.query.page - 1) * pageSize)
                            .limit(pageSize);

    totalMatches = await Match.countDocuments();
  } catch(err) {
    return res.status(500).send({ err: err.message });
  }

  matches = matches.map( match => {
    return {...match.toObject(), uuid: match._id};
  });

  let has_next = (req.query.page - 1) * pageSize + matches.length < totalMatches;
  res.status(200).send({
    has_next: has_next,
    matches: matches
  });
});

router.get('/:match_id', async (req, res) => {
  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});
  
  let match;
  try {
    match = await Match.findById(matchID).select({ seatMap: 0});
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});
  } catch (err) {
    return res.status(500).send({ err: err.msg });
  }

  match = {...match.toObject(), uuid: match._id};
  res.status(200).send(match);
});

router.post('/', [auth, manager], async (req, res) => {
  let addedMatch = req.body;
  const { error } = validateMatch(addedMatch);
  if (error) 
    return res.status(403).send({ err: error.details[0].message });

  try {
    let stadium = await Stadium.findOne( { name: addedMatch.venue } );
    if (!stadium)
      return res.status(400).send( { err: 'The venue (stadium) of the match does not exist'} );


    const to_pick = ['homeTeam', 'awayTeam', 'venue', 'dateTime', 'mainReferee', 'firstLinesman', 'secondLinesman', 'ticketPrice'];
    let match = _.pick(req.body, to_pick);
    match.seatMap = createEmptySeatMap(stadium.rows, stadium.seatsPerRow);
    match = new Match(match);
    await match.save();
    res.status(200).send({ msg: 'Match added successfully!'});
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.put('/:match_id', async (req, res) => {
  const to_pick = ['homeTeam', 'awayTeam', 'venue', 'dateTime', 'mainReferee', 'firstLinesman', 'secondLinesman', 'ticketPrice'];
  let matchEdit = _.pick(req.body, to_pick);
  const { error } = validateMatchEdit(matchEdit);  

  if (error) 
    return res.status(403).send({ err: error.details[0].message });

  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});

  try {
    let match = await Match.findById(matchID);
    if(!match)
      return res.status(404).send({ err: 'No matches exist the given uuid.'});

    let bookedTickets = await Ticket.countDocuments({ matchUUID: matchID });
    if(matchEdit.ticketPrice !== match.ticketPrice && bookedTickets) {
      return res.status(400).send({ err: 'Cannot change the ticket price after being booked.'});
    }

    if(matchEdit.venue !== match.venue) {
      let stadium = await Stadium.findOne( { name: matchEdit.venue } );
      if (!stadium)
        return res.status(400).send({ err: 'The venue (stadium) of the match does not exist'});
      // Cancel all tickets in the old stadium (assume they are refunded)
      let tickets = await Ticket.find({ matchUUID: matchID });
      tickets.forEach(async (ticket) => await ticket.remove());
      // Create a new empty seatmap
      matchEdit.seatMap = createEmptySeatMap(stadium.rows, stadium.seatsPerRow);
    }

    await Match.findByIdAndUpdate(matchID, matchEdit);
    res.status(200).send({ msg: 'Match edited successfully!' });
  } catch(err) {
    res.status(500).send({ err: err.message });
  }
});

router.delete('/:match_id', [auth, manager], async (req, res) => {
  let matchID = req.params.match_id;
  if(!mongoose.Types.ObjectId.isValid(matchID))
    return res.status(400).send({ err: 'Invalid match ID format.'});
  try {
    let match = await Match.findOne({ _id: matchID });
    if (!match) return res.status(404).send({ err: 'Match to delete is not found'});
    await match.remove();
    res.status(200).send({ msg: 'Match deleted successfully!' });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;