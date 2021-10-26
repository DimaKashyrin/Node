const {
  constants: {
    AUTHORIZATION
  },
  tokenType: {
    ACCESS,
    REFRESH,
    FORGOT_PASSWORD
  }
} = require('../configs');
const { jwtService } = require('../service');
const { errorMessage: { unauthorized } } = require('../errors');
const { O_Auth } = require('../dataBase');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
  
      if(!token){
        next(unauthorized);
        return;
      }
      
      await jwtService.verifyToken(token, ACCESS);
      
      const tokenResponse = await O_Auth.findOne(
        { access_token: token}
      ).populate('user_id');
      
      if(!tokenResponse) {
        next(unauthorized);
        return;
      }
      
      req.user = tokenResponse.user_id;
      next();
    } catch (err) {
      next(err);
    }
  },
  
  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      
      if(!token){
        next(unauthorized);
        return;
      }
      
      await jwtService.verifyToken(token, REFRESH);
      
      const tokenResponse = await O_Auth.findOne(
        { refresh_token: token}
      ).populate('user_id');
      
      if(!tokenResponse) {
        next(unauthorized);
        return;
      }
  
      await O_Auth.remove({ refresh_token: token });
      
      req.user = tokenResponse.user_id;
      next();
    } catch (err) {
      next(err);
    }
  },
  
  checkActionToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      
      if(!token){
        next(unauthorized);
        return;
      }
      
      await jwtService.verifyToken(token, FORGOT_PASSWORD);
      
      next();
    } catch (err) {
      next(err);
    }
  }
};
