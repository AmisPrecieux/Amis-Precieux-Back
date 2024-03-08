import { Router } from "express";
import { createPart, getParts } from "../controllers/partController.js";
import verifyToken from "../middleware/verifyToken.js";


const router = Router();



/**
 * @swagger
 * tags:
 *   name: Part
 *   description: API endpoints for managing parts
 */

/**
 * @swagger
 * /api/part:
 *   post:
 *     summary: Create a new part
 *     tags: [Part]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               victory:
 *                 type: boolean
 *               length:
 *                 type: number
 *               nbrMoves:
 *                 type: number
 *               idGame:
 *                 type: string
 *     responses:
 *       200:
 *         description: Part added successfully
 *       400:
 *         description: Error occurred while adding part
 */

router.post("/", createPart);

/**
 * @swagger
 * /api/part:
 *   get:
 *     summary: Get all parts
 *     tags: [Part]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved parts
 *       400:
 *         description: Error occurred while retrieving parts
 */

router.get("/", verifyToken, getParts);

export default router;