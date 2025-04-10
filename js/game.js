const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let turn = 1;
let gameOver = false;        

const cellClass = {
1: "cell-p1",
2: "cell-p2",
};

const playerImage = {
    1: "img/circle.png",
    2: "img/cross.png",
};

function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    const playerElement = document.getElementById("player-element");
    if (!gameOver) {
        playerElement.innerHTML = `Player ${turn}'s Turn`;
    } else {
        playerElement.innerHTML = "Game Over!";
    }

    board.forEach((cellValue, index) => {
        const cellPlayerImage = playerImage[cellValue];
        const cellImage = cellPlayerImage ? `<img src="${cellPlayerImage}" />` : "";

        const cellClassName = cellValue === -1 ? "" : cellClass[cellValue] || "";
        boardElement.innerHTML += `
            <div class="cell ${cellClassName}" onclick="handleTurn(${index})">
                ${cellImage}
            </div>
        `;
    });

    checkWinner();
}

function handleTurn(cellIndex) {
    if (gameOver) {
        return;
    }

    if (board[cellIndex] === -1) {
        board[cellIndex] = turn;
        turn = turn === 1 ? 2 : 1;
        renderBoard();
    } else {
        alert("Invalid Move");
    }
}

function checkWinner() {
    const PLAYER_1 = 1;
    const PLAYER_2 = 2;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== -1 && board[a] === board[b] && board[a] === board[c]) {
            endGame(`Player ${board[a]} Wins!`);
            return;
        }
    }
    if (!board.includes(-1)) {
        endGame("It's a Draw!");
    }
}

function endGame(message) {
    gameOver = true;
    document.getElementById("game-over-message").innerText = message;
    document.getElementById("game-over-modal").style.display = "flex";
}

function resetGame() {
    board.fill(-1);
    turn = 1;
    gameOver = false;
    renderBoard();
    document.getElementById("game-over-modal").style.display = "none";
}

renderBoard();