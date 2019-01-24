function Letter(chr) {
    this.chr = chr;
    this.guessed = false;
}
Letter.prototype.chrDisplay = function () {
    // display letter as a letter if guess, or an underscore if not guessed
    if (this.chr === ' ') {
        return ' ';
    } else if (this.guessed) {
        return this.chr;
    } else {
        return '_';
    }
};
Letter.prototype.inWord = function (chr) {
    // switch Letter.guessed to true if chr is in chosenWordArr
    this.guessed = chosenWordArr.includes(chr)
    return this.guessed;
};
// var l = new Letter("s");

// console.log(l.chrDisplay());
// l.guessed = true;
// console.log(l)
// console.log(l.chrDisplay());
module.exports = Letter;

// * **Letter.js**: Contains a constructor, Letter. This constructor should be able to either display 
// an underlying character or a blank placeholder (such as an underscore), depending on whether or not the 
// user has guessed the letter. That means the constructor should define:

//   * A string value to store the underlying character for the letter

//   * A boolean value that stores whether that letter has been guessed yet

//   * A function that returns the underlying character if the letter has been guessed, 
//   or a placeholder (like an underscore) if the letter has not been guessed

//   * A function that takes a character as an argument and checks it against the underlying character, 
//   updating the stored boolean value to true if it was guessed correctly