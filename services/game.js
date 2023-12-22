import Game from '../models/Game.js';

export async function createGame(Name, Description, Difficulty, Slug) {
    const newGame = new Game({
        Name: Name,
        Description: Description,
        Difficulty: Difficulty,
        date: new Date(),
        slug: Slug,
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: ""
    });
    await newGame.save();
}

export async function getGame(idGame) {
    return await Game.findById(idGame);
}

export async function getAllGames() {
    return await Game.find();
}

export async function deleteGame(idGame) {
    console.log(typeof idGame);
    await Game.findByIdAndDelete(idGame);
}


