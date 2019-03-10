const mongoose = require('mongoose')

let fixtureSchema = new mongoose.Schema({
    round: {type: mongoose.SchemaTypes.Number, required: true},
    isCompleted: {type: mongoose.SchemaTypes.Boolean, default: false},
    gameStats: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Game'}]
  });
  
  let Fixture = mongoose.model('Fixture', fixtureSchema)
  
  module.exports = Fixture
  module.exports.seedEmptyFixtures = async () => {
    let fixturesDb = await Fixture.find({});

      if (fixturesDb.length > 0) {
            return;
      }

    for(let i = 1; i <= 38; i++) {
      await Fixture.create({
        round: i,
        isCompleted: false,
        gameStats: []
      });
    }
  }