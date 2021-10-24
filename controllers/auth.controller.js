const { jwtService, emailService, passwordService } = require('../service');
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
    notFound,
    created
  },
  ErrorHandler
} = require('../errors');
const { tokenType:{ FORGOT_PASSWORD } } = require("../configs/");


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
      
      res.sendStatus(created.status);
    }catch (err) {
      next(err);
    }
  },
  
  setNewPasswordAfterForgot: async (req, res, next) => {
    try {
      const {password: newPassword} = req.newPassword;
      const hashedPassword = await passwordService.hash(newPassword);
      const actionToken = req.get(AUTHORIZATION);
  
      const findObjAction = await Action_token.findOne({actionToken});
  
      await O_Auth.deleteMany(findObjAction.user_id);
      await Action_token.deleteOne(findObjAction.user_id);
      
      await User.findOneAndUpdate(findObjAction.user_id, {password: hashedPassword});
  
      res.sendStatus(created.status);
    }catch (err) {
      next(err);
    }
  }
};
