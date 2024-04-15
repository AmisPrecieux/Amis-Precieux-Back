import { signIn, signUp, deleteUser } from "../controllers/authController.js";
import { expect } from "chai";
import sinon from "sinon";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("Auth Controller", () => {
  let saveStub;
  let findByIdStub;
  let findOneStub;
  let findByIdAndDeleteStub;
  let compareStub;
  let signStub;

  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  beforeEach(() => {
    saveStub = sinon.stub(User.prototype, "save");
    findByIdStub = sinon.stub(User, "findById");
    findOneStub = sinon.stub(User, "findOne");
    findByIdAndDeleteStub = sinon.stub(User, "findByIdAndDelete");
    compareStub = sinon.stub(bcrypt, "compare");
    signStub = sinon.stub(jwt, "sign");
  });

  afterEach(() => {
    sinon.restore();
    res.status.resetHistory();
    res.json.resetHistory();
  });

  describe("create a new user", () => {
    const req = {
      body: {
        mail: "bendover@mail.com",
        password: "123456",
      },
    };

    it("should return a message if user created successfully", async () => {
      saveStub.resolves();
      await signUp(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "User created successfully" })).to
        .be.true;
    });

    it("should return an error message if user already exists", async () => {
      saveStub.rejects(new Error("User already exists"));
      await signUp(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "User already exists" })).to.be
        .true;
    });

    it("should return an error message if user not created", async () => {
      saveStub.rejects(new Error("Missing parameters"));
      await signUp(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Missing parameters" })).to.be.true;
    });
  });

  describe("sign in a user", () => {
    const req = {
      body: {
        mail: "hugh.jass@mail.fr",
        password: "123456",
      },
    };

    it("should return a token if user signed in successfully", async () => {
      const user = {
        _id: "123",
        mail: "hugh.jass@mail.fr",
        password: "123456",
      };

      findOneStub.resolves(user);
      bcrypt.compare.resolves(true);
      jwt.sign.returns("token");

      await signIn(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ access_token: "token" })).to.be.true;
    });

    it("should return an error message if user does not exist", async () => {
      findOneStub.resolves(null);
      await signIn(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Ce compte n'existe pas" })).to.be
        .true;
    });

    it("should return an error message if password is incorrect", async () => {
      const user = {
        _id: "123",
        mail: "hugh.jass@mail.fr",
        password: "123456",
      };

      findOneStub.resolves(user);
      bcrypt.compare.resolves(false);

      await signIn(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "Mot de passe incorrect" })).to.be
        .true;
    });
  });

  describe("delete a user", () => {
    const req = {
      params: {
        id: "1234",
      },
    };

    it("should return a message if user deleted successfully", async () => {
      findByIdAndDeleteStub.resolves();
      await deleteUser(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "User deleted successfully" })).to
        .be.true;
    });

    it("should return an error message if user not deleted", async () => {
      findByIdAndDeleteStub.rejects(new Error("User not found"));
      await deleteUser(req, res);
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: "User not found" })).to.be.true;
    });
  });
});
