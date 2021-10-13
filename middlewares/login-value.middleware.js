const User = require('../dataBase/User');
const passwordService = require("../service/password.service");
const userValidator = require("../validators/user-login.validator");

module.exports = {
  
  checkUserValuesValid: (req, res, next) => {
    try {
      const { error, value } = userValidator.checkLoginFields.validate(req.body);
      
      if (error) {
        throw new Error('wrong email or password!');
      }
      
      req.body = value;
      next();
    } catch (err) {
      res.json(err.message);
    }
  },
  
  checkUserEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await User.findOne({ email });
      
      if (!userByEmail) {
        throw new Error('wrong email or password!');
      }
      
      req.user = userByEmail;
      next();
    } catch (err) {
      res.json(err.message);
    }
  },
  
  checkUserPassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { password: hashPassword } = req.user;
      
      await passwordService.compare(password, hashPassword);
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
