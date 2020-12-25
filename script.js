const stat = document.querySelector('.game-stat');

//CURRENT PLAYER'S TURN
let currentPlayer = "X";

let gameOver = false;

//STORING BOARD STATUS IN AN ARRAY
let board = ["", "", "", "", "", "", "", "", ""];

const winMessage = () => "Player " + currentPlayer + " won!";
const drawMessage = () => "Game draw";
const currentPlayerTurn = () => "Player " + currentPlayer + "'s turn";

stat.innerHTML = currentPlayerTurn();

//ARRAY OF ALL POSSIBLE WINNING COMBINATIONS
const winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function TicTacToe() {
    let isWinner = false;
       
    for(let i=0; i<=7; i++) {
        const winCombo = winComb[i];
        let pos0 = board[winCombo[0]];
        let pos1 = board[winCombo[1]];
        let pos2 = board[winCombo[2]];

        if(pos0==='' || pos1==='' || pos2==='') {
            continue;
        }

        if(pos0===pos1 && pos1===pos2){
            isWinner = true;
            break;
        }
    }

    if(isWinner) {
        stat.innerHTML = winMessage();
        gameOver = true;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    stat.innerHTML = currentPlayerTurn();
}

function handleCellClick(clickedCellEvent) {
    //STORING CLICKED CELL IN A VARIABLE
    const clickedCell = clickedCellEvent.target;

    //GET THE CELL INDEX OF THE CELL CLICKED
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    if(board[clickedCellIndex] !== "" || gameOver) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    TicTacToe();
}

function ResetGame() {
    gameOver = false;
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    stat.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.col').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.col').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-reset').addEventListener('click', ResetGame);