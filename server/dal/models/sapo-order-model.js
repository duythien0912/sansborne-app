'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Orders', new Schema({}, { strict: false }), 'orders');
