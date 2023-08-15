import { Router } from 'express';
import { sellerController } from '../controllers/index';
import upload from '../config/cloudinary';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const seller = new sellerController();

  route.get('/insertItem', upload.array('avatar') , Roles.requireAuth, Roles.authorization(['Seller']) , seller.insertItem);

  return route;
}