const { constants: { AUTHORIZATION } } = require('../configs');
const { jwtService } = require('../service');
const ErrorHandler = require('../errors/ErrorHandler');
const { O_Auth } = require('../dataBase');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
  
      if(!token){
        throw new ErrorHandler('invalid token', 401);
      }
      
      await jwtService.verifyToken(token);
      
      const tokenResponse = await O_Auth.findOne(
        { access_token: token}
      ).populate('user_id');
      
      if(!tokenResponse) {
        throw new ErrorHandler('invalid token', 401);
      }
      
      req.user = tokenResponse.user_id;
      next();
    } catch (err) {
      next(err);
    }
  }
};
