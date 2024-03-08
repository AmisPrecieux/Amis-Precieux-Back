import Part from "../models/Part.js";

export const createPartService = async (data) => {
    const newPart = new Part({
        victory: data.victory,
        length: data.length,
        nbrMoves: data.nbrMoves,
        game: data.idGame,
    });
    await newPart.save();
    };

export const getPartsService = async () => {
    return await Part.find();
};