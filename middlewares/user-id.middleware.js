const User = require('../dataBase/User');

module.exports = {
  checkUserId: async (req, res, next) => {
    try {
      const {user_id} = req.params;
      const userById = await User.findById(user_id);
      
      if (!userById) {
        throw new Error('the user with the specified id does not exist');
      }
      
      req.user = userById;
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
