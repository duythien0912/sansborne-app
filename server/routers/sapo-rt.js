'use strict';
const sapoRt = require('express').Router();

const { SapoCtrl } = require('../controllers');

// TODO: add function for missing

// article
sapoRt.get('/v1/sapo/articles/authors', SapoCtrl.articlesAuthorsSync);
// asset
sapoRt.get('/v1/sapo/blogs', SapoCtrl.blogSync);
sapoRt.get('/v1/sapo/collects', SapoCtrl.collectsSync);
sapoRt.get('/v1/sapo/customers', SapoCtrl.customerSync);
sapoRt.get('/v1/sapo/comments', SapoCtrl.commentsSync);
// customeraddress
sapoRt.get('/v1/sapo/custom_collections', SapoCtrl.customCollectionsSync);
// discountcode
// event
// fulfillment
sapoRt.get('/v1/sapo/metafields', SapoCtrl.metafieldsSync);
sapoRt.get('/v1/sapo/orders', SapoCtrl.ordersSync);
sapoRt.get('/v1/sapo/pages', SapoCtrl.pagesSync);
sapoRt.get('/v1/sapo/price_rules', SapoCtrl.priceRuleSync);
sapoRt.get('/v1/sapo/products', SapoCtrl.productSync);
// product-variant
// product-image
sapoRt.get('/v1/sapo/redirects', SapoCtrl.redirectSync);
// refund
sapoRt.get('/v1/sapo/script_tags', SapoCtrl.scriptTagsSync);

sapoRt.get('/v1/sapo/smart_collections', SapoCtrl.smartCollectionSync);
sapoRt.get('/v1/sapo/store', SapoCtrl.storeSync);
sapoRt.get('/v1/sapo/themes', SapoCtrl.themeSync);
// transaction
sapoRt.get('/v1/sapo/carrier_services', SapoCtrl.carrierServiceSync);
sapoRt.get('/v1/sapo/events', SapoCtrl.eventSync);

sapoRt.get('/v1/sapo/sync_all', SapoCtrl.syncAll);

sapoRt.post('/v1/sapo/update_customer', SapoCtrl.updateCustomer);

module.exports = sapoRt;
