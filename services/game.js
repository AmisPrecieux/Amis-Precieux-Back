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

export async function updateGame(idGame, Name, Description, Difficulty, Slug, Image1, Image2, Image3, Image4, Image5) {
    const game = await Game.findById(idGame);
    
    if (Name) {
        game.Name = Name;
    }
    if (Description) {
        game.Description = Description;
    }
    if (Difficulty) {
        game.Difficulty = Difficulty;
    }
    if (Image1) {
        game.image1 = Image1;
    }
    if (Image2) {
        game.image2 = Image2;
    }
    if (Image3) {
        game.image3 = Image3;
    }
    if (Image4) {
        game.image4 = Image4;
    }
    if (Image5) {
        game.image5 = Image5;
    }
    if (Slug) {
        game.slug = Slug;
    }
    
    await game.save();
}


