import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Difficulty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    image1 : {
        type: Buffer,
        required: false
    },
    image2 : {
        type: Buffer,
        required: false
    },
    image3 : {
        type: Buffer,
        required: false
    },
    image4 : {
        type: Buffer,
        required: false
    },
    image5 : {
        type: Buffer,
        required: false
    },
    slug : {
        type: String,
        required: true
    }

});

const Game = mongoose.model('Game', gameSchema);

export default Game;