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
    let fixture = await Fixture.findOne({ round: round });
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
      .findByIdAndUpdate(fixture._id, {
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

router.get('/get-active-round', async (req, res) => {
  if (!req.user.roles.includes('Admin')) {
    return res.status(200).json({
      success: false,
      message: 'Only admins can setup rounds!',
      data: {}
    });
  }

  let activeFixtures = await Fixture
    .find({ 'isActive': true })
    .populate({
      path: 'gameStats',
      model: 'Game',
      populate: {
        path: 'homeTeamId awayTeamId',
        model: 'Team'
      }
    });

  if (activeFixtures.length === 0) {
    return res.status(200).json({
      success: false,
      message: 'There are no active rounds, please contact your db admin!',
      data: {}
    });
  }

  if (activeFixtures.length > 1) {
    return res.status(200).json({
      success: false,
      message: 'More than one active round, please contact your db admin!',
      data: {}
    });
  }

  return res.status(200).json({
    success: true,
    message: ``,
    data: activeFixtures[0]
  });
});

router.post('/complete-round', async (req, res) => {
  if (!req.user.roles.includes('Admin')) {
    return res.status(200).json({
      success: false,
      message: 'Only admins can setup rounds!',
      data: {}
    });
  }

  const { fixtureId, games } = req.body;

  let fixture = await Fixture.findById(fixtureId);
  if(!fixture) {
    return res.status(200).json({
      success: false,
      message: 'No such fixture found',
      data: {}
    });
  }

  for(let game of Object.values(games)) {
    console.log(game)

    await Game.findByIdAndUpdate(game.game_id, {
      $set: {
        homeTeamGoals: game.home_team_score,
        awayTeamGoals: game.away_team_score
      }
    })
  }

  await Fixture.findByIdAndUpdate(fixtureId, {
    $set: {
      isActive: false,
      isCompleted: true
    }
  })

  //TODO
  //Loop through user bets and calculate points

  return res.status(200).json({
    success: true,
    message: `Success`,
    data: {}
  });
})

module.exports = router 