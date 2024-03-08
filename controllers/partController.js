import { createPartService, getPartsService } from "../services/part.js";

export const createPart = async (req, res) => {
  try {
    await createPartService(req.body);
    res.status(200).json({ message: "Part created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getParts = async (req, res) => {
  try {
    const parts = await getPartsService();
    res.status(200).json(parts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
