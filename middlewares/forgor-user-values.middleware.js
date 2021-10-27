const { checkForgotEmail, checkForgotPassword } = require('../validators');
const { errorMessage:{ badRequest: { status } } } = require('../errors');

module.exports = {
  isValidForgotEmail: (req, res, next) => {
    try {
      const { error, value } = checkForgotEmail.isValidForgotEmail.validate(req.body);
      
      if (error) {
        next({
          message: error.details[0].message,
          status
        });
        return;
      }
      
      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  },
  
  isValidForgotPassword: (req, res, next) => {
    try {
      const {error, value} = checkForgotPassword.isValidForgotPassword.validate(req.body);
      
      if (error) {
        next({
          message: error.details[0].message,
          status
        });
        return;
      }
      
      req.newPassword = value;
      next();
    } catch (err) {
      next(err);
    }
  }
};
