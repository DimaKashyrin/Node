const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {
  config:{ MONGO_CONNECT_URL ,PORT },
  constants:{ DEFAULT_STATUS },
}= require('./configs');
const {userRouter , authRouter} = require('./routes');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
});
