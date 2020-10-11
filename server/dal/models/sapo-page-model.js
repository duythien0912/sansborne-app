'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Pages', new Schema({}, { strict: false }), 'pages');
