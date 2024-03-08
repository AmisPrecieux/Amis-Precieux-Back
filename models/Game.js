import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  image1: {
    type: String,
    required: false,
  },
  image2: {
    type: String,
    required: false,
  },
  image3: {
    type: String,
    required: false,
  },
  image4: {
    type: String,
    required: false,
  },
  image5: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: false,
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
