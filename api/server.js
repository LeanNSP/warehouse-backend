'use strict';

const express = require('express');
const logger = require('morgan');
require('colors');

// Security
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const { NODE_MODE, PORT, CORS_URL } = require('./config/env.keys');

const connectMongoDB = require('./config/mongoDB');
const connectPostgresDB = require('./config/pgDB');

// connection to databases
connectMongoDB();
connectPostgresDB();

const app = express();

// In development mode writes a log to the console
if (NODE_MODE === 'development') {
  app.use(logger('dev'));
}

// Body parser
app.use(express.urlencoded());
app.use(express.json());

// This is to sanitize the received data, and remove any offending keys, or replace the characters with a 'safe' one.
app.use(mongoSanitize());

// Helmet helps you secure your Express apps by setting various HTTP headers.
// If not use Helmet, then use app.disable('x-powered-by');
app.use(helmet());

// Prevent XSS attacks. This will sanitize any data in req.body, req.query, and req.params.
app.use(xss());

// Used to limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Against HTTP Parameter Pollution attacks
app.use(hpp());

// Enable CORS
app.use(cors({ origin: `${CORS_URL}:${PORT}` }));

const server = app.listen(PORT || 3300, () => {
  console.log(`Server started in ${NODE_MODE} mode on port: ${PORT}`.black.bgWhite.bold);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
