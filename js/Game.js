 class Game{
     constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('no brainer')
             , new Phrase('high and dry')
             , new Phrase('knock your socks off')
             , new Phrase('under the whether')
             , new Phrase('jaws of death')
            ];
        this.activePhrase = null;
     }

     /**
      * initiates the game by adding a random phrase to display
      */
     startGame() {
         document.getElementById('overlay').style.display = 'none';
         this.activePhrase = this.getRandomPhrase(this.phrases);
         this.activePhrase.addPhraseToDisplay();
     }

     /**
      * extracts a random phrase from the phrases array
      * @return {string } phrase - a phrase randomlly chosen from the array
      */
     getRandomPhrase() {
        const randomNum = Math.floor(Math.random()*this.phrases.length);
        return this.phrases[randomNum];
     }

     /**
      * responds to user's click on the on-screen keyboard:
      * selected keys are disabled. For each right/wrong selection,
      *  it checks whether the game is over
      * @param {event} e - click event
      */
     handleInteraction(e) {
        let keyButton = null;
        let letter = null;
        if (e.type === 'click') {
            keyButton = e.target;
            letter = e.target.textContent;
        } else if (e.type === 'keydown') {
            letter = e.key;
            const buttons = document.querySelectorAll('#qwerty button');
            for (let button of buttons) {
                if (button.textContent === letter) {
                    keyButton = button;
                }
            }
        }
        keyButton.disabled = true;
        const phrase = this.activePhrase;
        if(keyButton.className === 'key') {
            if (phrase.checkLetter(letter)) {
                keyButton.classList.replace('key', 'chosen');
                phrase.showMatchedLetter(letter);
                if (this.checkForWin()) {
                    this.gameOver(true);
                }
            } else {
                keyButton.classList.replace('key', 'wrong');
                this.removeLife();
            };
        };
     }

     /**
      * checks whether the user has won by checking whether unguessed
      * hidden letter still exist. If none exists, the player has won
      * @return {boolean} whether the user has won the game
      */
     checkForWin() {
        const hiddenLetters = document.getElementsByClassName('letter hide');
        if(hiddenLetters.length === 0) return true;
        return false;
     }

     /**
      * replaces the last living heart with an image of a lost heart;
      * if the user has missed 5 times, it calls gameOver()
      */
     removeLife() {
        const heartList = document.querySelectorAll('#scoreboard img');
        let lastHeart = null;
        for (let heart of heartList) {
            if (heart.alt === "Heart Icon") lastHeart = heart;
        };
        lastHeart.src = 'images/lostHeart.png';
        lastHeart.alt = 'Lost Heart';
        this.missed++;
        if(this.missed >= 5) this.gameOver(false);
    }

    /**
     * displays the overlay containing game result message and sets an
     * appropriate class for the overlay
     * @param {boolean} win - whether the player has won 
     */
    gameOver(win) {
        const overlayDiv = document.getElementById('overlay');
        const result = win ? 'win' : 'lose';
        const messageBoard = document.getElementById('game-over-message');

        //change the class to reflect game result
        overlayDiv.className = result;

        //display a message to report game result
        messageBoard.textContent = win ? 
            "Congratulations, you win!!" : "Unfortunately, you lose. Try again?";

        //shows the overlay
        overlayDiv.style.display = 'block';
    }

    /**
     * resets the gameboard by removing all li elements from Phrase ul,
     * enable all keyboard buttons and resets key class,
     * and resets all heart images(player's lives)
     */
    reset() {
        //removes all phrase li
        const phraseLis = document.querySelectorAll('#phrase li');
        for (let li of phraseLis) li.remove();
        //resets all keyboard buttons' class to 'key'
        const keys = document.querySelectorAll('#qwerty button');
        for (let key of keys) {
            key.className = 'key';
            key.disabled = false;
        };
        //resets all heart images
        const hearts = document.querySelectorAll('#scoreboard img');
        for (let heart of hearts) {
            heart.src = 'images/liveHeart.png';
            heart.alt = 'Heart Icon';
        };
        this.missed = 0;
    }
}