'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('PriceRules', new Schema({}, { strict: false }), 'price_rules');
