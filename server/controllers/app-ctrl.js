/* eslint-disable no-irregular-whitespace */
'use strict';

const cron = require('cron-validator');
var CronJob = require('cron').CronJob;

const logger = require('log4js').getLogger('ENTRY.index');
const { SapoCustomerSrv, SapoOrdersrv, SapoEventsrv, Membershipsvr, SapoAppsvr } = require('../services');
// const { pick } = require('../helpers/objects');
const { sapoBaseUrl, sapo_app_api_key, sapo_app_secret_key } = require('../configs');
const { request } = require('../helpers');
const { pick } = require('lodash');
const { UsersMembershipsvr } = require('../services/sapo-user-membership-srv');
const { SapoCtrl } = require('./sapo-ctrl');
var { membershipCron, syncDataCron, mockCorn } = require('../crons/membership');

class AppCtrl {
  static timeChangeBackup = 5;
  static timeChangeMemberShip = 5;

  static async getManyEvent(req, res) {
    const { query } = req;
    const options = pick(query, ['limit', 'offset', 'sort']);

    const users = await SapoEventsrv.readMany({}, options);

    return res.ok({
      data: users,
      limit: users.length,
    });
  }

  static async getManyCustomer(req, res) {
    const { query } = req;
    const options = pick(query, ['limit', 'offset', 'sort']);

    const customers = await SapoCustomerSrv.readMany({}, options);

    return res.ok({
      data: customers,
      limit: customers.length,
    });
  }

  static async updateMembershipSetting(req, res) {
    if (req.body.membership == null) return res.notFound({ message: 'resource not found' });
    const create = Array.isArray(req.body.membership) ? Membershipsvr.upsertMany : Membershipsvr.createOne;

    const data = await create(req.body.membership);
    return res.created({
      data,
    });
  }

  // get user from table user_membership with id
  static async getUserMembership(req, res) {
    if (!req.query.sapo_id) return res.notFound({ message: 'sapo_id not found' });
    req.query.sapo_id = parseInt(req.query.sapo_id);

    const user = await UsersMembershipsvr.readOneSapo(req.params.sapo_id);

    return user ? res.accepted({ data: user }) : res.notFound({ message: 'resource not found' });
  }

  // get user from table user_membership with id
  static async checkUserMembership(req, res) {
    const sapo_id = parseInt(req.query.sapo_id);

    const resCheck = await AppCtrl.checkUserMemberById(sapo_id);
    if (typeof resCheck == 'string') res.notFound({ message: resCheck });
    // TODO: check second rule for Achieve
    return res.ok({ data: resCheck });
  }

  static async checkAllUserMembership(req, res) {
    const customers = await SapoCustomerSrv.readAll({});
    customers.map(async val => {
      const sapo_id = parseInt(val.sapo_id);
      if (!isNaN(sapo_id) && sapo_id != 1) await AppCtrl.checkUserMemberById(sapo_id);
    });

    // TODO: check second rule for Achieve
    return res.ok({ data: customers });
  }

  static async changeTimeCheckUserMemberShip(req, res) {
    try {
      var stop = req.query.stop;
      if (stop == 'true') {
        logger.info(`==> Stop Cron MemberShip Function ${stop}`);
        if (membershipCron != null) membershipCron.stop();
        membershipCron = mockCorn;
        return res.ok({ status: 'stop success' });
      }
      var timeChange = parseInt(req.query.time);
      if (typeof timeChange != 'number' || timeChange <= 0 || timeChange == null || isNaN(timeChange)) {
        return res.badRequest({ error: 'Time cron Change not correct' });
      }
      var cronString = `*/${timeChange} * * * *`;
      if (cron.isValidCron(cronString)) {
        AppCtrl.timeChangeMemberShip = timeChange;
        await AppCtrl.startCronMembership(cronString);
        return res.ok({ status: 'ok' });
      } else {
        return res.badRequest({ error: 'Cron not Valid' });
      }
    } catch (e) {
      return res.badRequest({ error: 'Something error' });
    }
  }

