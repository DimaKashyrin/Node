const { WELCOME, ORDER } = require('../configs/email-action.enum');

module.exports = {
  [ WELCOME ]: {
    templateName: 'welcome',
    subject: 'Welcome to home )'
  },
  [ ORDER ]: {
    templateName: 'order-confirm',
    subject: 'your order confirmed'
  },
};
