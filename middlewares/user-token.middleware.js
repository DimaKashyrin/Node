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
const { errorMessage: { unauthorized, badRequest } } = require('../errors');
const { O_Auth } = require('../dataBase');
const { checkForgotPassword } = require('../validators');

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
      
      console.log(token);
      console.log(req.body);
      
      await jwtService.verifyToken(token, FORGOT_PASSWORD);
      
      
      const { error, value } = checkForgotPassword.checkForgotPassword.validate(req.body);
      console.log(`${value} flag - 0000`);
  
      if (error) {
        next({
          message: error.details[0].message,
          status: badRequest.status
        });
        return;
      }
      
      console.log(`${value} flag - 1`);
      
      req.user = value;
      
      next();
    } catch (err) {
      next(err);
    }
  }
};
