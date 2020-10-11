'use strict';
const { Store } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoStoresrv {
  static async readMany(query, options) {
    return Store.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return Store.findOne({ _id });
  }

  static async createOne(body) {
    return Store.create(body);
  }

  static async createMany(body) {
    return Store.insertMany(body);
  }

  static async updateOne(_id, body) {
    const newData = pick(body, ['email', 'phone', 'first_name', 'last_name', 'note', 'tags', 'total_spent']);

    return Store.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await Store.bulkWrite(bulkUpdateOps);

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
    ]);

    const { nModified } = await Store.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Store.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Store.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoStoresrv,
};
