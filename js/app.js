/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const game = new Game();

/**
 * adds the event handler to the start button, which conditionally
 * resets the game board, and starts a new round of game
 *  */
const startBtn = document.getElementById('btn__reset');
startBtn.addEventListener('click', function() {
    if (startBtn.parentElement.className !== 'start') game.reset();
    game.startGame();
});

/**
 * adds event handler to the on-screen keyboard, and calls
 * the handleInteraction method only if the click event takes
 * place on a button
 */
document.getElementById('qwerty').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e);
    }
});


document.addEventListener('keydown', e => {
    if(/^[a-z]$/.test(e.key)) {
        game.handleInteraction(e);
    }
});