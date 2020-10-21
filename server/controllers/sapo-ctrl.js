'use strict';
const logger = require('log4js').getLogger('ENTRY.index');
const {
  SapoCustomerSrv,
  SapoAuthorsrv,
  SapoBlogsrv,
  SapoCollectsrv,
  SapoCommentsrv,
  SapoCustomCollectionsrv,
  SapoMetafieldsSyncsrv,
  SapoOrdersrv,
  SapoPagesrv,
  SapoPriceRulerv,
  SapoproductSyncsrv,
  SapoRedirectsrv,
  SapoScriptTagsrv,
  SapoSmartCollectionsrv,
  SapoStoresrv,
  SapoThemesrv,
  SapoCarrierServicesrv,
  SapoEventsrv,
} = require('../services');
// const { pick } = require('../helpers/objects');
const { sapoBaseUrl } = require('../configs');
const { request } = require('../helpers');
const moment = require('moment');

class SapoCtrl {
  static async articlesAuthorsSync(req, res) {
    const body = await SapoCtrl.authors();

    return res.created({
      body,
    });
  }

  static async authors() {
    const url = `${sapoBaseUrl}/articles/authors.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.authors) ? SapoAuthorsrv.upsertMany : SapoAuthorsrv.createOne;

    await create(body.authors);
    return body;
  }

  static async blogSync(req, res) {
    const body = await SapoCtrl.blogs();

    return res.created({
      body,
    });
  }

  static async blogs() {
    const url = `${sapoBaseUrl}/blogs.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.blogs) ? SapoBlogsrv.upsertMany : SapoBlogsrv.createOne;

