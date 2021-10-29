const { User, O_Auth } = require('../dataBase');
const {
  emailService,
  s3Service,
  userService
} = require('../service');
const normalizer = require('../util/user.util');
const { emailAction: { CHANGE_NAME, WELCOME } }= require('../configs');
const { errorMessage: { created, noContent } } = require('../errors');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers(req.query).lean();
      
      const usersPrepare = [];
      
      if (users.length) {
        users.forEach((user) => {
          usersPrepare.push(normalizer.userNormalizer(user));
        });
      }
      
      res.json(usersPrepare);
    }catch (err) {
      next(err);
    }
  },
  
  getUserById: (req, res) => {
    const user = req.user;
    
    res.json({ user });
  },
  
  createUser: async (req, res, next) => {
    try {
      const { name } = req.body;
      
      await emailService.sendMail(req.body.email, WELCOME, { name });
      
      let newUser = await User.createUserWithHashPassword({ ...req.body });
      
      if (req.files && req.files.avatar) {
        const uploadInfo = await s3Service.uploadImage(req.files.avatar, 'users', newUser._id.toString());
        newUser = await User.findByIdAndUpdate(newUser._id, { avatar: uploadInfo.Location }, {new: true} );
      }
      
      res.json(newUser);
    } catch (err) {
      next(err);
    }
  },
  
  updateUserName: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { name } = req.body;
      
      await User.findByIdAndUpdate(
        user_id,
        req.body
      );
      
      await emailService.sendMail(req.user.email, CHANGE_NAME,{ name });
      
      res.sendStatus(created.status);
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
