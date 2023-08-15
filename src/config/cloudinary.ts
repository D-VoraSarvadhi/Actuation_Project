import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { appError } from '../utils/errorHelper';
import errorType from '../utils/errorType';
import { Request } from 'express';

cloudinary.config({
  cloud_name: 'dninueas3',
  api_key: '524782416681816',
  api_secret: 'aC_eBlLa2XC3XVXOzg-mhCRBUXA'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary
});

const fileFilter = (req: Request, file: any,cb: any) => {
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png') cb(null, true);
  else cb(new appError(errorType.bad_request, 'Please Insert Valid formate JPG OR PNG'), false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024*1024 }});

export default upload;