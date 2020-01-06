const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs.controllers');
const userRouter = require('./controllers/users.controllers');
const loginRouter = require('./controllers/login.controllers');
const logger = require('./utils/logger');

logger.info('Connecting to', config.MONGODB_URI);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    logger.info('Connected to MongoDB server.');
  } catch (error) {
    logger.error('Error connecting to MongoDB: ', error.message);
  }
};

connectToMongoDB();

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing.controller');
  app.use('/api/testing', testingRouter);
  console.log('testing env');
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
