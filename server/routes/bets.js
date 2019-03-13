const express = require('express');
const Fixture = require('../models/Fixture');

const router = new express.Router();

router.get('/get-active-round', async (req, res) => {
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

    if (activeFixtures.length !== 1) {
        return res.status(200).json({
            success: false,
            message: 'There is no active round currently, please come back again later!',
            data: {}
        });
    }

    return res.status(200).json({
        success: true,
        message: ``,
        data: activeFixtures[0]
    });
})

router.post('/submit', async (req, res) => {
    console.log(req.user_id);
    console.log('-----------------------------')
    console.log(req.body)

    return res.status(200).json({
        success: true,
        message: ``,
        data: {}
    });
})

module.exports = router;