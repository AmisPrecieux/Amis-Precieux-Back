import Game from '../models/Game.js';

export async function createGame(Name, img) {
    const newGame = new Game({
        Name: Name,
        date: new Date(),
        image1: null,
        image2: null,
        image3: null,
    });

    await newGame.save();
}

export async function getGame(idGame) {
    return await Game.findById(idGame);
}

export async function updateGameImage1(idGame, newImg) {
    const game = await Game.findById(idGame);
    game.image1 = newImg;
    await game.save();
}
export async function updateGameImage2(idGame, newImg) {
    const game = await Game.findById(idGame);
    game.image2 = newImg;
    await game.save();
}
export async function updateGameImage3(idGame, newImg) {
    const game = await Game.findById(idGame);
    game.image3 = newImg;
    await game.save();
}


