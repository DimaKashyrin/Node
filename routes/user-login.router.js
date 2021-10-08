const router = require('express').Router();

const userController = require('../controllers/user.controller');
const checkUserLoginMiddleware = require('../middlewares/login-value.middleware');

router.get('/auth/login', checkUserLoginMiddleware.checkUserLoginValue, userController.getLoginUser);
