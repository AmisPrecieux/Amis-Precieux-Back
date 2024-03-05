import Game from "../models/Game.js";

export const createGameService = async (game) => {
  const newGame = new Game({
    name: game.name,
    description: game.description,
    difficulty: game.difficulty,
    date: new Date(),
    slug: game.slug,
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    instructions: game.instructions,
  });
  await newGame.save();
};

export const getGameService = async (idGame) => {
  return await Game.findById(idGame);
};

export const getAllGamesService = async () => {
  return await Game.find();
};

export const deleteGameService = async (idGame) => {
  console.log(typeof idGame);
  await Game.findByIdAndDelete(idGame);
};

export const updateGameService = async (
  idGame,
  game
) => {
  await Game.findByIdAndUpdate(idGame, {
    name: game.name,
    description: game.description,
    difficulty: game.difficulty,
    image1: game.image1,
    image2: game.image2,
    image3: game.image3,
    image4: game.image4,
    image5: game.image5,
    slug: game.slug,
    instructions: game.instructions,
  });
};