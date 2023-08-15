import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const { USER_EMAIL, USER_PASS } = process.env;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS,
  }
});

export const sendEmail = async (email: string) => {
  await transporter.sendMail({
    from: USER_EMAIL,
    to: email,
    subject: 'HELLO',
    text: 'HELLO',
    html: `<a href='http://192.168.2.41:9999/user/verifyAccount/${email}'>Verify Account</a>`
  });
};