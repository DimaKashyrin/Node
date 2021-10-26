module.exports = {
  loginMiddleware: require('./login-value.middleware'),
  userEmailMiddleware: require('./user-email.middleware'),
  userIdMiddleware: require('./user-id.middleware'),
  userNameMiddleware: require('./user-name.middleware'),
  userRolesMiddleware: require('./user-role.middleware'),
  userTokenMiddleware: require('./user-token.middleware'),
  forgotValuesMiddleware: require('./forgot-user-value.middleware')
};
