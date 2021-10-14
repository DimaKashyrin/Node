const User = require('../dataBase/User');
const userUtil = require('../util/user.util');

module.exports = {
  checkUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const userById = await User.findById(user_id).lean();
      
      if (!userById) {
        next({
          message:'the user with the specified id does not exist',
          status: 406
        });
      }
      
      req.user = userUtil.userNormalizer(userById);
      next();
    } catch (err) {
      next(err);
    }
  }
};
