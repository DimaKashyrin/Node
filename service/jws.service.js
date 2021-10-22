const jwt = require('jsonwebtoken');

const {
  config: {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACTION_SECRET
  },
  tokenType: { ACCESS },
  actionTokenType: { FORGOT_PASSWORD }
} = require('../configs');
const {
  ErrorHandler,
  errorMessage: { wrongTT, unauthorized }
} = require('../errors');

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({},JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign({},JWT_REFRESH_SECRET,{ expiresIn: '30d' });
    
    return {
      access_token,
      refresh_token
    };
  },
  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
      
      await jwt.verify(token, secret);
    } catch (err) {
      throw new ErrorHandler(unauthorized);
    }
  },
  generateActionToken: (actionTokType) => {
    if (actionTokType !== FORGOT_PASSWORD) {
      throw new ErrorHandler(wrongTT);
    }
  
    return jwt.sign({}, JWT_ACTION_SECRET, {expiresIn: '24h'});
  }
};

