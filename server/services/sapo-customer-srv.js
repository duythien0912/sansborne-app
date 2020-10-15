'use strict';
const Customers = require('../dal/models/sapo-customer-model');
const { pick } = require('../helpers/objects');

class SapoCustomerSrv {
  static async readMany(query, options) {
    return Customers.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }
  static async searchMany(query, options) {
    return Customers.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset - 1)
      .sort(options.sort);
  }
  static async countDocuments(query) {
    return Customers.countDocuments(query);
  }

  static async readAll(query) {
    return Customers.find(query, null, { lean: true });
  }

  static async readOne(_id) {
    return Customers.findOne({ _id });
  }

  static async readOneSapo(_id) {
    return Customers.findOne({ sapo_id: parseInt(_id) });
  }

  static async createOne(body) {
    return Customers.create(body);
  }

  static async createMany(body) {
    return Customers.insertMany(body);
  }

  static async updateOne(_id, body) {
    const newData = pick(body, [
      'email',
      'phone',
      'first_name',
      'last_name',
      'note',
      'tags',
      'total_spent',
      'orders_count',
      'birthday',
      'gender',
    ]);

    return Customers.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
  }

  static async updateOneBySapoId(body) {
    body.sapo_id = body.id;
    return Customers.findOneAndUpdate({ sapo_id: body.id }, body, {
      upsert: true,
      useFindAndModify: false,
      new: true,
    });
  }

  static async upsertOneBySapoId(body) {
    body.sapo_id = body.id;
    const find = await Customers.findOne({ sapo_id: parseInt(body.id) }, null);
    if (!find) {
      await Customers.create(body);
    } else {
      const newData = pick(body, [
        'email',
        'phone',
        'first_name',
        'last_name',
        'note',
        'tags',
        'total_spent',
        'orders_count',
        'addresses',
        'default_address',
        'last_order_id',
        'last_order_name',
        'modified_on',
        'state',
        'verified_email',
      ]);
      console.log(newData.note);

      const ress = await Customers.updateOne({ sapo_id: body.sapo_id }, newData, {
        useFindAndModify: false,
        new: true,
      });
      console.log(ress);
    }
    return Customers.findOne({ sapo_id: parseInt(body.id) }, null, { lean: true });
  }

  static async upsertMany(body) {
    body = body.map(val => {
      val.sapo_id = val.id;
      return val;
    });
    var bulkUpdateOps = body.map(function(doc) {
      return {
        updateOne: {
          filter: { sapo_id: doc.sapo_id },
          update: { $set: doc },
          upsert: true,
        },
      };
    });
    const { nModified } = await Customers.bulkWrite(bulkUpdateOps);

    return nModified > 0;
  }
  static async updateMany(body) {
    const newData = pick(body.updatingFields, [
      'email',
      'phone',
      'first_name',
      'last_name',
      'note',
      'tags',
      'total_spent',
      'orders_count',
    ]);

    const { nModified } = await Customers.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Customers.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Customers.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoCustomerSrv,
};
