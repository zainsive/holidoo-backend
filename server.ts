import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

export class Server {
  private app: express.Application;

  constructor() {
    // server
    this.app = express();

    // config
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // middlewares
    this.setupEnv();
    this.setCors();
    this.setupRoutes();
  }

  init() {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    this.app.listen(port, () => console.log(`>>> Server started at [${port}]`));
  }

  private setCors() {
    this.app.use((req: express.Request, res: express.Response, next: any) => {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });
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
