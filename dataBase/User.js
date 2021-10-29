const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user-roles.enum');
const passwordService = require('../service/password.service');

const loginUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: userRoles.USER,
    enum: Object.values(userRoles)
  },
  avatar: {
    type: String
  },
  
}, {timestamps: true});

loginUserSchema.statics = {
  async createUserWithHashPassword(userObject) {
    const hashedPassword = await passwordService.hash(userObject.password);
    return this.create({ ...userObject, password: hashedPassword });
  }
};

module.exports = model('user', loginUserSchema);
