const router = require('express').Router();

const { authController } = require('../controllers');
const { loginMiddleware, userTokenMiddleware } = require('../middlewares/');

router.post('/login',
  loginMiddleware.checkUserValuesValid,
  loginMiddleware.checkUserEmail,
  loginMiddleware.checkUserPassword,
  authController.login
);
router.post('/logout',
  authController.logout
);
router.post('/refresh',
  userTokenMiddleware.checkRefreshToken,
  authController.refresh
);

router.delete('/delete',
  userTokenMiddleware.checkAccessToken,
  authController.deleteAccount
);

module.exports = router;
