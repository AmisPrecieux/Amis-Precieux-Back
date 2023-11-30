import Game from '../models/Game.js';

export async function createGame(Name, img) {
    const newGame = new Game({
        Name: Name,
        date: new Date(),
        image: null
    });

    await newGame.save();
}

export async function getGame(idGame) {
    return await Game.findById(idGame);
}

export async function updateGameImage(idGame, newImg) {
    const game = await Game.findById(idGame);
    game.image = newImg;
    await game.save();
}



