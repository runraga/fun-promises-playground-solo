const inquirer = require("inquirer");
const axios = require("axios");
const fsp = require("fs/promises");

const promptPCS = {
  type: "list",
  message: "Which of the following things do you want to know more about?",
  choices: ["planets", "characters", "starships"],
  name: "PCS",
};

async function navigation() {
  let keepLooping = true;
  let placeholder;
  let titleOfMovieSelected;
  let dataOfMovies;
  let dataOfMovieSelected;

  let selectionPCS;
  let selectionPCS2;
  let PCSinfo;
  let listItems;

  let selectedItem;
  let selectedItemName;
  let whereTo = "select film";
  while (keepLooping) {
    //to much film logic in switch statement 
    //need to move this in to functions and
    //keep this purely for navigation
    switch (whereTo) {
      case "select film":
        placeholder = await selectMovie();
        titleOfMovieSelected = placeholder[0].title;
        dataOfMovies = placeholder[1];
        dataOfMovieSelected = dataOfMovies.filter((el) => {
          return el.title === titleOfMovieSelected;
        })[0];
        whereTo = "movie info";
        break;
      case "movie info":
        retrieveMovieInfo();
        whereTo = "select category";
        break;
      case "select category":
        selectionPCS = await selectPCS();
        whereTo = "select item";
        break;
      case "select item":
        selectionPCS2 = selectionPCS.PCS;
        PCSinfo = await retrievePCSinfo();
        listItems = PCSinfo.map((ele) => ele.name);

        selectedItem = await selectItem();
        selectedItemName = selectedItem.itemRequested;

        displayItemInfo();
        whereTo = "continue loop";
        break;
      case "continue loop":
        const shouldContinue = await promptToContinue();
        if (shouldContinue.shouldContinue === "no") {
          keepLooping = false;
        } else {
          const intention = await nextStep();
          const intentionAnswer = intention.nextStep;
          switch (true) {
            case intentionAnswer.startsWith("select another"):
              whereTo = "select item";
              break;
            case intentionAnswer.includes("category"):
              whereTo = "select category";
              break;
            default:
              whereTo = "select film";
          }
        }
        break;
    }
  }
  async function nextStep() {
    const promptSelectItem = {
      type: "list",
      message: "What do you want to do now",
      choices: [
        `select another ${selectionPCS2} from this film`,
        `choose a different category for ${titleOfMovieSelected}`,
        "choose a different film",
      ],
      name: "nextStep",
    };
    return inquirer.prompt(promptSelectItem);
  }

  async function promptToContinue() {
    const promptSelectItem = {
      type: "list",
      message: "Do you want to contiue?",
      choices: ["yes", "no"],
      name: "shouldContinue",
    };
    return inquirer.prompt(promptSelectItem);
  }

  function selectMovie() {
    return axios("https://swapi.dev/api/films").then((results) => {
      const parsedResults = results.data.results;
      const arrayofTitles = parsedResults.map((element) => element.title);
      const promptSelectMovie = {
        type: "list",
        message: "Please select a movie",
        choices: arrayofTitles,
        name: "title",
      };
      return Promise.all([inquirer.prompt(promptSelectMovie), parsedResults]);
    });
  }
  function retrieveMovieInfo() {
    console.log(
      titleOfMovieSelected,
      `, episode: ${dataOfMovieSelected.episode_id}, released on`,
      dataOfMovieSelected.release_date
    );
  }

  async function selectPCS() {
    return inquirer.prompt(promptPCS);
  }
  async function retrievePCSinfo() {
    const newArr = [];
    for (el of dataOfMovieSelected[selectionPCS2]) {
      const data = await axios.get(el);
      newArr.push(data.data);
      if (newArr.length === 2) {
        return Promise.all(newArr);
      }
    }
  }
  async function selectItem() {
    const promptSelectItem = {
      type: "list",
      message: "Please select the item you want to know more about",
      choices: listItems,
      name: "itemRequested",
    };
    return inquirer.prompt(promptSelectItem);
  }
  function displayItemInfo() {
    const selectedItemInfo = PCSinfo.filter(
      (ele) => ele.name === selectedItemName
    )[0];
    console.log(selectedItemInfo);
  }

  //     .then((results) => {
  //       const itemsName = results.map(ele => ele.data.name);
  //       const promptSelectItem = {
  //         type: "list",
  //         message: "Please select the item you want to know more about",
  //         choices: itemsName,
  //         name: "itemRequested",
  //       };
  //       return Promise.all([inquirer.prompt(promptSelectItem),results]);
  //     })
  //     .then((results)=>{
  //         const nameSelected=results[0]
  //         const dataOfNameSelected=(results[1].filter(el =>{
  //             return el.data.name===nameSelected.itemRequested
  //         }))[0].data
  //         console.log('info:', dataOfNameSelected)
  //     }
  //     )
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // }
}
navigation();
