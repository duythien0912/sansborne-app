'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('CustomCollections', new Schema({}, { strict: false }), 'custom_collections');
