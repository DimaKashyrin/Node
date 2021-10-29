module.exports = {
  NODE_ENV:process.env.NODE_ENV || 'dev',
  
  MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/hw_3',
  PORT: process.env.PORT || 5000,
  
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "def access",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "def refresh",
  JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || "def action",
  
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
  
  FORGOT_PASSWORD_URL: 'http://localhost:3000/',
  
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000/',
  
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD,
  
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  
  MAX_AVATAR_SIZE: 5 * 1024 * 1024
  
};
