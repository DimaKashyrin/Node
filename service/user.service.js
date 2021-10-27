const { User } = require('../dataBase');

module.exports = {
  getAllUsers: (query={}) => User.find(query)
};
