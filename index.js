var word = require('./word.js');
var inquirer = require('inquirer');

var possibleWordsArr = ['Red', 'Orange', 'Blue', 'Light Green'];
var RNG = Math.floor(Math.random() * possibleWordsArr.length);

var chosenWord = new Word(possibleWordsArr[RNG]);

inquirer
    .prompt([
        {
            type: "input",
            message: "Guess a letter!",
            name: "guess"
        }
    ])
    .then(answers => {


    });
;
// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses