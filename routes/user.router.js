const router = require('express').Router();

const userController = require('../controllers/user.controller');
const checkUserEmail = require('../middlewares/user-email.middleware');
const checkId = require('../middlewares/user-id.middleware');
const checkName = require('../middlewares/user-name.middleware');
const hidePassword = require('../middlewares/users-password.middleware');

router.get('/', hidePassword.excludePasswords, userController.getUsers);
router.post('/',
  checkUserEmail.isUserBodyValid,
  checkUserEmail.createUserEmail,
  userController.createUser
);

router.get('/:user_id', checkId.checkUserId, userController.getUserById);
router.patch('/:user_id',
  checkName.checkUserName,
  checkId.checkUserId,
  userController.updateUserName
);
router.delete('/:user_id', checkId.checkUserId, userController.delUser);

module.exports = router;
