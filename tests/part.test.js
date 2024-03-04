import { createPart, getParts } from "../services/part.js";
import Part from "../models/Part.js";
import { expect } from "chai";
import sinon from "sinon";

describe("createPart function", () => {
  let partSaveStub;

  beforeEach(() => {
    // Stubbing Part.save method to resolve with a predefined part object
    partSaveStub = sinon.stub(Part.prototype, "save").resolves({
      victory: true,
      length: 10,
      NbrMoove: 5,
      game: "65858254ffb7d33eaeca47b8",
      // Define other properties as needed
    });
  });

  afterEach(() => {
    // Restore the original methods after each test
    Part.prototype.save.restore();
  });

  it("should create a new part", async () => {
    // Test data
    const victory = true;
    const length = 10;
    const NbrMoove = 5;
    const idGame = "65858254ffb7d33eaeca47b8";

    await createPart(victory, length, NbrMoove, idGame);

    // Assertions
    expect(partSaveStub.calledOnce).to.be.true;
    expect(
      partSaveStub.calledWith({
        victory: victory,
        length: length,
        NbrMoove: NbrMoove,
        game: idGame,
        // Define other properties as needed
      })
    ).to.be.true;

    // You can add more specific assertions if needed
  });
});

describe("getParts function", () => {
  let partFindStub;

  beforeEach(() => {
    // Stubbing Part.find method to resolve with a predefined part object
    partFindStub = sinon.stub(Part, "find").resolves([
      {
        victory: true,
        length: 10,
        NbrMoove: 5,
        game: "65858254ffb7d33eaeca47b8",
        // Define other properties as needed
      },
    ]);
  });

  afterEach(() => {
    // Restore the original methods after each test
    Part.find.restore();
  });

  it("should get all parts", async () => {
    const parts = await getParts();

    // Assertions
    expect(partFindStub.calledOnce).to.be.true;
    expect(parts).to.deep.equal([
      {
        victory: true,
        length: 10,
        NbrMoove: 5,
        game: "65858254ffb7d33eaeca47b8",
        // Define other properties as needed
      },
    ]);

    // You can add more specific assertions if needed
  });
});