const userValidator = require('../validators/user-name.validator');

module.exports = {
  
  checkUserName: (req, res, next) => {
    try {
      const { error, value } = userValidator.checkUserName.validate(req.body);
      
      if (error) {
        throw new Error(error.details[0].message);
      }
      
      req.body = value;
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
