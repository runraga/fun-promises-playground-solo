const inquirer = require("inquirer");
const fsp = require("fs/promises");
const axios = require("axios");

function getBooks() {
  const question = [
    {
      type: "input",
      message: "Please enter author name",
      name: "name",
    },
    { type: "input", message: "Please enter title of the book", name: "title" },
  ];
  inquirer
    .prompt(question)
    .then((answers) => {
      console.log(answers);
      return axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${answers.title}+inauthor:${answers.name}`
      );
    })
    .then((bookInfo) => {
      console.log(bookInfo.data.items[0].volumeInfo);
      const author = bookInfo.data.items[0].volumeInfo.authors[0];
      const title = bookInfo.data.items[0].volumeInfo.title;
      fsp.writeFile(
        `${author}-${title}.txt`,
        JSON.stringify(bookInfo.data.items[0].volumeInfo)
      );
      return inquirer.prompt(carryOn);
    })
    .then((answer) => {
      if (answer.continue === "yes") {
        getBooks();
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
}
const carryOn = [
  {
    type: "list",
    message: "Do you want to search for another book?",
    name: "continue",
    choices: ["yes", "no"],
  },
];

getBooks();
