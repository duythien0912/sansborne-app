'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model('ScriptTags', new Schema({}, { strict: false }), 'script_tags');