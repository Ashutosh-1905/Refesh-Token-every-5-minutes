import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/connectDB.js";
import startTokenRefreshScheduler from "./src/scheduler/tokenScheduler.js";

const startServer = async () => {
  connectDB();
  const port = config.port || 4000;

  app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });

  startTokenRefreshScheduler();

  process.on("unhandledRejections", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
  });
};

startServer();
