const path =require('path');
const fs = require('fs');
const boysPath = path.join(__dirname,'boys');
const girlsPath = path.join(__dirname,'girls');

const getSort = (usersPathFirst,gender,usersPathSecond) => {
  fs.readdir(usersPathFirst,((err,data) => {
    if(err){
      console.log(err);
      return;
    }
    data.forEach(fileName => {
      fs.readFile(path.join(usersPathFirst,fileName),((err,data) => {
        if(JSON.parse(data).gender !== gender){
          fs.rename(
            path.join(usersPathFirst,fileName),
            path.join(usersPathSecond,fileName),
            (err) => console.log(err)
          )
        }
      }))
    })
  }))
}

getSort(boysPath, 'male', girlsPath);
getSort(girlsPath, 'female', boysPath);