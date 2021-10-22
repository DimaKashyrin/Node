const jwt = require('jsonwebtoken');

const {
  config: {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACTION_SECRET
  },
  tokenType: { ACCESS, REFRESH, FORGOT_PASSWORD },
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
  verifyToken: async (token, tokenType) => {
    try {
      let secret = '';
      
      switch (tokenType) {
        case ACCESS: {
          secret = JWT_ACCESS_SECRET;
          break;
        }
        case REFRESH: {
          secret = JWT_REFRESH_SECRET;
          break;
        }
        case FORGOT_PASSWORD: {
          secret = JWT_ACTION_SECRET;
          break;
        }
        default:
          throw new ErrorHandler(wrongTT);
      }
      
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

