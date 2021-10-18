const { accessDenied } = require('../errors/errorMessages');

module.exports = {
  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if(!roleArr.includes(role)) {
        next(accessDenied);
      }
      
      next();
    }catch (err) {
      next(err);
    }
  }
};
