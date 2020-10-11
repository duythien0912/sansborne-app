'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('Blogs', new Schema({}, { strict: false }), 'blogs');
