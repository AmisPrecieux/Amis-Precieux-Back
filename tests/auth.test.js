// Import necessary modules
import { setUser, getUser } from "../services/auth.js";
import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Assuming User is a mongoose model

describe("setUser function", () => {
  let bcryptStub;
  let saveStub;
  let userSaveStub;

  beforeEach(() => {
    // Stubbing bcrypt.genSalt to return a predefined salt value
    bcryptStub = sinon.stub(bcrypt, "genSalt").resolves("saltValue");

    // Stubbing bcrypt.hash to return a predefined hashed password
    sinon.stub(bcrypt, "hash").resolves("hashedPassword");

    // Stubbing User.save method to resolve with a predefined user object
    saveStub = sinon.stub().resolves({
      mail: "johndoe@email.com",
      password: "password",
      // Define other properties as needed
    });
    userSaveStub = sinon.stub(User.prototype, "save").callsFake(saveStub);
  });

  afterEach(() => {
    // Restore the original methods after each test
    bcryptStub.restore();
    User.prototype.save.restore();
  });

  it("should set user properties, hash password, and save user", async () => {
    const userBody = {
      mail: "johndoe@email.com",
      password: "password",
      // Define other properties as needed
    };

    await setUser(userBody);

    // Assertions
    expect(bcryptStub.calledOnce).to.be.true;
    expect(saveStub.calledOnce).to.be.true;
    expect(saveStub.calledWith(userBody)).to.be.true;

    // You can add more specific assertions if needed
  });
});

describe("getUser function", () => {
  let userFindOneStub;
  let bcryptCompareStub;
  let jwtSignStub;

  beforeEach(() => {
    // Stubbing User.findOne method to resolve with a predefined user object
    userFindOneStub = sinon.stub(User, "findOne").resolves({
      mail: "amisprecieux",
      password: "$2b$10$mdAnkfBZWvlS9srrEA6A2uNd3gCXK.e1VHYHgFMWUgMHQNy0DIgmC",
      // Define other properties as needed
    });

    // Stubbing bcrypt.compare to return true
    bcryptCompareStub = sinon.stub(bcrypt, "compare").resolves(true);

    // Stubbing jwt.sign to return a predefined access token
    jwtSignStub = sinon.stub(jwt, "", sign).returns("accessToken");
  });
});
