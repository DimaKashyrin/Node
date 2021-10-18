const { User } = require('../dataBase');
const { userValidator } = require('../validators');
const { errorMessage:{ badRequest: { status }, alreadyExist } } = require('../errors');

module.exports = {
  isUserBodyValid: (req, res, next) => {
    try {
      const { error, value } = userValidator.createUserValidator.validate(req.body);
      
      if (error) {
        next({
          message: error.details[0].message,
          status
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
        next(alreadyExist);
      }
      
      next();
    } catch (err) {
      next(err);
    }
  }
};
