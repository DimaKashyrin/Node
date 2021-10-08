const User = require('../dataBase/User');

module.exports = {
  createUserEmail: async (req,res,next) => {
    try {
      const userByEmail = await User.findOne({email: req.body.email});
      if(userByEmail){
        throw new Error('Email already exist');
      }
      next();
    }catch (err){
      res.json(err.message);
    }
  }
};
