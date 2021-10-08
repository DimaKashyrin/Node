const router = require('express').Router();

const userController = require('../controllers/user.controller');
const checkUserLoginMiddleware = require('../middlewares/login-value.middleware');
const checkUserEmail = require('../middlewares/user-email.middleware');

router.post('/',checkUserEmail.createUserEmail, userController.createUser);
router.get('/auth/login',checkUserLoginMiddleware.checkUserLoginValue,userController.getUser);

module.exports = router;
