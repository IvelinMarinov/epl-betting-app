const express = require('express');
const router = new express.Router();
const Team = require('../models/Team');
const DbErrorMsg = 'A database error occured';

router.get('/all', async (req, res) => {
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

module.exports = router 
