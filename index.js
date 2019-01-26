var Word = require('./word.js');
var inquirer = require('inquirer');
var colors = require('colors');

// randomly select word
var possibleWordsArr = [
    'Abyssinian', 'Aegean', 'American Bobtail', 'American Curl', 'American Polydactyl',
    'American Shorthair', 'American Wirehair', 'ArabianMau', 'Australian Mist', 'Balinese',
    'Bambino', 'Bengal', 'Birman', 'Burmese', 'Exotic Shorthair',
    'Maine Coon', 'Munchkin', 'Scottish Fold', 'Siamese', 'Sphynx'
];
var RNG = Math.floor(Math.random() * possibleWordsArr.length);
// instantiate the chosen word from the word constructor
var chosenWord = new Word(possibleWordsArr[RNG]);
// array to store previous guesses
var prevGuessesArr = [];
// create lives variable
var lives = 13;

console.log('\nGuess the correct cat breed!'.magenta);

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
                // displayWord();

                // push guess to prevGuessesArr and display it on screen
                prevGuessesArr.push(answers.guess.toLowerCase());
                // console.log(`Previous guesses: ${prevGuessesArr.join(', ')}\n`);

                // if the guess was correct
                if (checkGuess(answers.guess.toLowerCase())) {
                    // if user wins
                    if (testWinCondition()) {
                        console.log('\n\n======================================'.magenta);
                        console.log('\nCORRECT!!!'.green);
                        displayWord();
                        console.log(`Previous guesses: ${prevGuessesArr.join(', ')}\n`.cyan);
                        resetGame('win');

                        // makes non-final correct guess
                    } else {
                        console.log('\n\n======================================'.magenta);
                        console.log('\nCORRECT!!!'.green);
                        displayWord();
                        console.log(`Previous guesses: ${prevGuessesArr.join(', ')}\n`.cyan);
                        // initiate recursion
                        guessLetter("Guess a letter!");
                    }

                    // if the guess was incorrect
                } else {
                    console.log('\n\n======================================'.magenta);
                    console.log('\nINCORRECT!!!'.red);
                    console.log(`\n${lives} guesses remaining!`.yellow);
                    // update lives
                    lives--;
                    // if user still has more lives
                    if (lives > 0) {
                        displayWord();
                        console.log(`Previous guesses: ${prevGuessesArr.join(', ')}\n`.cyan);
                        guessLetter("Guess a letter!");

                        // if user loses
                    } else {
                        console.log('\n\n======================================'.magenta);
                        console.log('\nINCORRECT!!!'.green);
                        displayWord();
                        resetGame('lose');
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

function resetGame(outcome) {
    possibleWordsArr.splice(RNG, 1);
    if (possibleWordsArr.length === 0) {
        possibleWordsArr = [
            'Abyssinian', 'Aegean', 'American Bobtail', 'American Curl', 'American Polydactyl',
            'American Shorthair', 'American Wirehair', 'ArabianMau', 'Australian Mist', 'Balinese',
            'Bambino', 'Bengal', 'Birman', 'Burmese', 'Exotic Shorthair',
            'Maine Coon', 'Munchkin', 'Scottish Fold', 'Siamese', 'Sphynx'
        ];
    }
    RNG = Math.floor(Math.random() * possibleWordsArr.length);
    chosenWord = new Word(possibleWordsArr[RNG]);
    prevGuessesArr = [];
    lives = 8;
    console.log('\n\n======================================\n'.magenta);
    if (outcome === 'win') {
        console.log(`You ${outcome}! Next word.`.rainbow);
    } else {
        console.log(`You ${outcome}! Next word.`.red);
    }
    displayWord();
    guessLetter("Guess a letter!");
}

// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses