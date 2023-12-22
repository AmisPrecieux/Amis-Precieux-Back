import { Router } from "express";
import { createGame, getGame, getAllGames, deleteGame } from "../services/game.js";
import multer from "multer";
import { log } from "console";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });



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
 *               Description:
 *                 type: string
 *               Difficulty:
 *                 type: Number
 *               Slug:
 *                 type: string
 *                 required:
 *             example:
 *               Name: My Game
 *               Description: This is a game
 *               Difficulty: 3
 *               Slug: my-game
 *     responses:
 *       200:
 *         description: Game created successfully
 *       400:
 *         description: Error occurred while creating the game
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    await createGame(req.body.Name, req.body.Description, req.body.Difficulty, req.body.Slug);
    res.send("Jeux ajouté");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await getGame(gameId);
    if (!game) {
      return res.status(404).send("Game not foundaaaa");
    }
    await updateGame(gameId, req.body.Name, req.body.Description, req.body.Difficulty,  req.body.image1,  req.body.image2, req.body.image3, req.body.image4, req.body.image5,req.body.Slug);
    res.send("Game updated successfully");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }});





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
//Get a game
router.get("/:id", async (req, res) => {
  try {
    const game = await getGame(req.params.id);
    res.send(game);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/game:
 *   get:
 *     summary: Get all games
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Games retrieved successfully
 *       400:
 *         description: Error occurred while getting the games
 */
router.get("/", async (req, res) => {
  try {
    const games = await getAllGames();
    res.send(games);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/image/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await getGame(gameId);
    if (!game) {
      return res.status(404).send("Game not found");
    }
    console.log(req.params.id);
    const images = await getGameImages(req.params.id);
    console.log(images);
    res.send(`<img src="${images[0].src}" alt="Game Image">`);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /api/game/{id}:
 *   delete:
 *     summary: Delete a game by ID
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
 *         description: Game deleted successfully
 *       400:
 *         description: Error occurred while deleting the game
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const gameId = req.params.id;
    await deleteGame(gameId);
    res.send("Game deleted successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;