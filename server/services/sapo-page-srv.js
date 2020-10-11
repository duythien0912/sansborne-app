'use strict';
const { PriceRule } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoPriceRulerv {
  static async readMany(query, options) {
    return PriceRule.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return PriceRule.findOne({ _id });
  }

  static async createOne(body) {
    return PriceRule.create(body);
  }

  static async createMany(body) {
    return PriceRule.insertMany(body);
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
      'PriceRule_count',
    ]);

    return PriceRule.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await PriceRule.bulkWrite(bulkUpdateOps);

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
      'PriceRule_count',
    ]);

    const { nModified } = await PriceRule.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await PriceRule.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await PriceRule.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoPriceRulerv,
};
