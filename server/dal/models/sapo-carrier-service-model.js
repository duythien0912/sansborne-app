'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('CarrierServices', new Schema({}, { strict: false }), 'carrier_services');
