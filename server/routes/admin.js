const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const AuthCheck = require('../config/auth-check');
const Team = require('../models/Team');
const Fixture = require('../models/Fixture');
const Game = require('../models/Game');
const DbErrorMsg = 'A database error occured';

const router = new express.Router();

router.get('/all-teams', async (req, res) => {
  try {
    let teams = await Team.find({}, 'shortName code')

    if (teams.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No teams in database',
        data: {}
      })
    }

    return res.status(200).json({
      success: true,
      message: '',
      data: teams
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: DbErrorMsg,
      data: {}
    })
  }
});

router.post('/save-round', async (req, res) => {
  if (!req.user.roles.includes('Admin')) {
    return res.status(200).json({
      success: false,
      message: 'Only admins can setup rounds!',
      data: {}
    })
  }

  let { round, games } = req.body;

  try {
    let fixture = await Fixture.find({ round: round });
    if (fixture.isCompleted) {
      return res.status(200).json({
        success: false,
        message: 'This round has already been completed',
        data: {}
      })
    }

    let gameIds = [];

    for (let gameNum in games) {
      let game = await new Game({
        homeTeamId: new ObjectId(games[gameNum].home_team_id.trim()),
        awayTeamId: new ObjectId(games[gameNum].away_team_id.trim())
      })
        .save()

      gameIds.push(game._id)
    }

    await Fixture
      .findByIdAndUpdate(fixture[0]._id, {
        $set: {
          gameStats: gameIds,
          isActive: true
        }
      })

    return res.status(200).json({
      success: true,
      message: `Successfully set up games for round ${round}`,
      data: {}
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: err,
      data: {}
    })
  }
});

module.exports = router 