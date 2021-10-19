const { accessDenied } = require('../errors/errorMessages');

module.exports = {
  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if(!roleArr.includes(role)) {
        next(accessDenied);
        return;
      }
      
      next();
    }catch (err) {
      next(err);
    }
  }
};
