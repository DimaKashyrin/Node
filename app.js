const users = [
  {name: 'olga', gender: 'female', age: 21},
  {name: 'anton', gender: 'male', age: 27},
  {name: 'ira', gender: 'female', age: 18},
  {name: 'luba', gender: 'female', age: 29},
  {name: 'oleg', gender: 'male', age: 17},
  {name: 'petr', gender: 'male', age: 32},
  {name: 'lisa', gender: 'female', age: 16},
  {name: 'den', gender: 'male', age: 19}
]
const foldersNameArr = [
  'manOlder20',
  'manYounger20',
  'womanOlder20',
  'womanYounger20'
]

const fs = require('fs');
const path = require('path');

const buildFolders = (nameArr) => {
  nameArr.forEach(folderName => {
    const createPath = path.join(__dirname, folderName)
    
    fs.mkdir(createPath, {recursive: true}, err => {
      if (err) {
        console.log(err);
      }
    })
  })
}

const getSortUsers = (users) => {
  users.forEach(user => {
    const userPrepare = JSON.stringify(user);
    
    if (user.age < 20 && user.gender === 'male') {
      const appendPathUserFile = path.join(__dirname, 'manYounger20', user.name + '.txt');
      
      fs.writeFile(appendPathUserFile, `${userPrepare}`, (err => {
        if (err) {
          console.log(err);
        }
      }))
    } else if (user.age > 20 && user.gender === 'male') {
      const appendPathUserFile = path.join(__dirname, 'manOlder20', user.name + '.txt');
      
      fs.writeFile(appendPathUserFile, `${userPrepare}`, (err => {
        if (err) {
          console.log(err);
        }
      }))
    } else if (user.age < 20 && user.gender === 'female') {
      const appendPathUserFile = path.join(__dirname, 'womanYounger20', user.name + '.txt');
      
      fs.writeFile(appendPathUserFile, `${userPrepare}`, (err => {
        if (err) {
          console.log(err);
        }
      }))
    } else if (user.age > 20 && user.gender === 'female') {
      const appendPathUserFile = path.join(__dirname, 'womanOlder20', user.name + '.txt');
      
      fs.writeFile(appendPathUserFile, `${userPrepare}`, (err => {
        if (err) {
          console.log(err);
        }
      }))
    }
  })
}

buildFolders(foldersNameArr);
getSortUsers(users);

