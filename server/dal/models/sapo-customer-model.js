'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Customers', new Schema({}, { strict: false }), 'customers');
