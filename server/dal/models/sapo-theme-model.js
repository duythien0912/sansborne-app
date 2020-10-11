'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Themes', new Schema({}, { strict: false }), 'themes');
