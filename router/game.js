import { Router } from "express";
import { createGame, getGame } from "../services/game.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Game
 *   description: API endpoints for managing games
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/game:
 *   post:
 *     summary: Create a new game
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *             example:
 *               Name: My Game
 *     responses:
 *       200:
 *         description: Game created successfully
 *       400:
 *         description: Error occurred while creating the game
 */
router.post("/", async (req, res) => {
  try {
    await createGame(req.body.Name);
    res.send("Jeux ajouté");
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/game/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game found successfully
 *       400:
 *         description: Error occurred while getting the game
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const game = await getGame(req.params.id);
    res.send(game);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;