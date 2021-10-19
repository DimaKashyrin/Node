const { jwtService } = require('../service');
const { userNormalizer } = require('../util/user.util');
const { O_Auth, User } = require('../dataBase');
const { constants: { AUTHORIZATION } } = require('../configs');
const { errorMessage: { unauthorized } } = require('../errors');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user } = req;
      const userPrepare = userNormalizer(user);
      const tokenPair = jwtService.generateTokenPair();
      
      await O_Auth.create({
        ...tokenPair,
        user_id: userPrepare._id
      });
      
      res.json({
        user: userPrepare,
        ...tokenPair
      });
    } catch (err) {
      next(err);
    }
  },
  
  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      
      const deleteToken = await O_Auth.remove({access_token: token});
      
      if (!deleteToken.deletedCount) {
        next(unauthorized);
        return;
      }
      
      res.json('user logged out');
    } catch (err) {
      next(err);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { user } = req;
      const userPrepare = userNormalizer(user);
      const tokenPair = jwtService.generateTokenPair();
      
      await O_Auth.create({
        ...tokenPair,
        user_id: userPrepare._id
      });
      
      res.json({
        user_id: userPrepare._id,
        ...tokenPair
      });
    } catch (err) {
      next(err);
    }
  },
  
  deleteAccount: async (req, res, next) => {
    try {
      const { _id: user_id } = req.user;
      
      await User.remove({ user_id });
      await O_Auth.remove({ user_id });
      
      res.json({
        id: user_id ,
        message: 'user has been deleted'
      });
    }catch (err) {
      next(err);
    }
  }
};
