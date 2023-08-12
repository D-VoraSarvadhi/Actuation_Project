import express, { Express } from 'express';
import cors from 'cors';
import { urlencoded } from 'body-parser';

const app = express();

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors({
      optionsSuccessStatus: 200
    }));
    this.app.use(urlencoded({
      extended: true
    }));
  }
}

new Server();

app.listen(9999);