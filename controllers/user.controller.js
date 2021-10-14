const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const normalizer = require('../util/user.util');

module.exports = {
  
  getUsers: (req, res, next) => {
    try {
      res.json(req.users || 'db is empty');
    } catch (err) {
      next(err);
    }
  },
  
  getUserById: (req, res) => {
    const user = req.user;
    
    res.json({ user });
  },
  
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordService.hash(password);
      const newUser = await User.create({ ...req.body, password: hashedPassword });
      const normalizerUser = normalizer.userNormalizer(newUser.toObject());
      
      res.json(normalizerUser);
    } catch (err) {
      next(err);
    }
  },
  
  updateUserName: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      
      const updateUser = await User.findByIdAndUpdate(
        user_id,
        req.body,
        { new: true }
      ).lean();
      
      const normaliserUpdateUser = normalizer.userNormalizer(updateUser);
      
      res.json(normaliserUpdateUser);
    } catch (err) {
      next(err);
    }
  },
  
  delUser: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const dellUserId = await User.findOneAndDelete({ _id }).lean();
      const normaliserDellUser = normalizer.userNormalizer(dellUserId);
      
      res.json(normaliserDellUser);
    } catch (err) {
      next(err);
    }
  }
};
