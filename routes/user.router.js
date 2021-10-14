const router = require('express').Router();

const { userController } = require('../controllers');
const {
  userEmailMiddleware,
  userIdMiddleware,
  userNameMiddleware,
  userPasswordMiddleware
} = require('../middlewares');

router.get('/', userPasswordMiddleware.excludePasswords, userController.getUsers);
router.post('/',
  userEmailMiddleware.isUserBodyValid,
  userEmailMiddleware.createUserEmail,
  userController.createUser
);

router.get('/:user_id', userIdMiddleware.checkUserId, userController.getUserById);
router.patch('/:user_id',
  userNameMiddleware.checkUserName,
  userIdMiddleware.checkUserId,
  userController.updateUserName
);
router.delete('/:user_id', userIdMiddleware.checkUserId, userController.delUser);

module.exports = router;
