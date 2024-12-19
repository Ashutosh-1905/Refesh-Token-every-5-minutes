import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, config.accessTokenSecretKey, {
    expiresIn: "5m",
  });

  return token;
};

export default generateAccessToken;
