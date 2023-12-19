const inquirer = require('inquirer')
const question={type: "input",
message : 'What\'s your name',
name : "name"}
const questionYN={
    type:'list',
    message: 'Do you want to insert a new name?',
    choices: ['yes','no'],
    name : 'yn'
}
function sayHello(){
    inquirer.prompt(questionYN).then((answer)=>{
        if (answer.yn==='yes'){
            sayHelloInternal()
        }
        else{return}
    })
}
sayHello()
function sayHelloInternal(){
    inquirer.prompt(question)
.then((answer)=>{console.log(`Hello ${answer.name}!`)
return sayHello()})
}
