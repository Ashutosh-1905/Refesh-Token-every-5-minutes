import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateAccessToken from "../utils/generateAccesstoken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import createHttpError from "http-errors";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(409, "Email is already registered"));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const accessToken = await generateAccessToken(newUser._id);
    const refreshToken = await generateRefreshToken(newUser._id);

    // Save tokens to the user document
    newUser.accessToken = accessToken;
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(createHttpError(400, "Email and password are required"));
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    // Generate tokens
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    // Update user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { register, login };
