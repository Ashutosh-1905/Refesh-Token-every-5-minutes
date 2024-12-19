import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Please Provide unique email"],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Please provide minimum length 6"],
      select: false,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    accessToken: {
      type: String,
      default: "",
    },
    tokenExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;