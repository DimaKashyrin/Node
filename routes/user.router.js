const router = require('express').Router();

const userController = require('../controllers/user.controller');
const checkUserEmail = require('../middlewares/user-email.middleware');
const checkId = require('../middlewares/user-id.middleware');

router.get('/', userController.getUsers);
router.post('/',
  checkUserEmail.isUserBodyValid,
  checkUserEmail.createUserEmail,
  userController.createUser
);

router.get('/:user_id',checkId.checkUserId, userController.getUserById);
router.delete('/:user_id', checkId.checkUserId,userController.delUser);

module.exports = router;