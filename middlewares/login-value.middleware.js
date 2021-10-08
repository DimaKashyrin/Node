const User = require('../dataBase/User');

module.exports = {
  checkUserLoginValue: async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const userByEmail = await User.findOne({email, password});
      
      if (!userByEmail) {
        throw new Error('wrong email or password!');
      }
      
      req.user = userByEmail;
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
