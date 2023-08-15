import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { urlencoded } from 'body-parser';
import * as routes from './routes/index';
import './middleware/passportStretagy';
import errorHandler from './middleware/errorHandling';
import './models/sellerModel';
import './middleware/schedule';
import './utils/dateFormate';

config();

const PORT = process.env.PORT || 9999;

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
    routes.initRoutes(this.app);
    this.app.use(errorHandler);
    this.app.listen(PORT);
  }
}

new Server();