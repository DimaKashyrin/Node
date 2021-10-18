const { Types } = require("mongoose");

const User = require('../dataBase/User');
const userUtil = require('../util/user.util');
const { errorMessage: { idNotExist, badRequest } }= require('../errors');

module.exports = {
  checkUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const isIdValid = Types.ObjectId.isValid( user_id );
      
      if (!isIdValid) {
        next(badRequest);
        return;
      }
  
      const userById = await User.findById(user_id).lean();
      
      if (!userById) {
        next(idNotExist);
        return;
      }
      
      req.user = userUtil.userNormalizer(userById);
      next();
    } catch (err) {
      next(err);
    }
  }
};
