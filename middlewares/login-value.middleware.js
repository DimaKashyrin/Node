const User = require('../dataBase/User');
const passwordService = require("../service/password.service");

module.exports = {
  
  checkUserLoginValue: async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const userByEmail = await User.findOne({email});
      
      if (!userByEmail) {
        throw new Error('wrong email or password!');
      }
      
      const checkUserPassword = await passwordService.compare(password, userByEmail.password);
      
      if (!checkUserPassword) {
        throw new Error('wrong email or password!');
      }
      
      req.user = userByEmail;
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
