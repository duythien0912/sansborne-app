'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Redirects', new Schema({}, { strict: false }), 'redirects');
