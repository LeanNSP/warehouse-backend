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

    console.log(`MongoDB Connected: "${connectDB.connection.host}"`.white.bgGreen.bold);
  } catch (error) {
    console.log('Not connect mongo db'.white.bgRed.bold);
  }
};

module.exports = connectMongoDB;
