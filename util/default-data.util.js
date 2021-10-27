const { User } = require('../dataBase');
const {
  userRoles: { ADMIN },
  config: { DEFAULT_ADMIN_PASSWORD }
} = require('../configs');

module.exports = async () => {
  const user = await User.findOne( { role: ADMIN });
  
  if (!user) {
    await User.create({
      name: 'adminDefault',
      email: 'adminDefault@gmail.com',
      password: DEFAULT_ADMIN_PASSWORD,
      role: ADMIN
    });
  }
};
