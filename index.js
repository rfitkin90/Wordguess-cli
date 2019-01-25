var Word = require('./word.js');
var inquirer = require('inquirer');

// randomly select word
var possibleWordsArr = ['Red', 'Orange', 'Blue', 'Light Green'];
var RNG = Math.floor(Math.random() * possibleWordsArr.length);
// console.log(possibleWordsArr[RNG]);

// instantiate the chosen word from the word constructor
var chosenWord = new Word(possibleWordsArr[RNG]);
console.log(chosenWord);

// display the chosen word on screen
var wordDisplayArr = [];
for (var i = 0; i < chosenWord.chosenWordArr.length; i++) {
    wordDisplayArr.push(chosenWord.chosenWordArr[i].chrDisplay());
}
var wordDisplay = wordDisplayArr.join(' ');
console.log(wordDisplay);

// array to store previous guesses
var prevGuessesArr = [];


// recursive guess letter function
guessLetter("Guess a letter!");
function guessLetter(displayMessage) {
    inquirer
        .prompt([
            {
                type: "input",
                message: displayMessage,
                name: "guess"
            }
        ])
        .then(answers => {
            // if user chooses a non-letter
            if (!'abcdefghijklmnopqrstuvwxyz'.split('').includes(answers.guess.toLowerCase())) {
                guessLetter('Invalid input. Please pick a letter.');

                // if user repeats a guess
            } else if (prevGuessesArr.includes(answers.guess)) {
                guessLetter('Letter already guessed. Please pick another one.')

                // if user makes a legitimate guess
            } else {
                chosenWord.checkLetters();
                var wordDisplayArr = [];
                for (var i = 0; i < chosenWord.chosenWordArr.length; i++) {
                    wordDisplayArr.push(chosenWord.chosenWordArr[i].chrDisplay());
                }
                var wordDisplay = wordDisplayArr.join(' ');
                console.log(wordDisplay);
                prevGuessesArr.push(answers.guess.toLowerCase());
                console.log(`Previous guesses: ${prevGuessesArr.join(', ')}`);
                guessLetter("Guess a letter!");
            }

        });
    ;
}
// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses