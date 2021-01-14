const express = require('express');
const mongoose = require('mongoose');
const manager = require('../middleware/manager');
const auth = require('../middleware/auth');
const { Match, validateMatch, validateMatchEdit } = require('../models/match');
const { Stadium } = require('../models/stadium');
const _ = require('lodash');
const seats = require('./seats');

const router = express.Router();

router.use('/:match_id/seats', seats);

router.get('/', async (req, res) => {
  const pageSize = 10;
  if (isNaN(req.query.page) || req.query.page < 1)
    return res.status(406).send({ err: 'Invalid page, must be a number greater than 0' });

  let matches = await Match.find()
                           .select({ seatMap: 0 })
                           .skip((req.query.page - 1) * pageSize)
                           .limit(pageSize);
  matches = matches.map( match => {
    return {...match.toObject(), uuid: match._id};
  });

  let totalMatches = await Match.count();
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
  
  let match = await Match.findById(matchID).select({ seatMap: 0});
  if(!match)
     return res.status(404).send({ err: 'No matches exist the given uuid.'});

    match = {...match.toObject(), uuid: match._id};
    res.status(200).send(match);
});

router.post('/', [auth, manager], async (req, res) => {
  let addedMatch = req.body;
  const { error } = validateMatch(addedMatch);
  if (error) 
    return res.status(403).send({ err: error.details[0].message });

  let stadium = await Stadium.findOne( { name: addedMatch.venue } );
  if (!stadium)
    return res.status(400).send( { err: 'The venue (stadium) of the match does not exist'} );

  const to_pick = ['homeTeam', 'awayTeam', 'venue', 'dateTime', 'mainReferee', 'firstLinesman', 'secondLinesman', 'ticketPrice'];
  let match = new Match(_.pick(req.body, to_pick));

  await match.save();
  res.status(200).send( { msg: 'Match added successfully!'});
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

  let match = await Match.findById(matchID);
  if(!match)
    return res.status(404).send({ err: 'No matches exist the given uuid.'});

  if(matchEdit.venue) {
    let stadium = await Stadium.findOne( { name: matchEdit.venue } );
    if (!stadium)
      return res.status(400).send({ err: 'The venue (stadium) of the match does not exist'});
  }

  if (await Match.findByIdAndUpdate('5fff4cf524fb3518b662c102', matchEdit))
    res.status(200).send({ msg: 'Match edited successfully!' });
  else
    res.status(500).send({ err: 'An error occurred while trying to edit the match.'});
});

module.exports = router;