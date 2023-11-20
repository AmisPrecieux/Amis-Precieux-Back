import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
  const jwtKey = process.env.JWT;

  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Token manquant");
  }

  token = token.split(" ")[1];

  jwt.verify(token, jwtKey, (error, payload) => {
    if (error) {
      return res.status(401).send(error.message)
    }
    return next();
  });
}