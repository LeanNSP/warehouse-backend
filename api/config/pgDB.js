'use strict';

const Sequelize = require('sequelize');

const { PG_DB, PG_HOST, PG_PASS, PG_USER } = require('./env.keys');

const sequelize = new Sequelize({
  host: PG_HOST, // host of the database
  database: PG_DB, // name of the DB to connect
  dialect: 'postgres', // DB dialect, one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
  username: PG_USER, // DB user which will be used for connection to DB
  password: PG_PASS, // DB user's password
});

const connectPostgresDB = async () => {
  try {
    await sequelize.authenticate();

    console.log(`PostgresDB Connected.`.white.bgBlue.bold);
  } catch (error) {
    console.log('Not connect postgres db'.white.bgRed.bold);
  }
};

module.exports = connectPostgresDB;
