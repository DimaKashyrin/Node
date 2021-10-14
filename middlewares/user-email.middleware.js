const User = require('../dataBase/User');
const { userValidator } = require('../validators');

module.exports = {
  
  isUserBodyValid: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);
      
      if (error) {
        next({
          message: error.details[0].message,
          status: 404
        });
      }
      
      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  },
  
  createUserEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await User.findOne({ email });
      
      if (userByEmail) {
        next({
          message: 'Email already exist',
          status: 406
        });
      }
      
      next();
    } catch (err) {
      next(err);
    }
  }
};
