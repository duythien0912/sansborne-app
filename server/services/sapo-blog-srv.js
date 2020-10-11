'use strict';
const { Blogs } = require('../dal/models');
const { pick } = require('../helpers/objects');

class SapoBlogsrv {
  static async readMany(query, options) {
    return Blogs.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return Blogs.findOne({ _id });
  }

  static async createOne(body) {
    return Blogs.create(body);
  }

  static async createMany(body) {
    return Blogs.insertMany(body);
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

    return Blogs.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await Blogs.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await Blogs.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Blogs.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Blogs.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  SapoBlogsrv,
};
