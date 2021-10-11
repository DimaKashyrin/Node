const User = require('../dataBase/User');
const passwordService = require('../service/password.service');

module.exports = {
  
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      
      res.json(users);
    } catch (err) {
      res.json(err.message);
    }
  },
  
  getUserById: (req, res) => {
    const user = req.user;
    
    res.json({user});
  },
  
  createUser: async (req, res) => {
    try {
      const {password} = req.body;
      const hashedPassword = await passwordService.hash(password);
      const newUser = await User.create({...req.body, password: hashedPassword});
      
      res.json(newUser);
    } catch (err) {
      res.json(err.message);
    }
  },
  
  delUser: async (req, res) => {
    try {
      const {_id} = req.user;
      const dellUserId = await User.findOneAndDelete({_id});
      
      res.json(dellUserId);
    } catch (err) {
      res.json(err.message);
    }
  },
  
  getLoginUser: (req, res) => {
    try {
      const {name} = req.user;
      
      res.json(`Welcome, ${name}`);
    } catch (err) {
      res.json(err.message);
    }
  }
};
