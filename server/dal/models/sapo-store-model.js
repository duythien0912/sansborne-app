'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Stores', new Schema({}, { strict: false }), 'stores');
