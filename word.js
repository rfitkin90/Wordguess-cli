var Letter = require('./letter.js');

function Word(word) {
    this.chosenWord = [];
    word.split('').forEach(function(chr) {
        this.chosenWord.push(new Letter(chr))
    });
}
Word.prototype.wordString = function () {
    this.chosenWord.forEach(elem => {
        elem.chrDisplay();
    });
};
Word.prototype.wordString = function (chr) {
    chr.inWord();
};

module.exports = Word;

var hamburger = 'Hamburger';
var newBurg = new Word(hamburger);
console.log(newBurg);


// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 
// That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call the function on 
//   each letter object (the first function defined in `Letter.js`) that displays the character 
//   or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess function on 
//   each letter object (the second function defined in `Letter.js`)