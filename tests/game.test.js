import {
  createGame,
  getGame,
  getAllGames,
  deleteGame,
  updateGame,
} from "../services/game.js";
import { expect } from "chai";
import sinon from "sinon";
import Game from "../models/Game.js";

describe("createGame function", () => {
  it("should create a new game", async () => {
    // Test data
    const name = "Game name";
    const description = "Game description";
    const difficulty = 3;
    const slug = "game-slug";

    // Stubbing Game.create method to resolve with a predefined game object
    const gameCreateStub = sinon.stub(Game, "create").resolves({
      Name: name,
      Description: description,
      Difficulty: difficulty,
      Slug: slug,
      // Define other properties as needed
    });

    const createdGame = await createGame(name, description, difficulty, slug);

    // Assertions
    expect(gameCreateStub.calledOnce).to.be.true;
    expect(
      gameCreateStub.calledWith({
        Name: name,
        Description: description,
        Difficulty: difficulty,
        Slug: slug,
      })
    ).to.be.true;
    expect(createdGame).to.deep.equal({
      Name: name,
      Description: description,
      Difficulty: difficulty,
      Slug: slug,
      // Define other properties as needed
    });

    // Restore the original methods
    gameCreateStub.restore();
  });
});

describe("getGame function", () => {
  it("should get a game by ID", async () => {
    // Test data
    const gameId = "65858254ffb7d33eaeca47b8";

    // Stubbing Game.findById method to resolve with a predefined game object
    const gameFindByIdStub = sinon.stub(Game, "findById").resolves({
      Name: "Game name",
      Description: "Game description",
      Difficulty: 3,
      // Define other properties as needed
    });

    const game = await getGame(gameId);

    // Assertions
    expect(gameFindByIdStub.calledOnce).to.be.true;
    expect(gameFindByIdStub.calledWith(gameId)).to.be.true;
    expect(game).to.deep.equal({
      Name: "Game name",
      Description: "Game description",
      Difficulty: 3,
      // Define other properties as needed
    });

    // Restore the original methods
    gameFindByIdStub.restore();
  });
});

describe("getAllGames function", () => {
  it("should get all games", async () => {
    // Test data
    const games = [
      {
        Name: "Game 1",
        Description: "Game 1 description",
        Difficulty: 1,
        // Define other properties as needed
      },
      {
        Name: "Game 2",
        Description: "Game 2 description",
        Difficulty: 2,
        // Define other properties as needed
      },
    ];

    // Stubbing Game.find method to resolve with the predefined games array
    const gameFindStub = sinon.stub(Game, "find").resolves(games);

    const allGames = await getAllGames();

    // Assertions
    expect(gameFindStub.calledOnce).to.be.true;
    expect(allGames).to.deep.equal(games);

    // Restore the original methods
    gameFindStub.restore();
  });
});

// describe("deleteGame function", () => {
//   it("should delete a game by ID", async () => {
//     // Test data
//     const gameId = "gameId123";

//     // Stubbing Game.findByIdAndDelete method to resolve with a predefined game object
//     const gameFindByIdAndDeleteStub = sinon
//       .stub(Game, "findByIdAndDelete")
//       .resolves({
//         Name: "Game name",
//         Description: "Game description",
//         Difficulty: 3,
//         // Define other properties as needed
//       });

//     const deletedGame = await deleteGame(gameId);

//     // Assertions
//     expect(gameFindByIdAndDeleteStub.calledOnce).to.be.true;
//     expect(gameFindByIdAndDeleteStub.calledWith(gameId)).to.be.true;
//     expect(deletedGame).to.deep.equal({
//       Name: "Game name",
//       Description: "Game description",
//       Difficulty: 3,
//       // Define other properties as needed
//     });

//     // Restore the original methods
//     gameFindByIdAndDeleteStub.restore();
//   });
// });

// describe("updateGame function", () => {
//   it("should update a game by ID", async () => {
//     // Test data
//     const gameId = "gameId123";
//     const name = "Updated game name";
//     const description = "Updated game description";
//     const difficulty = 4;
//     const slug = "updated-game-slug";

//     // Stubbing Game.findByIdAndUpdate method to resolve with a predefined game object
//     const gameFindByIdAndUpdateStub = sinon
//       .stub(Game, "findByIdAndUpdate")
//       .resolves({
//         Name: name,
//         Description: description,
//         Difficulty: difficulty,
//         Slug: slug,
//         // Define other properties as needed
//       });

//     const updatedGame = await updateGame(
//       gameId,
//       name,
//       description,
//       difficulty,
//       slug
//     );

//     // Assertions
//     expect(gameFindByIdAndUpdateStub.calledOnce).to.be.true;
//     expect(
//       gameFindByIdAndUpdateStub.calledWith(gameId, {
//         Name: name,
//         Description: description,
//         Difficulty: difficulty,
//         Slug: slug,
//       })
//     ).to.be.true;
//     expect(updatedGame).to.deep.equal({
//       Name: name,
//       Description: description,
//       Difficulty: difficulty,
//       Slug: slug,
//       // Define other properties as needed
//     });

//     // Restore the original methods
//     gameFindByIdAndUpdateStub.restore();
//   });
// });
