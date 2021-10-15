const User = require('../dataBase/User');
const userUtil = require('../util/user.util');
const { errorMessage: { idNotExist } } = require('../errors');

module.exports = {
  checkUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const userById = await User.findById(user_id).exec();
      
      if (!userById) {
        next({
          message: idNotExist[0],
          status: idNotExist[1]
        });
      }
      
      req.user = userUtil.userNormalizer(userById);
      next();
    } catch (err) {
      next(err);
    }
  }
};
