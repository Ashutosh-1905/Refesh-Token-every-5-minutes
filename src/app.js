import express from "express";
import cors from "cors";
import session from "express-session";
import config from "./config/config.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import authRoute from "./routes/authRoute.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  Credential: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.secretSession || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/api/auth", authRoute);

app.use(globalErrorHandler);

export default app;
