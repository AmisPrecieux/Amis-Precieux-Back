import { Router } from "express";
import { getUser, setUser } from "../services/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {

  if (!req.body.mail || !req.body.password) {
    return res.status(400).send("Vous devez renseigner le nom et le mot de passe");
  }

  try {
    await setUser(req.body);
    return res.status(201).send("Compte créés");
  } catch (error) {
    return res.status(403).send(error.toString());
  }
});

authRouter.post("/signin", async (req, res) => {

  try {
    const token = await getUser(req.body);
    return res.status(201).send(token);
  } catch (error) {

    return res.status(403).send(error.toString());
  }
})

authRouter.get("/test", verifyToken, (req, res) => {
  return res.send("ça marche");
})

export default authRouter;