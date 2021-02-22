'use strict';

const mongoose = require('mongoose');

const { MONGO_URI } = require('./env.keys');

const connectMongoDB = async () => {
  try {
    const connectDB = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    if (connectDB) {
      console.log(`MongoDB Connected: "${connectDB.connection.host}"`.white.bgGreen.bold);
    }
  } catch (error) {
    const err = new Error('Not connect db');
    err.code = 500;
    return err;
  }
};

module.exports = connectMongoDB;
