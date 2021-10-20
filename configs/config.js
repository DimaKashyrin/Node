module.exports = {
  MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/hw_3',
  PORT: process.env.PORT || 5000,
  
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "def access",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "def refresh",
  
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD
};
