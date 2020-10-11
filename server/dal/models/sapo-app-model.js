'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('SapoApp', new Schema({}, { strict: false }), 'sapo_apps');
