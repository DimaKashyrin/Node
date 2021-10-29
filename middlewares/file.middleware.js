const {
  constants: { PHOTOS_MIMETYPES } ,
  config: { MAX_AVATAR_SIZE }
} = require('../configs');
const {
  ErrorHandler,
  errorMessage: {
    notSF,
    maxSizePhoto,
    badRequest: { status }
  }
} = require('../errors');

module.exports = {
  checkUserAvatar: (req, res, next) => {
    try {
      if (!req.file || !req.files.avatar) {
        next();
        return;
      }
      
      const { name, size, mimetype } = req.files.avatar;
      
      if(!PHOTOS_MIMETYPES.includes(mimetype)) {
        throw new ErrorHandler(notSF, status);
      }
      
      if (size > MAX_AVATAR_SIZE) {
        throw new ErrorHandler(`${ name }${ maxSizePhoto }`, status);
      }
      
      next();
    }catch (err) {
      next(err);
    }
    
  }
};
