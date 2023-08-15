import express, { Express } from 'express';
import { END_POINT } from '../constant/endPoint';
import userRoute from './userRoute';
import sellerRoute from './sellerRoute';

const route = express.Router();

export function initRoutes(app: Express){
  app.use(END_POINT.USER, userRoute(route));
  app.use(END_POINT.SELLER, sellerRoute(route));
}