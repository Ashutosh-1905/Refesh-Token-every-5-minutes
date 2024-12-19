import cron from "node-cron";
import User from "../models/userModel.js";
import refreshUserTokens from "../utils/refreshUserToken.js";

const startTokenRefreshScheduler = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Refreshing tokens for all users...");

    const users = await User.find(); // Fetch all users

    for (const user of users) {
      try {
        await refreshUserTokens(user._id); // Refresh tokens for each user
        console.log(`Tokens refreshed for user: ${user.username}`);
      } catch (error) {
        console.error(
          `Error refreshing tokens for user: ${user.username}`,
          error
        );
      }
    }

    console.log("Token refresh completed.");
  });
};

export default startTokenRefreshScheduler;
