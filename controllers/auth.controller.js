const { jwtService, emailService} = require('../service');
const { userNormalizer } = require('../util/user.util');
const { O_Auth, User, Action_token } = require('../dataBase');
const {
  constants: {
    AUTHORIZATION
  },
  emailAction: {
    LOGIN,
    DELETE_ACCOUNT,
    FORGOT_PASSWORD_EMAIL,
  },
  config: {
    FORGOT_PASSWORD_URL
  }
} = require('../configs');
const {
  errorMessage: {
    unauthorized,
    noContent,
    notFound
  },
  ErrorHandler
} = require('../errors');
const { FORGOT_PASSWORD } = require("../configs/action-token-type.enum");


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
      await emailService.sendMail(req.user.email, LOGIN);
  
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
      const { _id: user_id, name } = req.user;
      
      await User.deleteOne({ user_id });
      await O_Auth.deleteMany({ user_id });
  
      await emailService.sendMail(req.user.email, DELETE_ACCOUNT,{ name });
  
      res.sendStatus(noContent.status);
    }catch (err) {
      next(err);
    }
  },
  
  sendMailForgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      
      if(!user) {
        throw new ErrorHandler(notFound);
      }
      
      const actionToken = jwtService.generateActionToken(FORGOT_PASSWORD);
      
      await Action_token.create({
        token: actionToken,
        token_type: FORGOT_PASSWORD,
        user_id: user._id
      });
      
      await emailService.sendMail(
        email,
        FORGOT_PASSWORD_EMAIL,
        { urlForgot: `${ FORGOT_PASSWORD_URL }passwordForgot?token=${ actionToken }` }
      );
      
      res.json('ok');
    }catch (err) {
      next(err);
    }
  },
  
  setNewPasswordAfterForgot: (req, res, next) => {
    try {
      const actionToken = req.get(AUTHORIZATION);
      console.log(actionToken);
      console.log(req.body);
      res.json('good');
    }catch (err) {
      next(err);
    }
  }
};
