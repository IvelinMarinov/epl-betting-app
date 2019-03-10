const mongoose = require('mongoose')

let gameSchema = new mongoose.Schema({
    homeTeamId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'},
    awayTeamId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'},
    homeTeamGoals: {type: mongoose.SchemaTypes.Number, required: true},
    awayTeamGoals: {type: mongoose.SchemaTypes.Number, required: true},
    sign: {type: mongoose.SchemaTypes.String, required: true}
  });
  
  let Game = mongoose.model('Game', gameSchema)
  
  module.exports = Game; 