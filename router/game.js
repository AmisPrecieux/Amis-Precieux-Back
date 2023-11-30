import { Router } from "express";
import { createGame, getGame, updateGameImage } from "../services/game.js";
import multer from "multer";
import mongoose from "mongoose";
import { log } from "console";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/", verifyToken, async (req, res) => {
  try {
    const Name = req.body.Name;
    const img = req.body.img;
    await createGame(Name, img);
    res.send("Game created successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});


router.put("/image/:id", verifyToken, upload.single('image'), async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await getGame(gameId);
    if (!game) {
      return res.status(404).send("Game not found");
    }
    log(req.file.buffer);

    await updateGameImage(gameId, req.file.buffer);
    res.send("Game image updated successfully");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});


router.get("/:id",verifyToken, async (req, res) => {
  try {
    const game = await getGame(req.params.id);
    res.send(game);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/image/:id",verifyToken, async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await getGame(gameId);
    if (!game) {
      return res.status(404).send("Game not found");
    }
    const imageBuffer = game.image;
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    res.send(`<img src="${imageSrc}" alt="Game Image">`);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;