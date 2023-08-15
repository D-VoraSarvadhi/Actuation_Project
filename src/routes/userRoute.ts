import { Router } from 'express';
import { userController } from '../controllers/index';
import upload from '../config/cloudinary';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const user = new userController();

  route.post('/userInsert', user.userInsert);
  route.get('/verifyAccount/:email', user.verifyAccount);
  route.post('/loginUser', user.loginUser);

  route.post('/updateUser', Roles.requireAuth, Roles.authorization(['Seller']) , upload.single('avatar') , user.updateUser);
  route.get('/deleteUser/:id', user.userDelete);
  // route.post('/upload',upload.single('files'), user.upload);
  return route;
}