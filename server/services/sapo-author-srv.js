'use strict';
const { Authors } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoAuthorsrv {
  static async readMany(query, options) {
    return Authors.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return Authors.findOne({ _id });
  }

  static async createOne(body) {
    return Authors.create(body);
  }

  static async createMany(body) {
    return Authors.insertMany(body);
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
    ]);

    return Authors.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
  }

  static async upsertMany(body) {
    var bulkUpdateOps = body.map(function(doc) {
      return {
        updateOne: {
          filter: { authors: doc },
          update: { $set: { authors: doc } },
          upsert: true,
        },
      };
    });
    const { nModified } = await Authors.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await Authors.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Authors.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Authors.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoAuthorsrv,
};
