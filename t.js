let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById('turnMessage').innerText = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('turnMessage').innerText = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('turnMessage').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // R
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // C
        [0, 4, 8], [2, 4, 6]             // Diag
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('turnMessage').innerText = 'Player X\'s turn';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });
}

document.getElementById('board').addEventListener('click', (event) => {
    if (gameActive) {
        const cellIndex = event.target.id.split('-')[1];
        if (cellIndex !== undefined) {
            handleCellClick(cellIndex);
        }
    }
});

function msg() {
    document.getElementById('turnMessage').innerText = `Player ${currentPlayer}'s turn`;
}

resetGame();
