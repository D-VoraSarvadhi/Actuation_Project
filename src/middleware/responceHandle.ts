import { Response } from 'express';
import statusCode from '../constant/statusCode';

export const SUCCESS = (res: Response, data?:any) => {
  res.status(statusCode.SUCCESS).json({ statusCode: statusCode.SUCCESS, message: 'Operation done successfully', data: data });
};

export const notEmptyMessage = (msg: string) => {
  return `${msg} must be not empthy`;
};

export const notFoundMessage = (msg: string) => {
  return `${msg} not found`;
};