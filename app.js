require('dotenv').config();
require('express-async-errors');

// external imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// internal imports
const populate = require('./utils/populate');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const protocolRouter = require('./routes/protocolRoutes');

// instantiate express
const app = express();
app.use(cors())

// json parser
app.use(express.json());

// routes
app.use('/api/v1/protocols', protocolRouter);

// catch error from routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server port
const port = process.env.SERVER_PORT || 5000;
const mongoURI = 'mongodb://mymongo:27017/protocols';

// connect mongoDB and start the server
const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
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
