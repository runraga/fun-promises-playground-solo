const inquirer = require('inquirer')
const fsp = require("fs/promises");
const question={type: "input",
message : 'What VIP name do you want to remove?',
name : "name"}
const readFile=fsp.readFile('/Users/nicolo/northcoders/third-week/fun-promises-playground/challenges/vip-list.txt','utf-8')
const inquirerQ=inquirer.prompt(question)
const promisesArray=[readFile,inquirerQ]
Promise.all(promisesArray)
.then((answers)=>{const VIPremoved=answers[1].name
    if(answers[0].includes(VIPremoved)){
        fsp.writeFile('challenges/new-vip-list.txt', answers[0].replace(VIPremoved,''))
    }
    else{
        console.log(`${VIPremoved} is not in the list!`)
    }
}
)
.catch((err)=>{console.log(err)})