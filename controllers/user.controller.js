const User = require('../dataBase/User');

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },
  getUserById: (req, res) => {
    const user = req.user;
    res.json({user});
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
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
