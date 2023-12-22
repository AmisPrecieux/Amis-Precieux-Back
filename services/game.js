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
export async function getGameImages(idGame) {
    const game = await Game.findById(idGame);
    return {
        image1: convertToImage(game.image1),
        image2: convertToImage(game.image2),
        image3: convertToImage(game.image3),
        image4: convertToImage(game.image4),
        image5: convertToImage(game.image5),
        
    };
}
async function convertToImage(imageData) {
    const imageBuffer = Buffer.from(imageData, 'base64');
    console.log(imageBuffer);
    return imageBuffer;
}

export async function deleteGame(idGame) {
    console.log(typeof idGame);
    await Game.findByIdAndDelete(idGame);
}


