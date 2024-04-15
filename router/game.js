import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createGame,
  getGame,
  getAllGames,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";

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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: Number
 *               slug:
 *                 type: string
 *                 required:
 *               image1:
 *                 type: string
 *               image2:
 *                 type: string
 *               image3:
 *                 type: string
 *               image4:
 *                 type: string
 *               image5:
 *                 type: string
 *               instructions:
 *                 type: string
 *             example:
 *               name: My Game
 *               description: This is a game
 *               difficulty: 3
 *               slug: my-game
 *               image1: images/Baleine_Puzzle3.jpg
 *     responses:
 *       200:
 *         description: Game created successfully
 *       400:
 *         description: Error occurred while creating the game
 */
router.post("/", verifyToken, createGame);

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
 *           minLength: 24
 *           maxLength: 24
 *     responses:
 *       200:
 *         description: Game found successfully
 *       400:
 *         description: Error occurred while getting the game
 */
router.get("/:id", getGame);

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
router.get("/", getAllGames);

/**
 * @swagger
 * /api/game/{id}:
 *   put:
 *     summary: Update a game by ID
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
 *           minLength: 24
 *           maxLength: 24
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: Number
 *               slug:
 *                 type: string
 *               image1:
 *                type: string
 *               image2:
 *                type: string
 *               image3:
 *                type: string
 *               image4:
 *                type: string
 *               image5:
 *                type: string
 *               instructions:
 *                type: string
 *             example:
 *               name: Updated Game
 *               description: This is an updated game
 *               difficulty: 4
 *               slug: updated-game
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       400:
 *         description: Error occurred while updating the game
 */
router.put("/:id", verifyToken, updateGame);

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
 *           minLength: 24
 *           maxLength: 24
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       400:
 *         description: Error occurred while deleting the game
 */
router.delete("/:id", verifyToken, deleteGame);

export default router;
