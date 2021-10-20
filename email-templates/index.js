const {
  WELCOME,
  CHANGE_NAME,
  LOGIN,
  DELETE_ACCOUNT
} = require('../configs/email-action.enum');

module.exports = {
  [ WELCOME ]: {
    templateName: 'welcome',
    subject: 'Welcome  )'
  },
  [ CHANGE_NAME ]: {
    templateName: 'change-name',
    subject: 'Your name has been changed'
  },
  [ LOGIN ]: {
    templateName: 'login',
    subject: 'You are logged in'
  },
  [ DELETE_ACCOUNT ]: {
    templateName: 'delete-account',
    subject: 'Delete account'
  },
};
