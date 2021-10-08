const User = require('../dataBase/User');

module.exports = {
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    }
    catch (err) {
      res.json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const findUser = await User.find({email: req.body.email});
      res.json(`Welcome, ${findUser[0].name}`);
    }
    catch (err) {
      res.json(err);
    }
  }
};
