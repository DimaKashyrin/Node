const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const {
  config:{ MONGO_CONNECT_URL ,PORT, ALLOWED_ORIGIN, NODE_ENV },
  constants:{ DEFAULT_STATUS },
}= require('./configs');
const { userRouter , authRouter } = require('./routes');
const { ErrorHandler } = require('./errors');
const createDefaultDate = require('./util/default-data.util');
const startCron = require('./cron');
const swaggerJson = require('./docs/swagger.json');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(cors({ origin: _configureCors }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*',(err, req, res, next) => {
  res
    .status(err.status || DEFAULT_STATUS)
    .json({
      message: err.message
    });
});

app.listen(PORT, () => {
  createDefaultDate();
  startCron();
});

function _configureCors(origin, callback) {
  if (NODE_ENV === 'dev') {
    return callback(null, true);
  }
  const whiteList = ALLOWED_ORIGIN.split(';');
  if(!whiteList.includes((origin))) {
    return callback(new ErrorHandler('CORS is not allowed'), false);
  }
  return callback(null, true);
}

