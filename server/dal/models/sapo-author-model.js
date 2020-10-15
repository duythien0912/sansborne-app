'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Authors',
  new Schema({}, { strict: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }),
  'authors'
);
