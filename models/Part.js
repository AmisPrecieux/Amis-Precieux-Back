import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
    victory: {
        type: Boolean,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    nbrMoves: {
        type: Number,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Part = mongoose.model('Part', partSchema);

export default Part;
