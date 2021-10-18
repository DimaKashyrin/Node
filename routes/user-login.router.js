const router = require('express').Router();

const { loginController } = require('../controllers');
const { loginMiddleware, userTokenMiddleware } = require('../middlewares/');

router.post('/',
  loginMiddleware.checkUserValuesValid,
  loginMiddleware.checkUserEmail,
  loginMiddleware.checkUserPassword,
  loginController.loginUser
);
router.delete('/', userTokenMiddleware.checkAccessToken, loginController.delAccount);

module.exports = router;
