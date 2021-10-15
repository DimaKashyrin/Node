const bcrypt = require('bcrypt');

const { errorHandler } = require('../errors');
const { errorMessage:{ wrongEorP } } = require('../errors');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (password, hashPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashPassword);
    
    if (!isPasswordMatched) {
      throw new errorHandler(wrongEorP[0], wrongEorP[1]);
    }
  }
};
