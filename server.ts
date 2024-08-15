import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

export class Server {
  private app: express.Application;
  private port: number = 3000;

  constructor() {
    // server
    this.app = express();

    // config
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.port = Number(process.env.PORT);

    // middlewares
    this.setupEnv();
    this.setCors();
    this.setupRoutes();
  }

  init() {
    this.app.listen(this.port, () =>
      console.log(`>>> Server started at [${this.port}]`)
    );
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
