import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import config from './config';

// request: Request, response: Response
const sendEmail = async () => {
   const transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: 587,
      auth: {
         user: config.EMAIL_USER,
         pass: config.EMAIL_PASSWORD,
      },
      debug: true,
      logger: true,
      tls: {
         rejectUnauthorized: false,
      },
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: '"Authentication App 👻" <ubongy@outlook.com>', // sender address
      to: 'webbymaestro@gmail.com', // list of receivers
      subject: 'Testing Email', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
   });

   console.log('Message sent: %s', info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

const verifyMailer = async () => {
   const transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: 587,
      auth: {
         user: config.EMAIL_USER,
         pass: config.EMAIL_PASSWORD,
      },

      tls: {
         rejectUnauthorized: false,
      },
   });

   transporter.verify(function (error, success) {
      if (error) {
         console.log(error);
      } else {
         console.log('Server is ready to take our messages');
      }
   });
};

export default { sendEmail, verifyMailer };
