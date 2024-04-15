import { createPart, getParts } from "../controllers/partController.js";
import { expect } from "chai";
import sinon from "sinon";
import Part from "../models/Part.js";

describe("Part Controller", () => {
  let saveStub;
  let findStub;

  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  beforeEach(() => {
    saveStub = sinon.stub(Part.prototype, "save");
    findStub = sinon.stub(Part, "find");
  });

  afterEach(() => {
    sinon.restore();
    res.status.resetHistory();
    res.json.resetHistory();
  });

  describe("createPart", () => {
    const req = {
      body: {
        victory: true,
        length: 10,
        nbrMoves: 20,
        idGame: "1234",
      },
    };

    it("should return a message if part created successfully", async () => {
      saveStub.resolves();

      await createPart(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Part created successfully" })).to
        .be.true;
    });

    it("should return an error message if part not created", async () => {
      saveStub.rejects(new Error("Part not created"));

      await createPart(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Part not created" })).to.be.true;
    });
  });

  describe("getParts", () => {
    it("should return the list of parts", async () => {
      const parts = [
        {
          _id: "1234",
          victory: true,
          length: 10,
          nbrMoves: 20,
          idGame: "1234",
        },
      ];

      const req = {};

      findStub.returns(parts);

      await getParts(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith(parts)).to.be.true;
    });
  });
});
