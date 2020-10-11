'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('UsersMembership', new Schema({}, { strict: false }), 'users_membership');
