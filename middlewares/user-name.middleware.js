const { userName } = require('../validators');

module.exports = {
  
  checkUserName: (req, res, next) => {
    try {
      const { error, value } = userName.checkUserName.validate(req.body);
      
      if (error) {
        next({
          message:error.details[0].message,
          status: 406
        });
      }
      
      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  }
};
