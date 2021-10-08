const User = require('../dataBase/User');

module.exports = {
  checkUserLoginValue: async (req, res, next) => {
    try {
      const userByEmail = await User.findOne({
        email: req.body.email,
        password:req.body.password}
      );
      
      if(!userByEmail) {
        throw new Error('wrong email or password!');
      }
      next();
    }catch (err){
      res.json(err.message);
    }
  }
};
