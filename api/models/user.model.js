'use strict';

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user', 'guest'], default: 'guest' },

  accessToken: { type: String },
  refreshToken: { type: String },
  sid: { type: String },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
