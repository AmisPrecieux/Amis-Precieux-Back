import { Router } from "express";
import { createPart } from "../services/part.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Part
 *   description: API endpoints for managing parts
 */

/**
 * @swagger
 * /part:
 *   post:
 *     summary: Create a new part
 *     tags: [Part]
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

router.post("/", async (req, res) => {
    try {
        await createPart(req.body.victory, req.body.length, req.body.NbrMoove, req.body.IdGame);
        res.send("Partie ajouté");
      } catch (error) {
        res.status(400).send(error);
      }
});

export default router;