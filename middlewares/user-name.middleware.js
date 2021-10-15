const { userName } = require('../validators');
const { errorMessage: { badRequest } } = require('../errors');

module.exports = {
  checkUserName: (req, res, next) => {
    try {
      const { error, value } = userName.checkUserName.validate(req.body);
      
      if (error) {
        next({
          message:error.details[0].message,
          status: badRequest[1]
        });
      }
      
      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  }
};
