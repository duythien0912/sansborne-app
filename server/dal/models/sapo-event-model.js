'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Events', new Schema({}, { strict: false }), 'events');
