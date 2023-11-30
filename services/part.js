import Part from '../models/Part.js';

export async function createPart(victory, length, NbrMoove, idGame) {
    const newPart = new Part({
        victory: victory,
        length: length,
        NbrMoove: NbrMoove,
        game: idGame,
        date: new Date()
    });
    console.log(newPart);

    await newPart.save();
}

export async function getParts() {
    const parts = await Part.find();
    return parts;
}






