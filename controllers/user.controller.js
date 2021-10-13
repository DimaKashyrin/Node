const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const normalizer = require('../util/user.util');

module.exports = {
  
  getUsers: (req, res) => {
    try {
      res.json(req.users);
    } catch (err) {
      res.json(err.message);
    }
  },
  
  getUserById: (req, res) => {
    const user = req.user;
    
    res.json({ user });
  },
  
  createUser: async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordService.hash(password);
      const newUser = await User.create({...req.body, password: hashedPassword});
      const normalizerUser = normalizer.userNormalizer(newUser);
      
      res.json(normalizerUser);
    } catch (err) {
      res.json(err.message);
    }
  },
  
  updateUserName: (req, res) => {
    try {
      const { name: newName } = req.body;
      const updateUser = { ...req.user, name: newName };
      
      res.json(updateUser);
    } catch (err) {
      res.json(err.message);
    }
  },
  
  delUser: async (req, res) => {
    try {
      const { _id } = req.user;
      const dellUserId = await User.findOneAndDelete({ _id }).lean();
      const normaliserDellUser = normalizer.userNormalizer(dellUserId);
      
      res.json(normaliserDellUser);
    } catch (err) {
      res.json(err.message);
    }
  }
};
