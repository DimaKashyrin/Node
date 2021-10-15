module.exports = {
  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if(!roleArr.includes(role)) {
        next({
          message: 'Access denied!',
          status: 403
        });
      }
      
      next();
    }catch (err) {
      next(err);
    }
  }
};
