const router = require('express').Router();

const { userController } = require('../controllers');
const {
  userEmailMiddleware,
  userIdMiddleware,
  userNameMiddleware,
  userPasswordMiddleware,
  userRolesMiddleware
} = require('../middlewares');
const { userRoles:{ ADMIN, MANAGER } } = require('../configs');

router.get('/',
  userPasswordMiddleware.excludePasswords,
  userController.getUsers
);
router.post('/',
  userEmailMiddleware.isUserBodyValid,
  userEmailMiddleware.createUserEmail,
  userController.createUser
);

router.get('/:user_id',
  userIdMiddleware.checkUserId,
  userController.getUserById
);
router.patch('/:user_id',
  userNameMiddleware.checkUserName,
  userIdMiddleware.checkUserId,
  userController.updateUserName
);
router.delete('/:user_id',
  userIdMiddleware.checkUserId,
  userRolesMiddleware.checkUserRole([
    ADMIN,
    MANAGER
  ]),
  userController.delUser
);

module.exports = router;
