const gameBoardValues = [
    '', '', '',
    '', '', '',
    '', '', ''
];

const winningStatus = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var currentPlayer = 'X';
var gameStatus = true;
const gameCells = document.querySelectorAll(".game-board__cell");
var gameBoard = document.querySelector("#game-board");
var resetBtn =  document.querySelector("#game-btn");
var message = document.querySelector("#game-message");

function displayMessage( msg ) {
    message.textContent = msg;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayMessage( "Next move by Player " + currentPlayer );
}

function checkGameStatus() {

    for( var i = 0; i < winningStatus.length; i++ ) {

        if( gameBoardValues[winningStatus[i][0]] !== '' &&
            gameBoardValues[winningStatus[i][0]] == gameBoardValues[winningStatus[i][1]] &&
            gameBoardValues[winningStatus[i][1]] == gameBoardValues[winningStatus[i][2]] ) {
            
            displayMessage( 'Game won by Player ' + currentPlayer);

            gameCells[winningStatus[i][0]].style.backgroundColor = "#90ee90";
            gameCells[winningStatus[i][1]].style.backgroundColor = "#90ee90";
            gameCells[winningStatus[i][2]].style.backgroundColor = "#90ee90";
            gameStatus = false;
            return;
        } 

    }

    if( ! gameBoardValues.includes('') ) {
        displayMessage( 'Game over by draw');
        gameStatus = false;
        return;
    }

    if(gameStatus) {
        changePlayer();
    }

}

function resetBoard() {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = "transparent";
    });
}

resetBtn.addEventListener( 'click', () => {
    currentPlayer = 'X';
    gameBoardValues.fill('');
    resetBoard();
    displayMessage('Start playing...');
    gameStatus = true;
});

gameBoard.addEventListener( 'click', (eventTrigger) => {

    if( ! gameStatus ) {
        return;
    }

    var cell = eventTrigger.target.getAttribute('data-value');
    if( gameBoardValues[cell] !== '' ) {
        return;
    }

    gameBoardValues[cell] = currentPlayer;
    eventTrigger.target.textContent = currentPlayer;

    checkGameStatus();

} );