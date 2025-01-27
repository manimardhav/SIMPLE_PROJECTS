const board = document.getElementById('board');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const scoreDrawsDisplay = document.getElementById('scoreDraws');

let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
let draws = 0;

const cells = Array(9).fill(null);

document.getElementById('symbolX').addEventListener('click', () => selectSymbol('X'));
document.getElementById('symbolO').addEventListener('click', () => selectSymbol('O'));

function selectSymbol(symbol) {
    currentPlayer = symbol;
    currentPlayerDisplay.innerText = `Current Player: ${currentPlayer}`;
}

const createBoard = () => {
    board.innerHTML = ''; // Clear the board before creating it
    for (let i = 0; i < 3; i++) {
        const row = board.insertRow();
        for (let j = 0; j < 3; j++) {
            const cell = row.insertCell();
            cell.addEventListener('click', () => makeMove(i * 3 + j));
        }
    }
};

const makeMove = (index) => {
    if (!cells[index]) {
        cells[index] = currentPlayer;
        board.rows[Math.floor(index / 3)].cells[index % 3].innerText = currentPlayer;

        if (checkWinner(currentPlayer)) {
            setTimeout(() => {
                winnerMessage.innerText = `${currentPlayer} wins! Starting a new game.`;
                winnerMessage.style.display = 'block'; // Show winner message
                updateScore(currentPlayer);
                highlightWinningCells();
                setTimeout(() => winnerMessage.style.display = 'none', 3000); // Hide after a few seconds
                resetGame();
                createBoard(); // Recreate the board after reset
                return;
            }, 100);
        } else if (cells.every(cell => cell !== null)) { // Check for draw
            setTimeout(() => {
                winnerMessage.innerText = `It's a draw! Starting a new game.`;
                winnerMessage.style.display = 'block'; // Show draw message
                draws++;
                updateScore();
                setTimeout(() => winnerMessage.style.display = 'none', 3000); // Hide after a few seconds
                resetGame();
                createBoard(); // Recreate the board after reset
            }, 100);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.innerText = `Current Player: ${currentPlayer}`;
    }
};

const checkWinner = (player) => {
   const winningCombinations = [
       [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
       [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
       [0, 4, 8], [2, 4, 6]             // Diagonal
   ];
   
   return winningCombinations.some(combination => 
       combination.every(index => cells[index] === player)
   );
};

const highlightWinningCells = () => {
   const winningCombinations = [
       [0,1,2], [3,4,5], [6,7,8],
       [0,3,6], [1,4,7], [2,5,8],
       [0,4,8], [2,4,6]
   ];

   winningCombinations.forEach(combination => {
       if (combination.every(index => cells[index] === currentPlayer)) {
           combination.forEach(index => {
               const cell = board.rows[Math.floor(index / 3)].cells[index % 3];
               cell.style.animation = "winningLine .5s ease forwards"; // Apply winning line animation
           });
       }
   });
};

const updateScore = (winner) => {
   if (winner === 'X') scoreX++;
   else if (winner === 'O') scoreO++;
   
   scoreXDisplay.innerText = scoreX;
   scoreODisplay.innerText = scoreO;
   scoreDrawsDisplay.innerText = draws;
};

const resetGame = () => {
   currentPlayer = 'X';
   cells.fill(null);
};

// Restart button functionality
restartButton.addEventListener('click', () => {
   resetGame();
   createBoard();
});

// Initialize the game
createBoard();
