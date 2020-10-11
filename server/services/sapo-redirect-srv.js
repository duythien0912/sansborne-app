'use strict';
const { Redirect } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoRedirectsrv {
  static async readMany(query, options) {
    return Redirect.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return Redirect.findOne({ _id });
  }

  static async createOne(body) {
    return Redirect.create(body);
  }

  static async createMany(body) {
    return Redirect.insertMany(body);
  }

  static async updateOne(_id, body) {
    const newData = pick(body, ['email', 'phone', 'first_name', 'last_name', 'note', 'tags', 'total_spent']);

    return Redirect.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await Redirect.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await Redirect.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Redirect.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Redirect.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoRedirectsrv,
};
