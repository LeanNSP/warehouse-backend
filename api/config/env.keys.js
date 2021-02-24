'use strict';

// load env variables
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

if (dotenv.error) {
  throw new Error('.env file is not specified');
}

module.exports = {
  ...process.env,
};
