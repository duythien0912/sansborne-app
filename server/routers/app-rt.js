'use strict';
const appRt = require('express').Router();

const { AppCtrl } = require('../controllers');

appRt.get('/v1/events', AppCtrl.getManyEvent);
appRt.get('/v1/customers', AppCtrl.getManyCustomer);

appRt.post('/v1/membership', AppCtrl.updateMembershipSetting);

appRt.get('/v1/membership', AppCtrl.getUserMembership);
appRt.get('/v1/membership/check', AppCtrl.checkUserMembership);
appRt.get('/v1/membership/check-all', AppCtrl.checkAllUserMembership);

appRt.get('/v1/sapo-webhook/order-transaction/create', AppCtrl.createSapoOrderTransactionHook);

appRt.get('/admin/settings', AppCtrl.saveInstallSuccess);

appRt.get('/v1/cron', AppCtrl.getCronStatus);

appRt.get('/v1/cron/membership', AppCtrl.changeTimeCheckUserMemberShip);
appRt.get('/v1/cron/sapo', AppCtrl.changeTimeSyncSapoData);

module.exports = appRt;
