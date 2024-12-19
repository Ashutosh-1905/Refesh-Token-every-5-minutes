import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateRefreshToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, config.refreshTokenSecretKey, {
    expiresIn: "5d",
  });

  return token;
};

export default generateRefreshToken;
