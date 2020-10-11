'use strict';
const rootPath = process.cwd() + '/server';

require('dotenv-flow').config({ path: `${rootPath}/envs` });
require('./loggerConfig');

const db = {
  url: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};
const port = process.env.PORT || 3000;
const sapoBaseUrl = process.env.SAPO_APP_URL;
const sapo_app_api_key = process.env.SAPO_APP_API_KEY;
const sapo_app_secret_key = process.env.SAPO_APP_SECRET_KEY;

const jwtSecret = `${process.env.JWT_SECRET}`;
const files = `${rootPath}/files`;
const uploads = `${rootPath}/uploads`;
const mailOptions = {
  host: 'smtp.gmail.com',
  port: 465, // 587, 465
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
};

module.exports = {
  db,
  port,
  files,
  uploads,
  jwtSecret,
  mailOptions,
  sapoBaseUrl,
  sapo_app_api_key,
  sapo_app_secret_key,
};
