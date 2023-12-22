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
        type: String,
        required: false
    },
    image2 : {
        type: String,
        required: false
    },
    image3 : {
        type: String,
        required: false
    },
    image4 : {
        type: String,
        required: false
    },
    image5 : {
        type: String,
        required: false
    },
    slug : {
        type: String,
        required: true
    }

});

const Game = mongoose.model('Game', gameSchema);

export default Game;