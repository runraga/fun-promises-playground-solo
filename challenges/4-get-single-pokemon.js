const inquirer = require("inquirer");
const axios = require("axios");

const question = { type: "input", message: "Enter pokemon id:", name: "ID" };
inquirer.prompt(question)
.then((answer) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${answer.ID}`);
}).then((result)=>{
    console.log(result.data.name);
}).catch((error)=>{
    console.log("A pokemon does not exist with the given ID");
});
