require('dotenv').config();
require('express-async-errors');

// external imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// internal imports
const populate = require('./utils/populate');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const protocolRouter = require('./routes/protocolRoutes');

// instantiate express
const app = express();

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(mongoSanitize());

// routes
app.use('/api/v1/protocols', protocolRouter);

// catch error from routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server port
const port = process.env.PORT || 5000;
const mongoURI = 'mongodb://mymongo:27017/protocols';

// connect mongoDB and start the server
const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await populate();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Call starter function
start();
