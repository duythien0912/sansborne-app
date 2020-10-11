'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Products', new Schema({}, { strict: false }), 'products');
