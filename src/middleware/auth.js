import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(createHttpError(401, "Not authorized to access this route"));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = User.findById(decoded.id);

    if (!user) {
      return next(new createHttpError(404, "No user found with this id"));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(
      new createHttpError(401, "Not authorized to access this route")
    );
  }
};

export default protect;
