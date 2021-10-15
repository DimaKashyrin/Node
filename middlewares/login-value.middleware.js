const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const { userLogin } = require('../validators');
const { errorMessage:{ badRequest, wrongEorP } } = require('../errors');

module.exports = {
  checkUserValuesValid: (req, res, next) => {
    try {
      const { error, value } = userLogin.checkLoginFields.validate(req.body);
      
      if (error) {
        next({
          message: error.details[0].message,
          status: badRequest[1]
        });
        return;
      }
      
      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  },
  
  checkUserEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await User.findOne({ email });
      
      if (!userByEmail) {
        next({
          message: wrongEorP[0],
          status: wrongEorP[1]
        });
        return;
      }
      
      req.user = userByEmail;
      next();
    } catch (err) {
      next(err);
    }
  },
  
  checkUserPassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { password: hashPassword } = req.user;
      
      await passwordService.compare(password, hashPassword);
      next();
    } catch (err) {
      next(err);
    }
  }
};
