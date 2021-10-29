module.exports = {
  PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
  EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
  DEFAULT_STATUS: 500,
  AUTHORIZATION:'Authorization',
  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/webp'
  ]
};

