const User = require('../dataBase/User');
const normalizer = require('../util/user.util');

module.exports = {
  
  excludePasswords: async (req, res, next) => {
    try {
      const usersDB = await User.find().lean();
      const usersPrepare = [];
      
      if (usersDB) {
        usersDB.forEach((user) => {
          usersPrepare.push(normalizer.userNormalizer(user));
        });
        
        req.users = usersPrepare;
        next();
      }
    } catch (err) {
      res.json(err.message);
    }
  }
};
