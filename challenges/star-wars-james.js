const inquirer = require("inquirer");
const axios = require("axios");

const promptPCS = {
  type: "list",
  message: "Which of the following things do you want to know more about?",
  choices: ["planets", "characters", "starships"],
  name: "PCS",
};

function selectMovie() {
  return axios.get("https://swapi.dev/api/films").then((results) => {
    const arrayofTitles = results.data.results.map((element) => element.title);
    const promptSelectMovie = {
      type: "list",
      message: "Please select a movie",
      choices: arrayofTitles,
      name: "title",
    };
    return Promise.all([inquirer.prompt(promptSelectMovie), results]);
  });
}

function selectItems(filmsData, filmTitle) {
  for (element of filmsData) {
    if (element.title === filmTitle) {
      const movieSelected = element;
      console.log(
        movieSelected.title,
        `, episode: ${movieSelected.episode_id}, released on`,
        movieSelected.release_date
      );
      return Promise.all([inquirer.prompt(promptPCS), filmTitle, filmsData]);
    }
  }
}
function getItemsFromMovie(items, selectedFilmData) {
  const itemLinks = [];
  for (ele of selectedFilmData[items]) {
    itemLinks.push(axios.get(ele));
  }
  itemLinks.unshift(items);
  return Promise.all(itemLinks);
}
function chooseItemForMoreInfo(itemsData, itemType) {
  //   console.log(itemsData);
  const promptSelectItem = {
    type: "list",
    message: `Please select the ${itemType} you want to know more about`,
    choices: itemsData.map((ele) => ele.data.name),
    name: "itemRequested",
  };
  return Promise.all([inquirer.prompt(promptSelectItem), itemsData]);
}
// .then((results) => {
//   // console.log(results[1][results[0].PCS][0])
//   const newArr = [];
//   for (el of results[1][results[0].PCS]) {
//     newArr.push(axios.get(el));
//   }
//   return Promise.all(newArr);
//   // return Promise.all(results[1][results[0].PCS].map(el =>axios.get(el)))
// })
// .then((results) => {
//   const promptSelectItem = {
//     type: "list",
//     message: "Please select the item you want to know more about",
//     choices: results,
//     name: "itemRequested",
//   };
//   return inquirer.prompt(promptSelectItem);
// });
// .catch((err) => {
//   console.log("error");
// });

selectMovie()
  .then((result) => {
    const filmsData = result[1].data.results;
    return selectItems(filmsData, result[0].title);
  })
  .then((itemAndInfo) => {
    //get title for each item and make inquirer list
    const allFilmsData = itemAndInfo[2];
    const selectedFilmData = allFilmsData.filter(
      (ele) => ele.title === itemAndInfo[1]
    )[0];
    return getItemsFromMovie(itemAndInfo[0].PCS, selectedFilmData);
  })
  .then((items) => {
    //inquirer to choose item for more info
    const itemType = items.shift();
    // items.forEach((ele) => console.log(ele.data));
    return chooseItemForMoreInfo(items, itemType);
  })
  .then((itemSelected) => {
    const itemToElaborate = itemSelected[0].itemRequested;
    console.log(itemSelected[1].filter(ele => ele.data.name === itemToElaborate));
    // console.log(itemSelected[1].data, "<=====info");
  })
  .catch((err) => {
    console.log("error occurred");
    console.log(err);
  });
