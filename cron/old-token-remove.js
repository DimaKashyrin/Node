const dayJs = require('dayjs');
const utc =require('dayjs/plugin/utc');

dayJs.extend(utc);

const { O_Auth } = require('../dataBase');

module.exports = async () => {
  const previousMonth = dayJs.utc().subtract(1, 'month');
  await O_Auth.deleteMany({
    createdAt:{$lt: previousMonth},
  });
};
