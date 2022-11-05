import config from './config';

const mailerConfig = {
   host: config.EMAIL_HOST,
   port: 587,
   secure: false,
   auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD,
   },
   logger: true,
   debug: true,
   tls: {
      ciphers: 'SSLv3',
   },
};

export default mailerConfig;
