import { NextFunction, Request, Response } from 'express';
import Items from '../models/sellerModel';
import { SUCCESS } from '../middleware/responceHandle';
import nodeSchedule from '../middleware/schedule';
import { DATE } from '../utils/dateFormate';

nodeSchedule();
class userController {

  insertItem = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const { id }: any = req.user;
      const cloudinaryResponse: Express.Multer.File[] | any = req.files;
      req.body.avatar = cloudinaryResponse?.map((allImage: Express.Multer.File) => allImage.path);
      req.body.sellerID = id;
      //   nodeSchedule(DATE[1]);

    //   const data = await Items.create(req.body);
    //   return SUCCESS(res, data);
    }
    catch (err) {
      return next(err);
    }
  };
}

export default userController;