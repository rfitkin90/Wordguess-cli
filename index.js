var Word = require('./word.js');
var inquirer = require('inquirer');
var colors = require('colors');

// randomly select word
var possibleWordsArr = ['Dark Red', 'Light Orange', 'Neon Blue', 'Light Green'];
var RNG = Math.floor(Math.random() * possibleWordsArr.length);
// instantiate the chosen word from the word constructor
var chosenWord = new Word(possibleWordsArr[RNG]);
// array to store previous guesses
var prevGuessesArr = [];
// create lives variable
var lives = 8;



// display the chosen word on screen
displayWord();

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
                // check letter objects and turn them to true if they match guessed letter
                chosenWord.checkLetters(answers.guess);

                // display the word on screen with underscores/letters
                displayWord();

                // push guess to prevGuessesArr and display it on screen
                prevGuessesArr.push(answers.guess.toLowerCase());
                console.log(`Previous guesses: ${prevGuessesArr.join(', ')}\n`);

                // if the guess was correct
                if (checkGuess(answers.guess.toLowerCase())) {
                    // if user wins
                    if (testWinCondition()) {
                        console.log('CORRECT!!!\n'.green);

                        // makes non-final correct guess
                    } else {
                        console.log('CORRECT!!!\n'.green);
                        // initiate recursion
                        guessLetter("Guess a letter!");
                    }

                    // if the guess was incorrect
                } else {
                    console.log('INCORRECT!!!\n'.red);
                    // update lives
                    lives--;
                    // if user still has more lives
                    if (lives > 0) {
                        

                        // if user loses
                    } else {

                    }
                }

            }

        });
    ;
};

function displayWord() {
    var wordDisplayArr = [];
    for (var i = 0; i < chosenWord.chosenWordArr.length; i++) {
        wordDisplayArr.push(chosenWord.chosenWordArr[i].chrDisplay());
    }
    var wordDisplay = wordDisplayArr.join(' ');
    console.log(`\n${wordDisplay}\n`);
}

function checkGuess(guess) {
    for (var i = 0; i < chosenWord.chosenWordArr.length; i++) {
        if (guess === chosenWord.chosenWordArr[i].chr.toLowerCase()) return true;
    }
    return false;
}

// console.log(testWinCondition());
function testWinCondition() {
    for (var i = 0; i < chosenWord.chosenWordArr.length; i++) {
        if (!chosenWord.chosenWordArr[i].guessed) return false;
    }
    return true;
}

// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses