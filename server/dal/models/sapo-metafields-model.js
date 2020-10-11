'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Metafields', new Schema({}, { strict: false }), 'metafields');
