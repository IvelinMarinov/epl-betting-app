const mongoose = require('mongoose')

let teamStatsSchema = new mongoose.Schema({
    teamId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'},
    gamesPlayed: { type: mongoose.SchemaTypes.Number, default: 0 },
    wins: { type: mongoose.SchemaTypes.Number, default: 0 },
    draws: { type: mongoose.SchemaTypes.Number, default: 0 },
    losses: { type: mongoose.SchemaTypes.Number, default: 0 },
    goalsScored: { type: mongoose.SchemaTypes.Number, default: 0 },    
    goalsConceded: { type: mongoose.SchemaTypes.Number, default: 0 },    
    points: { type: mongoose.SchemaTypes.Number, default: 0 }
  });
  
  let TeamStats = mongoose.model('TeamStats', teamStatsSchema)
  
  module.exports = TeamStats