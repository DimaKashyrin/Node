const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove');

module.exports = () => {
  cron.schedule('0 01 1 1-12 *',() => {
    removeOldTokens();
  });
};
