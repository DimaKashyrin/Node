const router = require('express').Router();

const loginController = require('../controllers/login.controller');
const checkUserLoginMiddleware = require('../middlewares/login-value.middleware');

router.post('/',
  checkUserLoginMiddleware.checkUserValuesValid,
  checkUserLoginMiddleware.checkUserEmail,
  checkUserLoginMiddleware.checkUserPassword,
  loginController.loginUser
);

module.exports = router;
