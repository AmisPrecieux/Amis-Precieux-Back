import { expect } from "chai";
import sinon from "sinon";
import {
  createGame,
  getGame,
  getAllGames,
  deleteGame,
  updateGame,
} from "../controllers/gameController.js";
import Game from "../models/Game.js";

describe("Game Controller", () => {
  let saveStub;
  let findByIdStub;
  let findStub;
  let findByIdAndDeleteStub;
  let findByIdAndUpdateStub;

  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  beforeEach(() => {
    saveStub = sinon.stub(Game.prototype, "save");
    findByIdStub = sinon.stub(Game, "findById");
    findStub = sinon.stub(Game, "find");
    findByIdAndDeleteStub = sinon.stub(Game, "findByIdAndDelete");
    findByIdAndUpdateStub = sinon.stub(Game, "findByIdAndUpdate");
  });

  afterEach(() => {
    sinon.restore();
    res.status.resetHistory();
    res.json.resetHistory();
  });

  describe("createGame", () => {

    it("should return a message if game created successfully", async () => {
      const req = {
        body: {
          name: "Game",
          description: "Description",
          difficulty: 3,
          slug: "game",
          instructions: "instructions",
        },
      };

      saveStub.resolves();

      await createGame(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Game created successfully" })).to
        .be.true;
    });

    it("should return an error message if game not created", async () => {
      const req = {
        body: {
        },
      };

      saveStub.rejects(new Error("Missing parameters"));

      await createGame(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Missing parameters" })).to.be.true;
    });
  });

  describe("getGame", () => {
      const req = {
        params: {
          id: "1234",
        },
      };

      it("should return a game if found", async () => {
        findByIdStub.resolves({ name: "Game" });
        await getGame(req, res);

        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
      });

      it("should return an error message if game not found", async () => {
        findByIdStub.resolves(null);
        await getGame(req, res);

        console.log(res.status.args[0][0]);
        console.log(res.json.args[0][0]);

        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
      });
  });

  describe("getAllGames", () => {
    it("should return all games if found", async () => {
      const req = {};
      Game.find.resolves([{ name: "Game" }]);
      await getAllGames(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe("deleteGame", () => {
    const req = {
      params: {
        id: "1234",
      },
    };

    it("should return a message if game deleted successfully", async () => {
      findByIdAndDeleteStub.resolves();
      await deleteGame(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return an error message if game not deleted", async () => {
      findByIdAndDeleteStub.rejects(new Error("Error"));
      await deleteGame(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

  });

  describe("updateGame", () => {
    const req = {
      params: {
        id: "1234",
      },
      body: {
        name: "Game",
        description: "Description",
        difficulty: 3,
        slug: "game",
        instructions: "instructions",
      },
    };

    it("should return a message if game updated successfully", async () => {
      findByIdAndUpdateStub.resolves();
      await updateGame(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return an error message if game not updated", async () => {
      findByIdAndUpdateStub.rejects(new Error("Error"));
      await updateGame(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

});
