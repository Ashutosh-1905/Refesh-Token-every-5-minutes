import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.SERVER_PORT,
  databaseUrl: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
  accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
};

const config = Object.freeze(_config);

export default config;