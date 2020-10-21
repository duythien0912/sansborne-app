'use strict';
// var mongoose = require('mongoose');
const { UsersMembership } = require('../dal/models');
const { pick } = require('../helpers/objects');

class UsersMembershipsvr {
  static async readMany(query, options) {
    return UsersMembership.find(query)
      .limit(+options.limit || 10)
      .skip(+options.offset)
      .sort(options.sort);
  }

  static async readOne(_id) {
    return UsersMembership.findOne({ _id });
  }

  static async readOneSapo(_id) {
    return UsersMembership.findOne({ sapo_id: parseInt(_id) }, null, { lean: true });
  }
  static async createOne(body) {
    return UsersMembership.updateOne(
      {
        type: body.type,
      },
      body,
      { upsert: true }
    );
  }

  static async createMany(body) {
    return UsersMembership.insertMany(body);
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
      'addresses',
      'default_address',
      'last_order_id',
      'last_order_name',
      'modified_on',
      'state',
      'verified_email',
      'birthday',
      'birthday_iso',
      'gender',
    ]);
    console.log(newData.note);
    console.log(newData._id);

    return UsersMembership.updateOne({ sapo_id: parseInt(body.sapo_id) }, newData, {
      useFindAndModify: false,
      new: true,
    });
  }

  static async upsertOneBySapoId(body) {
    body.sapo_id = body.id;
    await UsersMembership.updateOne({ sapo_id: body.sapo_id }, body, {
      upsert: true,
    });
    return UsersMembership.findOne({ sapo_id: parseInt(body.sapo_id) }, null, { lean: true });
  }

  static async updateOneBySapoId(body) {
    body.sapo_id = body.id;

    return UsersMembership.updateOne({ sapo_id: parseInt(body.sapo_id) }, body, {
      upsert: true,
    });
  }

  static async findOneAndUpdate(body) {
    body.sapo_id = body.id;

    return UsersMembership.findOneAndUpdate({ sapo_id: body.sapo_id }, body, {
      upsert: true,
      useFindAndModify: false,
      new: true,
    });
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
    const { nModified } = await UsersMembership.bulkWrite(bulkUpdateOps);

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

    const { nModified } = await UsersMembership.updateMany(
      body.filter, // find criteria
      newData // changing data
    );

    return nModified > 0;
  }

  static async deleteOne(_id) {
    const { deletedCount } = await UsersMembership.deleteOne({ _id });

    return deletedCount > 0;
  }

  static async deleteMany(ids) {
    const { deletedCount } = await UsersMembership.deleteMany({ _id: { $in: ids } });

    return deletedCount > 0;
  }
}

module.exports = {
  UsersMembershipsvr,
};
