const mongoose = require('mongoose')

let userBetsSchema = new mongoose.Schema({
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    gameId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Game'},
    homeTeamGoalsBet: {type: mongoose.SchemaTypes.Number, required: true},
    awayTeamGoalsBet: {type: mongoose.SchemaTypes.Number, required: true},
    signBet: {type: mongoose.SchemaTypes.String, required: true}
  });
  
  let UserBet = mongoose.model('UserBet', userBetsSchema)
  
  module.exports = UserBet