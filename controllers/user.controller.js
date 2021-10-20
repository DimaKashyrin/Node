const { User } = require('../dataBase');
const { passwordService, emailService } = require('../service');
const normalizer = require('../util/user.util');
const { errorMessage: { bdEmpty } } = require('../errors');
const { emailAction: { WELCOME, CHANGE_NAME } }= require("../configs");

module.exports = {
  getUsers: (req, res, next) => {
    try {
      res.json(req.users || bdEmpty);
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
      const { password, name } = req.body;
      const hashedPassword = await passwordService.hash(password);
      
      await emailService.sendMail(req.body.email, WELCOME, { name });
      
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
      const { name } = req.body;
      
      const updateUser = await User.findByIdAndUpdate(
        user_id,
        req.body,
        { new: true }
      ).lean();
      
      const normaliserUpdateUser = normalizer.userNormalizer(updateUser);
  
      await emailService.sendMail(req.user.email, CHANGE_NAME,{ name });
      
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
  },
};
