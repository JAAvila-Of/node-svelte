import morgan from "morgan";
import cors from "cors";
import config from "./config";
import { json, urlencoded } from "express";
import { startServer } from "./app";

import "./config/mongodb";

import pokes from "./routes/pokes.routes";

function main() {
  const app = startServer();

  //middlewares
  app.use(morgan("dev"));
  app.use(cors());
  app.use(json());
  app.use(urlencoded());

  //routes
  app.use(pokes);

  app.listen(config.PORT_SERVER);

  console.log("Server on port ", config.PORT_SERVER);
}

main();
