const router = require('express').Router();

const { userRoles:{ ADMIN, USER } } = require('../configs');
const { loginController } = require('../controllers');
const { loginMiddleware, userRolesMiddleware } = require('../middlewares/');

router.post('/',
  loginMiddleware.checkUserValuesValid,
  loginMiddleware.checkUserEmail,
  userRolesMiddleware.checkUserRole([
    ADMIN,
    USER
  ]),
  loginMiddleware.checkUserPassword,
  loginController.loginUser
);

module.exports = router;
