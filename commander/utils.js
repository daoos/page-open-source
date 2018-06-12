
const fs  = require('fs');

function writeFileSync(filePath,data) {
  return new Promise(function(resolve,reject){
    fs.writeFile(filePath, data, function(err){
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
function isExistSync (filePath) {
  return new Promise(function(resolve,reject){
    fs.access(filePath, fs.constants.F_OK, function(err){
      if (err) {
        // NOT EXIST
        resolve('file is not exist')
      } else {
        reject('文件已存在: ' + filePath)
      }
    })
  })
}

module.exports = {
  isExistSync, writeFileSync
}