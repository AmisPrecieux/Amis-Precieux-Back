import { Router } from "express";
import { createPart } from "../services/part.js";
import verifyToken from "../middleware/verifyToken.js";
import { createPart, getParts } from "../services/part.js";
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
 *               NbrMoove:
 *                 type: number
 *               IdGame:
 *                 type: string
 *     responses:
 *       200:
 *         description: Part added successfully
 *       400:
 *         description: Error occurred while adding part
 */

router.post("/", verifyToken, async (req, res) => {
  try {
      await createPart(req.body.victory, req.body.length, req.body.NbrMoove, req.body.IdGame);
      res.send("Partie ajouté");
    } catch (error) {
      res.status(400).send(error);
    }
});

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

router.get("/", verifyToken, async (req, res) => {
  try {
    const parts = await getParts();
    res.send(parts);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;