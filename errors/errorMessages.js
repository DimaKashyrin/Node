module.exports = {
  created: {
    message:'created',
    status: 201,
  },
  noContent: {
    message: 'No Content',
    status: 204
  },
  badRequest: {
    message:'Bad Request!',
    status: 400,
  },
  wrongEorP: {
    message:'Wrong email or password!',
    status: 400,
  },
  unauthorized: {
    message:'Unauthorized',
    status: 401,
  },
  accessDenied: {
    message:'Access denied!',
    status: 403,
  },
  notFound: {
    message:'Not Found',
    status: 404,
  },
  idNotExist: {
    message:'the user with the specified id does not exist',
    status: 404,
  },
  alreadyExist: {
    message:'Email already exist',
    status: 409,
  },
  wrongTT: {
    message: 'Wrong token type',
    status: 500
  },
  templateName: {
    message: 'wrong template name'
  }
};
