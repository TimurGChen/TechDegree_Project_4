/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
     constructor(phrase) {
         this.phrase = phrase.toLowerCase();
     }

     /**
      * adds the phrase to the phrase div, each character as an
      * list item in a ul
      */
     addPhraseToDisplay() {
        const phraseUl = document.querySelector('#phrase ul');
        for (let char of this.phrase) {
            if(char === ' ') {
                const spaceLi = document.createElement('li');
                spaceLi.className = 'space';
                spaceLi.textContent = ' ';
                phraseUl.appendChild(spaceLi);
            } else if (/[A-Za-z]/.test(char)) {
                const letterLi = document.createElement('li');
                letterLi.className = `hide letter ${char}`;
                letterLi.textContent = char;
                phraseUl.appendChild(letterLi);
            }
        }
     }

     /**
      * check to see if the guess letter matches any character in
      * the phrase
      * @param {string/char} guess - the guess user makes
      * @return {boolean}    match - whether the guess matches any
      * letter in the phrase
      */
     checkLetter(guess) {
         let match = false;
         if(this.phrase.indexOf(guess) !== -1) {
             match = true;
         }
         return match;
     }

     /**
      * shows the matched letter
      * @param 
      */
     showMatchedLetter(guess) {
        const matchedLi = document.getElementsByClassName(`${guess}`);
        for(let li of matchedLi) {
            li.classList.replace('hide', 'show');
        };
     }

 }