import {
  createGameService,
  getGameService,
  getAllGamesService,
  deleteGameService,
  updateGameService,
} from "../services/game.js";

export const createGame = async (req, res) => {
  try {
    if (!req.body.name) throw new Error("Missing parameters");
    if (!req.body.description) throw new Error("Missing parameters");
    if (!req.body.difficulty) throw new Error("Missing parameters");
    if (!req.body.slug) throw new Error("Missing parameters");
    await createGameService(req.body);
    res.status(200).json({ message: "Game created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGame = async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Missing parameters");
    const game = await getGameService(req.params.id);
    if (!game) throw new Error("Game not found");
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const games = await getAllGamesService();
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGame = async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Missing parameters");
    await deleteGameService(req.params.id);
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGame = async (req, res) => {
  try {
    await updateGameService(req.params.id, req.body);
    res.status(200).json({ message: "Game updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
