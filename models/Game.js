import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    image : {
        type: Buffer,
        required: false
    },


});

const Game = mongoose.model('Game', gameSchema);

export default Game;