import { Router } from "express";
import { createGame, getGame } from "../services/game.js";

const router = Router();

router.post("/game", async (req, res) => {
    try {
        await createGame(req.body.Name);
        res.send("Jeux ajouté");
      } catch (error) {
        res.status(400).send(error);
      }
});


router.get("/game/:id", async (req, res) => {
  try {
    const game = await getGame(req.params.id);
    res.send(game);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;