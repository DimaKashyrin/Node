const { User } = require('../dataBase');

module.exports = {
  getAllUsers: (query={}) => {
    const {
      perPage = 20,
      page = 1,
      sortBy = 'createdAt',
      order = 'asc',
      ...filters
    } = query;
    const findObject = {};
    const ageFilter = {};
    const orderBy = order === 'asc' ? -1 : 1 ;
    
    Object.keys(filters).forEach((param => {
      switch (param) {
        case 'name':
          findObject.name = { $regex: `^${ filters.name }`, $options: 'i' };
          break;
        case 'email':
          findObject.email = { $regex: `^${ filters.email }`, $options: 'i' };
          break;
        case 'role':
          const rolesArr = filters.role.split(';');
          findObject.role = { $in: rolesArr };
          break;
        case 'age.gte':
          Object.assign(ageFilter,{$gte: +filters['age.gte'] });
          break;
        case 'age.lte':
          Object.assign(ageFilter,{$lte: +filters['age.lte'] });
          break;
      }
    }));
    
    if (Object.keys(ageFilter).length) {
      findObject.age = ageFilter;
    }
    
    return User
      .find(findObject)
      .sort({ [sortBy]: orderBy })
      .limit(+perPage)
      .skip((page - 1) * perPage );
  }
};
