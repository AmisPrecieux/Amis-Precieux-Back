import { Router } from "express";
import { createPart } from "../services/part.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        await createPart(req.body.victory, req.body.length, req.body.NbrMoove, req.body.IdGame);
        res.send("Partie ajouté");
      } catch (error) {
        res.status(400).send(error);
      }
});

export default router;