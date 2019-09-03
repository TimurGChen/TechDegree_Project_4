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
//disables callback when the player has lost or won
    if (e.target.tagName === 'BUTTON' && game.missed < 5 && !game.checkForWin()) {
        game.handleInteraction(e);
    }
});

/**
 * adds keydown event handler, and calls handleInteraction method
 * when letter keys are pressed
 */
document.addEventListener('keydown', e => {
//disables callback when the player has lost or won
    if(/^[a-z]$/.test(e.key) && game.missed < 5 && !game.checkForWin()) {
        game.handleInteraction(e);
    }
});