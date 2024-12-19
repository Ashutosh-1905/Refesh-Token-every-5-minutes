import User from "../models/userModel.js";
import generateAccessToken from "../utils/generateAccesstoken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

const refreshUserTokens = async (userId) => {
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      accessToken,
      refreshToken,
      tokenExpiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
    },
    { new: true }
  );

  return updatedUser;
};

export default refreshUserTokens;
