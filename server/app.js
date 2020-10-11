const { setConfig } = require('next/config');

setConfig(require('../next.config'));

const express = require('express');
const cors = require('cors');
const logger = require('log4js').getLogger('ENTRY.index');
const mongoose = require('mongoose');
const next = require('next');
const { Signale } = require('signale');

const dev = process.env.NODE_ENV !== 'production';
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('../i18n');
const configs = require('./configs');

const { membershipCron } = require('./crons/membership');
const { AppCtrl } = require('./controllers/app-ctrl');

const { port } = configs;

const app = next({ dev });

const handle = app.getRequestHandler();

logger.info(`Connect to Mongodb url: ${configs.db.url}`);

(async () => await mongoose.connect(configs.db.url, configs.db.options))().catch(err => logger.error({ err }));

const options = {
  scope: 'app server',
};

const signale = new Signale(options);

(async () => {
  await app.prepare();
  const server = express();
  server.use(cors());

  server.use('/', require('./routers'));

  server.use(nextI18NextMiddleware(nextI18next));
  server.use('/static', express.static('public/static'));

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  signale.success(`<> React Next Boilerplate ready on localhost:${port}`);
  membershipCron.start();

  AppCtrl.startCronMembership('*/5 * * * *');
  AppCtrl.startCronSyncSapoData('*/5 * * * *');

  logger.info(`app listen ${port} port`);
})();
