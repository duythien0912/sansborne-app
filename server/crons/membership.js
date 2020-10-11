var CronJob = require('cron').CronJob;
const logger = require('log4js').getLogger('ENTRY.index');

// const { AppCtrl } = require('../controllers/app-ctrl');

var mockCorn = new CronJob(
  '* * 1 * *',
  async function() {
    logger.info(`==> Mock Cron MemberShip`);
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
);

var timeChangeBackup = 5;
var timeChangeMemberShip = 5;
var membershipCron = mockCorn;

var syncDataCron = mockCorn;

module.exports = { membershipCron, syncDataCron, mockCorn, timeChangeBackup, timeChangeMemberShip };
