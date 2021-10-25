const { O_Auth } = require('../dataBase');

module.exports = async () => {
  await O_Auth.deleteMany({
    createdAt:{$gte: ''},
  });
};
