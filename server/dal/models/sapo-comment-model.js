'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Comments', new Schema({}, { strict: false }), 'comments');
