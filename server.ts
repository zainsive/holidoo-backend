import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

export class Server {
  private app: express.Application;

  constructor() {
    // server
    this.app = express();

    // config
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(morgan("short"));

    // middlewares
    this.setupEnv();
    this.setupRoutes();
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
}
