const bcrypt = require('bcrypt');

const {
  errorHandler,
  errorMessage:{
    wrongEorP: {
      message,
      status
    }
  }
} = require('../errors');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (password, hashPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashPassword);
    
    if (!isPasswordMatched) {
      throw new errorHandler(message,status);
    }
  }
};
