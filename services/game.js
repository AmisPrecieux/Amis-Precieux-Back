import Game from '../models/Game.js';

export async function createGame(Name) {
    const newGame = new Game({
        Name: Name,
        date: new Date()
    });
    console.log(newGame),

    await newGame.save();
}

export async function getGame(idGame) {
    return await Message.find({
        idGame: idGame
    });
}



