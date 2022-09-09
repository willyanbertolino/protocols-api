require('dotenv').config();

// external imports
const express = require('express');
const mongoose = require('mongoose');

// internal imports
const populate = require('./utils/populate');
const notFoundMiddleware = require('./middlewares/notFound');
const errorMiddleware = require('./middlewares/errorHandler');
const protocolRouter = require('./routes/protocolRoutes');

// instantiate express
const app = express();

// json parser
app.use(express.json());

// routes
app.use('/api/v1/protocols', protocolRouter);

// catch error from routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// server port
const port = process.env.SERVER_PORT || 5000;

// connect mongoDB and start the server
const start = async () => {
  try {
    await mongoose.connect(`mongodb://mymongo:27017/protocols`, {
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
