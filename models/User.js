import { model, Schema } from "mongoose";

const userSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = model("User", userSchema);

export default User;