    await create(body.blogs);
    return body;
  }

  static async collectsSync(req, res) {
    const body = await SapoCtrl.collects();

    return res.created({
      body,
    });
  }

  static async collects() {
    const url = `${sapoBaseUrl}/collects.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.collects) ? SapoCollectsrv.upsertMany : SapoCollectsrv.createOne;

    await create(body.collects);
    return body;
  }

  static async commentsSync(req, res) {
    const body = await SapoCtrl.comments();

    return res.created({
      body,
    });
  }

  static async comments() {
    const url = `${sapoBaseUrl}/comments.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.comments) ? SapoCommentsrv.upsertMany : SapoCommentsrv.createOne;

    await create(body.comments);
    return body;
  }

  static async customCollectionsSync(req, res) {
    const body = await SapoCtrl.custom_collections();

    return res.created({
      body,
    });
  }

  static async custom_collections() {
    const url = `${sapoBaseUrl}/custom_collections.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.custom_collections)
      ? SapoCustomCollectionsrv.upsertMany
      : SapoCustomCollectionsrv.createOne;

    await create(body.custom_collections);
    return body;
  }

  static async metafieldsSync(req, res) {
    const body = await SapoCtrl.metafields();

    return res.created({
      body,
    });
  }

  static async metafields() {
    const url = `${sapoBaseUrl}/metafields.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.metafields) ? SapoMetafieldsSyncsrv.upsertMany : SapoMetafieldsSyncsrv.createOne;

    await create(body.metafields);
    return body;
  }

  static async ordersSync(req, res) {
    const body = await SapoCtrl.orders();

    return res.created({
      body,
    });
  }

  static async orders() {
    const url = `${sapoBaseUrl}/orders.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.orders) ? SapoOrdersrv.upsertMany : SapoOrdersrv.createOne;

    await create(body.orders);
    return body;
  }

  static async pagesSync(req, res) {
    const body = await SapoCtrl.pages();

    return res.created({
      body,
    });
  }

  static async pages() {
    const url = `${sapoBaseUrl}/pages.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.pages) ? SapoPagesrv.upsertMany : SapoPagesrv.createOne;

    await create(body.pages);
    return body;
  }

  static async priceRuleSync(req, res) {
    const body = await SapoCtrl.price_rules();

    return res.created({
      body,
    });
  }

  static async price_rules() {
    const url = `${sapoBaseUrl}/price_rules.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.price_rules) ? SapoPriceRulerv.upsertMany : SapoPriceRulerv.createOne;

    await create(body.price_rules);
    return body;
  }

  static async productSync(req, res) {
    const body = await SapoCtrl.products();

    return res.created({
      body,
    });
  }

  static async products() {
    const url = `${sapoBaseUrl}/products.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.products) ? SapoproductSyncsrv.upsertMany : SapoproductSyncsrv.createOne;

    await create(body.products);
    return body;
  }

  static async redirectSync(req, res) {
    const body = await SapoCtrl.redirect();

    return res.created({
      body,
    });
  }

  static async redirect() {
    const url = `${sapoBaseUrl}/redirects.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.redirects) ? SapoRedirectsrv.upsertMany : SapoRedirectsrv.createOne;

    await create(body.redirects);
    return body;
  }

  static async scriptTagsSync(req, res) {
    const body = await SapoCtrl.scriptTag();

    return res.created({
      body,
    });
  }

  static async scriptTag() {
    const url = `${sapoBaseUrl}/script_tags.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.script_tags) ? SapoScriptTagsrv.upsertMany : SapoScriptTagsrv.createOne;

    await create(body.script_tags);
    return body;
  }

  static async smartCollectionSync(req, res) {
    const body = await SapoCtrl.smartCollection();

    return res.created({
      body,
    });
  }

  static async smartCollection() {
    const url = `${sapoBaseUrl}/smart_collections.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.smart_collections)
      ? SapoSmartCollectionsrv.upsertMany
      : SapoSmartCollectionsrv.createOne;

    await create(body.smart_collections);
    return body;
  }

  static async storeSync(req, res) {
    const body = await SapoCtrl.stores();

    return res.created({
      body,
    });
  }

  static async stores() {
    const url = `${sapoBaseUrl}/shop.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.shop) ? SapoStoresrv.upsertMany : SapoStoresrv.createOne;

    await create(body.shop);
    return body;
  }

  static async themeSync(req, res) {
    const body = await SapoCtrl.themes();

    return res.created({
      body,
    });
  }

  static async themes() {
    const url = `${sapoBaseUrl}/themes.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.themes) ? SapoThemesrv.upsertMany : SapoThemesrv.createOne;

    await create(body.themes);
    return body;
  }

  static async carrierServiceSync(req, res) {
    const body = await SapoCtrl.carrierServices();

    return res.created({
      body,
    });
  }

  static async carrierServices() {
    const url = `${sapoBaseUrl}/carrier_services.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.carrier_services)
      ? SapoCarrierServicesrv.upsertMany
      : SapoCarrierServicesrv.createOne;

    await create(body.carrier_services);
    return body;
  }

  static async eventSync(req, res) {
    const body = await SapoCtrl.events();

    return res.created({
      body,
    });
  }

  static async events() {
    const url = `${sapoBaseUrl}/events.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.events) ? SapoEventsrv.upsertMany : SapoEventsrv.createOne;

    await create(body.events);
    return body;
  }

  static async customerSync(req, res) {
    const body = await SapoCtrl.customers();

    return res.created({
      body,
    });
  }

  static async customers() {
    const url = `${sapoBaseUrl}/customers.json`;
    const body = await request.request(url);

    const create = Array.isArray(body.customers) ? SapoCustomerSrv.upsertMany : SapoCustomerSrv.createOne;

    await create(body.customers);
    return body;
  }

  static async syncAll(req, res) {
    let {
      body_authors,
      body_blogs,
      body_collects,
      body_comments,
      body_custom_collections,
      body_metafields,
      body_orders,
      body_pages,
      body_price_rules,
      body_product,
      body_redirect,
      body_scriptTag,
      body_store,
      body_theme,
      body_carrierService,
      body_customer,
    } = await SapoCtrl.syncSapoData();

    return res.created({
      authors: body_authors,
      blogs: body_blogs,
      collects: body_collects,
      comments: body_comments,
      custom_collections: body_custom_collections,
      metafields: body_metafields,
      orders: body_orders,
      pages: body_pages,
      price_rules: body_price_rules,
      product: body_product,
      redirect: body_redirect,
      scriptTag: body_scriptTag,
      store: body_store,
      theme: body_theme,
      carrierService: body_carrierService,
      customer: body_customer,
    });
  }

  static async syncSapoData() {
    let body_authors = {};
    try {
      body_authors = await SapoCtrl.authors();
      logger.info(`Sync authors success: ${body_authors.authors.length} authors`);
    } catch (e) {
      body_authors = { error: `${e}` };
      logger.error(`Sync body_authors Error: ${e}`);
    }
    let body_blogs = {};
    try {
      body_blogs = await SapoCtrl.blogs();
      logger.info(`Sync authors success: ${body_blogs.blogs.length} blogs`);
    } catch (e) {
      body_blogs = { error: `${e}` };
      logger.error(`Sync body_blogs Error: ${e}`);
    }
    let body_collects = {};
    try {
      body_collects = await SapoCtrl.collects();
      logger.info(`Sync collects success: ${body_collects.collects.length} collects`);
    } catch (e) {
      body_collects = { error: `${e}` };
      logger.error(`Sync body_collects Error: ${e}`);
    }
    let body_comments = {};
    try {
      body_comments = await SapoCtrl.comments();
      logger.info(`Sync comments success: ${body_comments.comments.length} comments`);
    } catch (e) {
      body_comments = { error: `${e}` };
      logger.error(`Sync body_comments Error: ${e}`);
    }
    let body_custom_collections = {};
    try {
      body_custom_collections = await SapoCtrl.custom_collections();
      logger.info(
        `Sync custom_collections success: ${body_custom_collections.custom_collections.length} custom_collections`
      );
    } catch (e) {
      body_custom_collections = { error: `${e}` };
      logger.error(`Sync body_custom_collections Error: ${e}`);
    }
    let body_metafields = {};
    try {
      body_metafields = await SapoCtrl.metafields();
      logger.info(`Sync metafields success: ${body_metafields.metafields.length} metafields`);
    } catch (e) {
      body_metafields = { error: `${e}` };
      logger.error(`Sync body_metafields Error: ${e}`);
    }
    let body_orders = {};
    try {
      body_orders = await SapoCtrl.orders();
      logger.info(`Sync orders success: ${body_orders.orders.length} orders`);
    } catch (e) {
      body_orders = { error: `${e}` };
      logger.error(`Sync body_orders Error: ${e}`);
    }
    let body_pages = {};
    try {
      body_pages = await SapoCtrl.pages();
      logger.info(`Sync pages success: ${body_pages.pages.length} pages`);
    } catch (e) {
      body_pages = { error: `${e}` };
      logger.error(`Sync body_pages Error: ${e}`);
    }
    let body_price_rules = {};
    try {
      body_price_rules = await SapoCtrl.price_rules();
      logger.info(`Sync price_rules success: ${body_price_rules.price_rules.length} price_rules`);
    } catch (e) {
      body_price_rules = { error: `${e}` };
      logger.error(`Sync body_price_rules Error: ${e}`);
    }
    let body_products = {};
    try {
      body_products = await SapoCtrl.products();
      logger.info(`Sync products success: ${body_products.products.length} products`);
    } catch (e) {
      body_products = { error: `${e}` };
      logger.error(`Sync body_product Error: ${e}`);
    }
    let body_redirect = {};
    try {
      body_redirect = await SapoCtrl.redirect();
      logger.info(`Sync redirect success: ${body_redirect.redirects.length} redirect`);
    } catch (e) {
      body_redirect = { error: `${e}` };
      logger.error(`Sync body_redirect Error: ${e}`);
    }
    let body_scriptTag = {};
    try {
      body_scriptTag = await SapoCtrl.scriptTag();
      logger.info(`Sync script_tags success: ${body_scriptTag.script_tags.length} script_tags`);
    } catch (e) {
      body_scriptTag = { error: `${e}` };
      logger.error(`Sync body_scriptTag Error: ${e}`);
    }
    let body_stores = {};
    try {
      body_stores = await SapoCtrl.stores();
      logger.info(`Sync shop success: ${body_stores.shop.length} shop`);
    } catch (e) {
      body_stores = { error: `${e}` };
      logger.error(`Sync body_store Error: ${e}`);
    }
    let body_themes = {};
    try {
      body_themes = await SapoCtrl.themes();
      logger.info(`Sync theme success: ${body_themes.themes.length} theme`);
    } catch (e) {
      body_themes = { error: `${e}` };
      logger.error(`Sync body_theme Error: ${e}`);
    }
    let body_carrierServices = {};
    try {
      body_carrierServices = await SapoCtrl.carrierServices();
      logger.info(`Sync carrier_services success: ${body_carrierServices.carrier_services.length} carrier_services`);
    } catch (e) {
      body_carrierServices = { error: `${e}` };
      logger.error(`Sync body_carrierService Error: ${e}`);
    }
    let body_customers = {};
    try {
      body_customers = await SapoCtrl.customers();
      logger.info(`Sync customers success: ${body_customers.customers.length} customers`);
    } catch (e) {
      body_customers = { error: `${e}` };
      logger.error(`Sync body_customer Error: ${e}`);
    }
    return {
      body_authors,
      body_blogs,
      body_collects,
      body_comments,
      body_custom_collections,
      body_metafields,
      body_orders,
      body_pages,
      body_price_rules,
      body_product: body_products,
      body_redirect,
      body_scriptTag,
      body_store: body_stores,
      body_theme: body_themes,
      body_carrierService: body_carrierServices,
      body_customer: body_customers,
    };
  }

  // http://localhost:3000/v1/sapo/update_customer?sapo_id=10796283
  // {
  //     "customer": {
  //         "id": 10796283,
  //         "tags": "VIP",
  //         "note": "DOB: 21-12-1997"
  //     }
  // }
  static async updateCustomer(req, res) {
    try {
      if (!req.query.sapo_id) return res.notFound({ message: 'resource not found' });
      const bodycustomer = { customer: req.body.customer };
      const body = await SapoCtrl.updateCustomerPost(req.query.sapo_id, bodycustomer);
      body.customer.birthday = req.body.birthday;
      body.customer.birthday_iso = new Date(req.body.birthday);
      body.customer.gender = req.body.gender;
      const user = await SapoCustomerSrv.updateOneBySapoId(body.customer);

      return user ? res.accepted({ data: user }) : res.notFound({ message: 'resource not found' });
    } catch (e) {
      logger.error(`updateCustomer Error: ${e}`);
      return res.notFound({ message: 'resource not found' });
    }
  }

  static async updateCustomerPost(sapo_id, customerBody) {
    const url = `${sapoBaseUrl}/customers/${sapo_id}.json`;
    var reqBody = JSON.stringify(customerBody);

    const body = await request.request(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: reqBody,
    });
    return body;
  }
  // static async getMany(req, res) {
  //   const { query } = req;
  //   const findCriteria = pick(query, [
  //     'email',
  //     'phone',
  //     'first_name',
  //     'last_name',
  //     'note',
  //     'tags',
  //     'total_spent',
  //     'orders_count',
  //   ]);
  //   const options = pick(query, ['limit', 'offset', 'sort']);

  //   const users = await SapoCustomerSrv.readMany(findCriteria, options);

  //   return res.ok({
  //     data: users,
  //     limit: users.length,
  //   });
  // }

  // static async getOne(req, res) {
  //   const user = await SapoCustomerSrv.readOne(req.params._id);

  //   return res.ok({
  //     data: user,
  //   });
  // }

  // static async post(req, res) {
  //   const { body } = req;
  //   const create = Array.isArray(body) ? SapoCustomerSrv.createMany : SapoCustomerSrv.createOne;

  //   const data = await create(body);

  //   return res.created({
  //     data,
  //   });
  // }

  // static async putOne(req, res) {
  //   const user = await SapoCustomerSrv.updateOne(req.params._id, req.body); // change data

  //   return user ? res.accepted({ data: user }) : res.notFound({ message: 'resource not found' });
  // }

  // static async putMany(req, res) {
  //   const isModified = await SapoCustomerSrv.updateMany(req.body);

  //   return isModified
  //     ? res.accepted({ message: 'updated user by id' })
  //     : res.notFound({ message: 'resource not found' });
  // }

  // static async removeOne(req, res) {
  //   const isDeleted = await SapoCustomerSrv.deleteOne({ _id: req.params._id });

  //   return isDeleted ? res.noContent() : res.notFound({ message: 'resource not found' });
  // }

  // static async removeMany(req, res) {
  //   const isDeleted = await SapoCustomerSrv.deleteMany(req.body.ids);

  //   return isDeleted ? res.noContent() : res.notFound({ message: 'resource not found' });
  // }
}

module.exports = {
  SapoCtrl,
};
