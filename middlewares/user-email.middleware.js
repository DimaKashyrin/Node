const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

module.exports = {
  
  isUserBodyValid: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);
      
      if (error) {
        throw new Error(error.details[0].message);
      }
      
      req.body = value;
      next();
    } catch (err) {
      res.json(err.message);
    }
  },
  
  createUserEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await User.findOne({ email });
      
      if (userByEmail) {
        throw new Error('Email already exist');
      }
      
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
