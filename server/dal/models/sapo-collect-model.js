'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Collects', new Schema({}, { strict: false }), 'collects');
