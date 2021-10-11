const router = require('express').Router();

const userController = require('../controllers/user.controller');
const checkUserLoginMiddleware = require('../middlewares/login-value.middleware');

router.post('/', checkUserLoginMiddleware.checkUserLoginValue, userController.getLoginUser);

module.exports = router;
