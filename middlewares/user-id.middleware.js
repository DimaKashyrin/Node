const User = require('../dataBase/User');
const userUtil = require('../util/user.util');

module.exports = {
  checkUserId: async (req, res, next) => {
    try {
      const {user_id} = req.params;
      const userById = await User.findById(user_id).lean();
      const normalizedUser = userUtil.userNormalizator(userById);
      
      if (!userById) {
        throw new Error('the user with the specified id does not exist');
      }
      
      req.user = normalizedUser;
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
