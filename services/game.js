import Game from '../models/Game.js';

export async function createGame(Name, Description, Difficulty) {
    const newGame = new Game({
        Name: Name,
        Description: Description,
        Difficulty: Difficulty,
        date: new Date()
    });
    console.log(newGame),

    await newGame.save();
}

export async function getGame(idGame) {
    return await Game.findById(idGame);
}

export async function getAllGames() {
    return await Game.find();
}



