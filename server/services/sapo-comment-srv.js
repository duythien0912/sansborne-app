'use strict';
const { Comment } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoCommentsrv {
  static async readMany(query, options) {
    return Comment.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readAll(query) {
    return Comment.find(query);
  }

  static async readOne(_id) {
    return Comment.findOne({ _id });
  }

  static async createOne(body) {
    return Comment.create(body);
  }

  static async createMany(body) {
    return Comment.insertMany(body);
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

    return Comment.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await Comment.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await Comment.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Comment.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Comment.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoCommentsrv,
};
