const cron = require('cron');

const removeOldTokens = require('./old-token-remove');


module.exports = () => {
  cron.schedule('******',() => {
    removeOldTokens();
  });
};
