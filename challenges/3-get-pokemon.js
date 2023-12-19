const axios = require("axios");
const inquirer = require("inquirer");

const promptYN = {
  type: "list",
  message: "Do you want to search for a new Pokemon?",
  choices: ["yes", "no"],
  name: "yn",
};
function wrapper() {
  inquirer.prompt(promptYN).then((answer) => {
    if (answer.yn === "yes") {
      getPokemon();
    }
  });
}
function getPokemon() {
  axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
    for (el of response.data.results) console.log(el.name);
    return wrapper();
  });
}
wrapper();
