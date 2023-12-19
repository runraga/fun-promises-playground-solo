const inquirer = require("inquirer");
const axios = require("axios");

const promptPCS={
    type: "list",
    message: "Which of the following things do you want to know more about?",
    choices: ['planets','characters','starships'],
    name: 'PCS'
}

function selectMovie(){
    axios.get('https://swapi.dev/api/films').then(results=>{
    const arrayofTitles=results.data.results.map(element => element.title)
    const promptSelectMovie={
        type: "list",
        message: "Please select a movie",
        choices: arrayofTitles,
        name: 'title'
    }
    return Promise.all([inquirer.prompt(promptSelectMovie),results])
})
.then(result=>{
    const filmsData=result[1].data.results
    for(element of filmsData){
        if(element.title===result[0].title){
            const movieSelected=element
            console.log(movieSelected.title, `, episode: ${movieSelected.episode_id}, released on`, movieSelected.release_date)
            return Promise.all([inquirer.prompt(promptPCS),movieSelected,filmsData])
        }
    }
    })
.then(results=>{
    // console.log(results[1][results[0].PCS][0])
    const newArr=[]
    for (el of results[1][results[0].PCS]){
        newArr.push(axios.get(el))
    }
    return Promise.all(newArr)
    // return Promise.all(results[1][results[0].PCS].map(el =>axios.get(el)))
})
.then(results =>{
    const promptSelectItem={
        type: "list",
        message: "Please select the item you want to know more about",
        choices: results,
        name: 'itemRequested'
    }
    return inquirer.prompt(promptSelectItem)
})
.catch((err)=>{console.log('error')})
}
selectMovie()