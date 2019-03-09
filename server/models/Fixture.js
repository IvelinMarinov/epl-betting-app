const mongoose = require('mongoose')

let fixtureSchema = new mongoose.Schema({
    round: {type: mongoose.SchemaTypes.Number, required: true},
    isCompleted: {type: mongoose.SchemaTypes.Boolean, default: false},
    gameStats: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Game'}]
  });
  
  let Fixture = mongoose.model('Fixture', fixtureSchema)
  
  module.exports = Fixture