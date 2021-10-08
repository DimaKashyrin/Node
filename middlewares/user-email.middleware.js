const User = require('../dataBase/User');

module.exports = {
  createUserEmail: async (req, res, next) => {
    try {
      const {email} = req.body;
      const userByEmail = await User.findOne({email});
      
      if (userByEmail) {
        throw new Error('Email already exist');
      }
      
      next();
    } catch (err) {
      res.json(err.message);
    }
  }
};
