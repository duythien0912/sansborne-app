'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('SmartCollections', new Schema({}, { strict: false }), 'smart_collections');
