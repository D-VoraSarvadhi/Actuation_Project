import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/userModel';
import { SUCCESS, notFoundMessage } from '../middleware/responceHandle';
import { sendEmail } from '../config/verification';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import Token from '../models/tokenModel';

config();
const { SECRET_KEY }:any = process.env;

class userController {
  userInsert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await User.create(req.body);
      const { id, userName ,email, roles } = data;
      sendEmail(email);
      return SUCCESS(res, { id, userName ,email, roles });
    }
    catch (err) {
      return next(err);
    }
  };

  verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const data = await User.findOne({ where: { email: email }});
      if(!data) throw new appError(errorType.not_found, notFoundMessage('Data'));
      data.verify = true;
      data.save();
      res.json({ message: 'Your account has been verified' });
    }
    catch (err) {
      return next(err);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({ where: { email: email, verify: true }});
      if(!data) throw new appError(errorType.not_found, 'Verification failed...Please verify your account !!');

      const checkpass = await bcrypt.compareSync(password, data.password);
      if(!checkpass) throw new appError(errorType.bad_request, 'Password Not match... Please enter correct password !!!');

      const tokenInfo = {
        id: data.id,
        userName: data.userName,
        verify: data.verify,
        email: data.email,
        roles: data.roles
      };
      const token = await jwt.sign(tokenInfo, SECRET_KEY, { expiresIn: '30m' });

      let tokenData = await Token.findOne({ where: { UserId: data.id }});
      if(!tokenData){
        tokenData = await Token.create({ token, UserId: data.id });
      }
      tokenData.token = token;
      tokenData.save();
      return SUCCESS(res, tokenData);
    }
    catch (err) {
      return next(err);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const { id }: any = req.user;
      if(req.file){
        const cloudinaryResponse = req.file;
        req.body.avatar = cloudinaryResponse.path;
      }
      const data = await User.update(req.body, { where: { id }, returning: true });
      return SUCCESS(res,data[0]);
    }
    catch(err) {
      return next(err);
    }
  };

  userDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id }: any = req.user;
      const data:any = await User.findByPk(id);
      const public_id = data.avatar;
      console.log(public_id.split('/'));

      const deletionResult = await cloudinary.uploader.destroy('jzwmjhgauxxms3u7wwek.png');
      console.log(deletionResult);

    }
    catch (err) {
      return next(err);
    }
  };
}

export default userController;