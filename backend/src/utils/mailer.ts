import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import config from './config';
import mailerConfig from './mailerConfig';

interface SendMailProps {
   to: string;
   subject: string;
   html: string;
}

interface SendVerificationEmailProps {
   name: string;
   email: string;
   verificationToken?: string;
   origin: string;
}

// request: Request, response: Response
const sendEmail = async ({ to, subject, html }: SendMailProps) => {
   const transporter = nodemailer.createTransport(mailerConfig);

   // send mail with defined transport object
   await transporter.sendMail({
      from: '"Authentication App" <ubongy@outlook.com>', // sender address
      to,
      subject,
      html,
   });
};

const verifyMailer = async () => {
   const transporter = nodemailer.createTransport(mailerConfig);

   await transporter.verify(function (error, success) {
      if (error) {
         console.log(error);
      } else {
         console.log('Server is ready to take our messages');
      }
   });
};

const sendVerificationEmail = async ({
   name,
   email,
   verificationToken,
   origin,
}: SendVerificationEmailProps) => {
   const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

   const message = `<p>Please confirm your email by clicking on the following link : <a href="${verifyEmail}">Verify Email</a></p>`;

   return sendEmail({
      to: email,
      subject: 'Email confirmation',
      html: `<h4>Hello ${name}</h4>
      ${message}
      `,
   });
};

export default { sendEmail, verifyMailer, sendVerificationEmail };
