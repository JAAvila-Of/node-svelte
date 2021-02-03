import dotenv from "dotenv";
dotenv.config();

export default {
  PORT_SERVER: Number(process.env.PORT_SERVER) || 4000,
  MONGO_HOST: process.env.MONGO_HOST || "localhost",
  MONGO_DATABASE: process.env.MONGO_DATABASE || "pokedex",
};