  static async startCronMembership(cronString) {
    logger.info(`==> Start Cron MemberShip Function`);
    if (membershipCron != null) await membershipCron.stop();
    membershipCron = new CronJob(
      cronString,
      async function() {
        logger.info(`==> Start Check All User MemberShip`);
        const customers = await SapoCustomerSrv.readAll({});
        customers.map(async val => {
          const sapo_id = parseInt(val.sapo_id);
          if (!isNaN(sapo_id) && sapo_id != 1) {
            return await AppCtrl.checkUserMemberById(sapo_id);
          }
        });
        logger.info(`==> Finish Check All User MemberShip`);
      },
      null,
      true,
      'Asia/Ho_Chi_Minh'
    );
    membershipCron.start();
  }

  static async changeTimeSyncSapoData(req, res) {
    try {
      var stop = req.query.stop;
      if (stop == 'true') {
        logger.info(`==> Stop Cron Sync Sapo Data Function ${stop}`);
        if (syncDataCron != null) syncDataCron.stop();
        syncDataCron = mockCorn;
        return res.ok({ status: 'stop success' });
      }
      var timeChange = parseInt(req.query.time);
      if (typeof timeChange != 'number' || timeChange <= 0 || timeChange == null || isNaN(timeChange)) {
        return res.badRequest({ error: 'Time cron Change not correct' });
      }
      var cronString = `*/${timeChange} * * * *`;
      if (cron.isValidCron(cronString)) {
        AppCtrl.timeChangeBackup = timeChange;
        await AppCtrl.startCronSyncSapoData(cronString);
        return res.ok({ status: 'ok' });
      } else {
        return res.badRequest({ error: 'Cron not Valid' });
      }
    } catch (e) {
      return res.badRequest({ error: 'Something error' });
    }
  }

  static async startCronSyncSapoData(cronString) {
    logger.info(`==> Start Cron Sync Sapo Data Function`);
    if (syncDataCron != null) await syncDataCron.stop();
    syncDataCron = new CronJob(
      cronString,
      async function() {
        logger.info(`==> Start Sync Sapo Data`);
        await SapoCtrl.syncSapoData();
        logger.info(`==> Finish Sync Sapo Data`);
      },
      null,
      true,
      'Asia/Ho_Chi_Minh'
    );
    syncDataCron.start();
  }
  static async checkUserMemberById(sapo_id) {
    logger.info(`==> Start Check User Membership By Id: ${sapo_id}`);
    let current_day = new Date();
    var year = current_day.getFullYear();
    var month = current_day.getMonth();
    var day = current_day.getDate();

    if (!sapo_id) return 'sapo_id not found';

    const resSapoCustomers = await request.request(`${sapoBaseUrl}/customers/${sapo_id}.json`);
    const sapoCustomers = resSapoCustomers.customer;
    sapoCustomers.id = sapo_id;

    const customer = await SapoCustomerSrv.upsertOneBySapoId(sapoCustomers);
    if (!customer) return 'Not found SapoCustomer';

    const memberRule = await Membershipsvr.readOneByType('sapo');

    const userMemberVip = await UsersMembershipsvr.readOneSapo(sapo_id);
    if (userMemberVip) {
      if (userMemberVip.class === memberRule.get('class')) {
        let achieved_date = new Date(userMemberVip.class_achieved_date);
        if (+achieved_date > +current_day) {
          await UsersMembershipsvr.updateOne(customer._id, customer);
          const userMemberVipUpdate = await UsersMembershipsvr.readOneSapo(sapo_id);
          console.log(userMemberVipUpdate.note);
          return userMemberVipUpdate;
        }
      }
    }

    let customerOrders = await SapoOrdersrv.readManyAll({
      'customer.id': sapo_id,
      financial_status: 'paid',
    });

    let total_spent_in_rule = 0;
    customerOrders.map(orderCurrent => {
      var rule_date = new Date(
        year - parseInt(memberRule.get('YearsUpgrade')),
        month - parseInt(memberRule.get('MonthsUpgrade')),
        day - parseInt(memberRule.get('DaysUpgrade'))
      );
      var order_day = new Date(orderCurrent.get('created_on'));

      if (+order_day > +rule_date) {
        total_spent_in_rule += parseInt(orderCurrent.get('total_price'));
      }
    });

    // Check first rule
    if (total_spent_in_rule >= memberRule.get('moneyUpgrade')) {
      const resVipCustomer = await SapoCtrl.updateCustomerPost(sapo_id, {
        customer: {
          id: sapo_id,
          tags: 'VIP',
        },
      });
      const vipCustomer = resVipCustomer.customer;
      vipCustomer.id = sapo_id;

      var class_achieved_date = new Date(
        year + parseInt(memberRule.get('YearsAchieve')),
        month + parseInt(memberRule.get('MonthsAchieve')),
        day + parseInt(memberRule.get('DaysAchieve'))
      );
      vipCustomer.class_achieved_date = class_achieved_date.toISOString();
      vipCustomer.class = memberRule.get('class');
      vipCustomer.class_upgrade_date = current_day.toISOString();

      await UsersMembershipsvr.updateOneBySapoId(vipCustomer);

      // return userMemberVip;
      const userMemberVipUpdate = await UsersMembershipsvr.readOneSapo(vipCustomer.id);
      return userMemberVipUpdate;
    }
  }

