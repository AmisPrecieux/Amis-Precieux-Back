import { Router } from "express";
import { getUser, setUser } from "../services/auth.js";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: API endpoints for managing sign up and sign in
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentification]
 *     description: Creates a new user account with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request - email and password are required
 *       403:
 *         description: Forbidden - error occurred while creating the account
 */
authRouter.post("/signup", async (req, res) => {
  if (!req.body.mail || !req.body.password) {
    return res.status(400).send("Vous devez renseigner le nom et le mot de passe");
  }

  try {
    await setUser(req.body);
    return res.status(201).send("Compte créé");
  } catch (error) {
    return res.status(403).send(error.toString());
  }
});

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in with email and password
 *     tags: [Authentification]
 *     description: Authenticates the user with the provided email and password and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sign in successful
 *       403:
 *         description: Forbidden - error occurred while signing in
 */
authRouter.post("/signin", async (req, res) => {
  try {
    const token = await getUser(req.body);
    return res.status(201).send(token);
  } catch (error) {
    return res.status(403).send(error.toString());
  }
});

export default authRouter;