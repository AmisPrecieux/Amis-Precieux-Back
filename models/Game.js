const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    victory: {
        type: Boolean,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    NbrMoove: {
        type: Number,
        required: true
    }
    
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
