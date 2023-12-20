import Game from '../models/Game.js';

export async function createGame(Name, Description, Difficulty) {
    const newGame = new Game({
        Name: Name,
        Description: Description,
        Difficulty: Difficulty,
        date: new Date(),
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
    });
    await newGame.save();
}


export async function getGame(idGame) {
    return await Game.findById(idGame);
}

export async function getAllGames() {
    return await Game.find();
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
export async function updateGameImage4(idGame, newImg) {
    const game = await Game.findById(idGame);
    game.image4 = newImg;
    await game.save();
}
export async function updateGameImage5(idGame, newImg) {
    const game = await Game.findById(idGame);
    game.image5 = newImg;
    await game.save();
}


