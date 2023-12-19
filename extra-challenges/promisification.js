const fs = require('fs');
const path = require('path');

// do not alter this function
function readSecretFile(cb) {
  const filePath = path.join(__dirname, '../challenges/secret-message.txt');
  fs.readFile(filePath, 'utf8', cb);
}

function promisifiedReadSecretFile() {
  // your code here
  const promise = new Promise((resolve, reject)=>{
    readSecretFile((err, result)=>{
      if(err){
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;

}

module.exports = { readSecretFile, promisifiedReadSecretFile };
