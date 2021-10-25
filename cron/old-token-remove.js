const dayJs = require('dayjs');
const utc =require('dayjs/plugin/utc');

dayJs.extend(utc);

const { O_Auth } = require('../dataBase');

module.exports = async () => {
  const previousWeek = dayJs.utc().subtract(7, 'day');
  
  await O_Auth.deleteMany({
    createdAt:{$lt: previousWeek},
  });
};
