import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function setUser(userBody) {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  userBody.password = await bcrypt.hash(userBody.password, salt);
  userBody.date = new Date();
  userBody.mail = userBody.mail.toLowerCase();
  userBody.isAdmin = false;
  const newUser = new User(userBody);
  await newUser.save();
}

export async function getUser(userBody) {
  const user = await User.findOne({
    mail: userBody.mail,
  });
  if (!user) throw new Error("Ce compte n'existe pas");

  const verifyPassword = await bcrypt.compare(userBody.password, user.password);

  if (!verifyPassword) throw new Error("Mot de passe incorrect");
  console.log(user._id, user.mail);

  const access_token = jwt.sign(
    {
      sub: user._id,
      mail: user.mail,
    },
    process.env.JWT, 
    {
      expiresIn: '1h',  
    }
  );

  return {
    access_token: access_token,
  };
}

export async function deleteUser(userId) {
  await User.findByIdAndDelete(userId);
}