  static async createSapoOrderTransactionHook(req, res) {
    // const listAllHook = await request.request(`https://sansbornesaigon.mysapo.net/admin/oauth/access_token`);

    const data = await SapoAppsvr.readOneSapoStore('sansbornesaigon.mysapo.net');
    console.log(data);

    const listAllHook = await request.request(`${sapoBaseUrl}/admin/webhooks/count.json`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Sapo-Access-Token': data.access_token,
      },
    });
    console.log(listAllHook);
    return res.ok({});
  }

  static async saveInstallSuccess(req, res) {
    var code = req.query.code;
    var hmac = req.query.hmac;
    var store = req.query.store;
    var timestamp = req.query.timestamp;
    var query = '&code=' + code + '&hmac=' + hmac + '&store=' + store + '&timestamp=' + timestamp;
    if (typeof store != 'string') return res.redirect('/vi/admin/settings' + query);
    const dataCheck = await SapoAppsvr.readOneSapoStore(store);
    if (dataCheck) return res.redirect('/vi/admin/settings?install=success' + query);

    var body = {
      code: code,
      hmac: hmac,
      store: store,
      timestamp: timestamp,
      sapo_app_api_key: sapo_app_api_key,
      sapo_app_secret_key: sapo_app_secret_key,
    };
    var bodyReq = JSON.stringify({
      client_id: sapo_app_api_key,
      client_secret: sapo_app_secret_key,
      code: code,
    });
    var urlReq = `https://${store}/admin/oauth/access_token`;
    logger.info('==> INSTALL APP');
    logger.info(urlReq);
    logger.info(bodyReq);
    const bodyAccessToken = await request.request(urlReq, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: bodyReq,
    });
    console.log(bodyAccessToken);
    body.access_token = bodyAccessToken.access_token;
    body.scope = bodyAccessToken.scope;

    const create = Array.isArray(body) ? SapoAppsvr.upsertMany : SapoAppsvr.upsertOneBySapoStore;
    const data = await create(body);
    if (data) return res.redirect('/?install=success' + query);
    return res.redirect('/?install=failed' + query);
  }

  // check all user in table user_membership
  static async checkAllMembership(req, res) {
    if (!req.query.sapo_id) return res.notFound({ message: 'sapo_id not found' });
    const create = Array.isArray(req.body.membership) ? Membershipsvr.upsertMany : Membershipsvr.createOne;

    const data = await create(req.body.membership);
    return res.created({
      data,
    });
  }

  static async getCronStatus(req, res) {
    res.ok({
      data: {
        membership: membershipCron ? membershipCron.running : false,
        membership_time: AppCtrl.timeChangeMemberShip || 5,
        backup: syncDataCron ? syncDataCron.running : false,
        backup_time: AppCtrl.timeChangeBackup || 5,
      },
      status: 'ok',
    });
  }
}

module.exports = {
  AppCtrl,
};
