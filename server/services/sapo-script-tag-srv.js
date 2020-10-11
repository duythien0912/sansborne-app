'use strict';
const { ScriptTag } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoScriptTagsrv {
  static async readMany(query, options) {
    return ScriptTag.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return ScriptTag.findOne({ _id });
  }

  static async createOne(body) {
    return ScriptTag.create(body);
  }

  static async createMany(body) {
    return ScriptTag.insertMany(body);
  }

  static async updateOne(_id, body) {
    const newData = pick(body, ['email', 'phone', 'first_name', 'last_name', 'note', 'tags', 'total_spent']);

    return ScriptTag.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await ScriptTag.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await ScriptTag.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await ScriptTag.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await ScriptTag.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoScriptTagsrv,
};
