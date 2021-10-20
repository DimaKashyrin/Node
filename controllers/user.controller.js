const { User, O_Auth } = require('../dataBase');
const { passwordService, emailService } = require('../service');
const normalizer = require('../util/user.util');
const { emailAction: { WELCOME, CHANGE_NAME } }= require("../configs");
const { errorMessage: { created, noContent } } = require('../errors');

module.exports = {
  getUsers: async (req, res) => {
    const usersDB = await User.find().lean();
    const usersPrepare = [];

    if (usersDB.length) {
      usersDB.forEach((user) => {
        usersPrepare.push(normalizer.userNormalizer(user));
      });
      
      res.json(usersPrepare);
    }
  },
  
  getUserById: (req, res) => {
    const user = req.user;
    
    res.json({ user });
  },
  
  createUser: async (req, res, next) => {
    try {
      const { password, name } = req.body;
      const hashedPassword = await passwordService.hash(password);
      
      await emailService.sendMail(req.body.email, WELCOME, { name });
      
      const newUser = await User.create({ ...req.body, password: hashedPassword });
      const normalizerUser = normalizer.userNormalizer(newUser.toObject());
      
      res.status(created.status).json(normalizerUser);
    } catch (err) {
      next(err);
    }
  },
  
  updateUserName: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { name } = req.body;
      
      const updateUser = await User.findByIdAndUpdate(
        user_id,
        req.body,
        { new: true }
      ).lean();
      
      const normaliserUpdateUser = normalizer.userNormalizer(updateUser);
  
      await emailService.sendMail(req.user.email, CHANGE_NAME,{ name });
      
      res.status(created.status).json(normaliserUpdateUser);
    } catch (err) {
      next(err);
    }
  },
  
  delUser: async (req, res, next) => {
    try {
      const { _id } = req.user;
      
      await User.deleteOne({ _id });
      await O_Auth.deleteMany({ user_id: _id });
      
      res.sendStatus(noContent.status);
    } catch (err) {
      next(err);
    }
  },
};
