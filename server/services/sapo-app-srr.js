'use strict';
const { SapoApp } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoAppsvr {
  static async readMany(query, options) {
    return SapoApp.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return SapoApp.findOne({ _id });
  }

  static async readOneSapo(_id) {
    return SapoApp.findOne({ sapo_id: parseInt(_id) }, null, { lean: true });
  }

  static async readOneSapoStore(store) {
    return SapoApp.findOne({ store: store }, null, { lean: true });
  }

  static async createOne(body) {
    return SapoApp.updateOne(
      {
        type: body.type,
      },
      body,
      { upsert: true }
    );
  }
  static async upsertOneBySapoStore(body) {
    body.sapo_id = body.store;
    await SapoApp.updateOne({ sapo_id: body.store }, body, {
      upsert: true,
    });
    return SapoApp.findOne({ sapo_id: body.store });
  }

  static async createMany(body) {
    return SapoApp.insertMany(body);
  }

  static async updateOne(_id, body) {
    const newData = pick(body, ['email', 'phone', 'first_name', 'last_name', 'note', 'tags', 'total_spent']);

    return SapoApp.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
  }

  static async updateOneBySapoId(body) {
    body.sapo_id = body.id;

    return SapoApp.updateOne({ sapo_id: body.sapo_id }, body, {
      upsert: true,
    });
  }

  static async findOneAndUpdate(body) {
    body.sapo_id = body.id;

    return SapoApp.findOneAndUpdate({ sapo_id: body.sapo_id }, body, {});
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
    const { nModified } = await SapoApp.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await SapoApp.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await SapoApp.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await SapoApp.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoAppsvr,
};
