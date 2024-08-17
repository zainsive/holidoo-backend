import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import client from "../config/redis-client";
import { errorHandler } from "./error/handler";

export class Server {
  private app: express.Application;

  constructor() {
    // server
    this.app = express();

    // config
    this.app.use(
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json(),
      cors(),
      morgan("short"),
      errorHandler,
    );

    // middlewares
    this.setupEnv();
    this.setupRoutes();

    // inits
    this.initCacheClient();
  }

  init() {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    this.app.listen(port, () => console.log(`>>> Server started at [${port}]`));
  }

  private setupRoutes() {
    this.app.get("/api", (req: express.Request, res: express.Response) => {
      res.send({ success: true });
    });
  }

  private setupEnv() {
    dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });
  }

  private initCacheClient() {
    client.on("connect", () => console.log("Cache is connecting"));
    client.on("ready", () => console.log("Cache is ready"));
    client.on("end", () => console.log("Cache disconnected"));
    client.on("error", (e) => console.log(e));
    client.connect();
  }
}
