const express = require('express');
const mongoose = require('mongoose');

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');
const userRouter = require('./routes/user.router');
const userLoginRouter = require('./routes/user-login.router');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/login', userLoginRouter);

app.listen(PORT, () => {
});
