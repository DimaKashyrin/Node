const router = require('express').Router();

const { loginController } = require('../controllers');
const { loginMiddleware } = require('../middlewares/');

router.post('/',
  loginMiddleware.checkUserValuesValid,
  loginMiddleware.checkUserEmail,
  loginMiddleware.checkUserPassword,
  loginController.loginUser
);

module.exports = router;
