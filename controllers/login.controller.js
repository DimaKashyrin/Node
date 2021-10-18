const { jwtService } = require('../service');
const { userNormalizer } = require('../util/user.util');
const { O_Auth } = require('../dataBase');

module.exports = {
  loginUser: async (req, res, next) => {
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
  
  delAccount: (req, res, next) => {
    try {
      res.json('ok');
    }catch (err) {
      next(err);
    }
  }
};
