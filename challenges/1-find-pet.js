const fs = require("fs");
const fsp = require('fs/promises');
const inquirer=require('inquirer')

// function findPet(petName) {
//   const promise = new Promise((resolve, reject) => {
//     fs.readFile(`data/${petName}.json`, "utf-8", (error, data) => {
//       if (error) {
//         resolve(`soz couldnt find ${petName} :(`);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
//   return promise;
// }
const promptYN={
    type: 'list',
    message : 'Do you want to insert a new pet name?',
    choices: ['yes','no'],
    name: 'yn'
}
const promptName={
    type : 'input',
    message : 'Please insert pet name',
    name: 'petname'
}

function petNameWrapper(){
    inquirer.prompt(promptYN).then((answer)=>{
        if (answer.yn==='yes'){
            inquirer.prompt(promptName).then(answer=>{
                findPet(answer.petname)
            })
        }
        else{return}
    })
}
petNameWrapper()

function findPet(petName){
fsp.readFile(`./data/${petName}.json`, "utf-8")
.then((data)=>{console.log(JSON.parse(data))
    return petNameWrapper(petName)
})
.catch(()=>{console.log(`soz couldnt find ${petName} :(`)
return petNameWrapper(petName)} )
}

module.exports = findPet;
