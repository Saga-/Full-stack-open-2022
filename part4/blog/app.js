const express = require('express')
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to:', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message));

// Before route handling
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);
// Routers
app.use(blogRouter);
// After route handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app
