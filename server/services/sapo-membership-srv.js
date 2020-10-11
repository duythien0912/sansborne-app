'use strict';
const { Membership } = require('../dal/models');
const { pick } = require('../helpers/objects');

class Membershipsvr {
  static async readMany(query, options) {
    return Membership.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return Membership.findOne({ _id });
  }

  static async readOneByType(_type) {
    return Membership.findOne({ type: _type });
  }

  static async createOne(body) {
    return Membership.updateOne(
      {
        type: body.type,
      },
      body,
      { upsert: true }
    );
  }

  static async createMany(body) {
    return Membership.insertMany(body);
  }

  static async updateOne(_id, body) {
    const newData = pick(body, ['email', 'phone', 'first_name', 'last_name', 'note', 'tags', 'total_spent']);

    return Membership.findOneAndUpdate({ _id }, newData, { useFindAndModify: false, new: true });
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
    const { nModified } = await Membership.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await Membership.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await Membership.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await Membership.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  Membershipsvr,
};
